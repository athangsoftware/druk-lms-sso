import { Injectable, Inject, InternalServerErrorException } from '@nestjs/common';
import * as nodeCrypto from 'crypto';
import * as dataPlane from 'oci-emaildataplane';
import * as common from 'oci-common';
import { MAIL_CONFIG } from './mail-config';
import type { MailConfig } from './mail-config';

@Injectable()
export class EmailService {
  private emailClient: dataPlane.EmailDPClient | null = null;
  private compartmentId: string;
  private approvedSender: string;
  private isConfigured = false;

  constructor(@Inject(MAIL_CONFIG) private readonly config: MailConfig) {
    // Check if OCI config is provided
    if (!config.privateKey || !config.tenancyId || !config.userId || !config.fingerprint || !config.region) {
      console.warn('⚠️  OCI Email not configured — mail features will be disabled. Set OCI_* env vars to enable.');
      this.compartmentId = '';
      this.approvedSender = '';
      return;
    }

    console.log('OCI Config:', {
      tenancyId: config.tenancyId,
      userId: config.userId,
      fingerprint: config.fingerprint,
      privateKeyStart: config.privateKey?.substring(0, 50),
      privateKeyLength: config.privateKey?.length,
      privateKeyEnd: config.privateKey?.substring(config.privateKey.length - 30),
      region: config.region,
      compartmentId: config.compartmentId,
      approvedSender: config.approvedSender,
    });

    // Validate private key against configured fingerprint to catch config drift early
    try {
      const pk = nodeCrypto.createPrivateKey({ key: config.privateKey });
      const pub = nodeCrypto.createPublicKey(pk);
      const pubDer = pub.export({ type: 'spki', format: 'der' }) as Buffer;
      const md5Hex = nodeCrypto.createHash('md5').update(pubDer).digest('hex');
      const computedFp = md5Hex.match(/.{1,2}/g)?.join(':');
      if (computedFp && config.fingerprint && computedFp.toLowerCase() !== config.fingerprint.toLowerCase()) {
        throw new Error(`OCI fingerprint mismatch. Computed=${computedFp}, Configured=${config.fingerprint}`);
      }
      console.log('OCI key fingerprint OK:', computedFp);
    } catch (e) {
      console.error('OCI key validation failed:', (e as Error).message);
      throw new InternalServerErrorException('Invalid OCI key configuration. See startup logs for details.');
    }

    const provider = new common.SimpleAuthenticationDetailsProvider(
      config.tenancyId,
      config.userId,
      config.fingerprint,
      config.privateKey,
      null,
      common.Region.fromRegionId(config.region),
    );

    this.emailClient = new dataPlane.EmailDPClient({
      authenticationDetailsProvider: provider,
    });

    this.compartmentId = config.compartmentId;
    this.approvedSender = config.approvedSender;
    this.isConfigured = true;
  }

  async sendEmail(to: string, subject: string, body: string, fromName?: string): Promise<string> {
    if (!this.isConfigured || !this.emailClient) {
      throw new InternalServerErrorException('Email service is not configured. Set OCI_* environment variables to enable email.');
    }
    console.log('compartmentId:', this.compartmentId);
    const details: dataPlane.models.SubmitEmailDetails = {
      sender: {
        senderAddress: {
          email: this.approvedSender,
          name: fromName || 'Your App',
        },
        compartmentId: this.compartmentId,
      },
      recipients: {
        to: [{ email: to, name: 'Recipient' }],
      },
      subject,
      bodyText: body,
    };

    const resp = await this.emailClient.submitEmail({ submitEmailDetails: details });
    return (resp as any).messageId;
  }

  async sendHtmlEmail(to: string, subject: string, htmlBody: string): Promise<string> {
    if (!this.isConfigured || !this.emailClient) {
      throw new InternalServerErrorException('Email service is not configured. Set OCI_* environment variables to enable email.');
    }
    const details: dataPlane.models.SubmitEmailDetails = {
      sender: {
        senderAddress: {
          email: this.approvedSender,
          name: 'Your App',
        },
        compartmentId: this.compartmentId,
      },
      recipients: {
        to: [{ email: to, name: 'Recipient' }],
      },
      subject,
      bodyHtml: htmlBody,
    };

    const resp = await this.emailClient.submitEmail({ submitEmailDetails: details });
    return (resp as any).messageId;
  }
}

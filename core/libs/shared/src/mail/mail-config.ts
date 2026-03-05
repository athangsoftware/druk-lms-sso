export interface MailConfig {
  tenancyId: string;
  userId: string;
  fingerprint: string;
  privateKey: string;
  region: string;
  compartmentId: string;
  approvedSender: string;
}

export const MAIL_CONFIG = 'MAIL_CONFIG';

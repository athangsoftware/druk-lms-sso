import { Client } from '../../../generated/client';

type ClientSeed = Omit<
  Client,
  'createdBy' | 'createdAt' | 'createdIp' | 'updatedBy' | 'updatedAt' | 'updatedIp'
> & Partial<Client>;

export const clientSeeds: ClientSeed[] = [
  {
    id: 'druklms',
    name: 'DrukLMS',
    clientId: 'druklms',
    clientSecret: null,
    clientType: 'CONFIDENTIAL',
    disableStrictUrlValidation: true,
  },
  {
    id: 'iam',
    name: 'Client Web Application (IAM)',
    clientId: 'iam',
    clientSecret: '$2a$12$z1KcYg7Xq5sWnpnOlcCq6fR4ONjqXfyzD9i8GpRJ79sDF5FumEcuy',
    clientType: 'PUBLIC',
    disableStrictUrlValidation: true,

  },
];

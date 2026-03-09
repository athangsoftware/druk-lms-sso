-- AlterTable
ALTER TABLE `idp_identity_providers` MODIFY `type` ENUM('GOOGLE', 'NDI', 'OIDC', 'CUSTOM') NOT NULL DEFAULT 'OIDC';

-- Step 1: Add new enum values alongside old ones
ALTER TABLE `usr_users` MODIFY COLUMN `role` ENUM('MEMBER', 'MODRATOR', 'DEV', 'SUPER_ADMIN', 'InternalUser', 'OrganizationUser') NOT NULL DEFAULT 'MEMBER';

-- Step 2: Map old values to new values
UPDATE `usr_users` SET `role` = 'InternalUser' WHERE `role` IN ('MEMBER', 'MODRATOR', 'DEV', 'SUPER_ADMIN');

-- Step 3: Change default and remove old enum values
ALTER TABLE `usr_users` MODIFY COLUMN `role` ENUM('InternalUser', 'OrganizationUser') NOT NULL DEFAULT 'InternalUser';

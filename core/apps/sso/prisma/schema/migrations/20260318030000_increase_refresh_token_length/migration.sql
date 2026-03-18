-- Drop the unique index on token column
DROP INDEX `usr_refresh_tokens_token_key` ON `usr_refresh_tokens`;

-- Increase token column size to accommodate JWTs with permissions payload
ALTER TABLE `usr_refresh_tokens` MODIFY COLUMN `token` TEXT NOT NULL;

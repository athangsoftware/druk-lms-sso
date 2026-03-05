-- CreateTable
CREATE TABLE `_audit_logs` (
    `id` VARCHAR(191) NOT NULL,
    `action` VARCHAR(191) NULL,
    `operation` VARCHAR(191) NULL,
    `table_name` VARCHAR(191) NULL,
    `record_id` VARCHAR(191) NULL,
    `old_value` JSON NULL,
    `new_value` JSON NULL,
    `created_by` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_ip` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pub_meta_data` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `desc` VARCHAR(191) NULL,
    `type` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cli_clients` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `clientId` VARCHAR(191) NOT NULL,
    `clientSecret` VARCHAR(191) NULL,
    `client_type` ENUM('PUBLIC', 'CONFIDENTIAL') NOT NULL DEFAULT 'PUBLIC',
    `disable_strict_url_validation` BOOLEAN NOT NULL DEFAULT false,
    `created_by` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_ip` VARCHAR(191) NULL,
    `updated_by` VARCHAR(191) NULL,
    `updated_at` DATETIME(3) NULL,
    `updated_ip` VARCHAR(191) NULL,

    UNIQUE INDEX `cli_clients_clientId_key`(`clientId`),
    UNIQUE INDEX `cli_clients_clientId_clientSecret_key`(`clientId`, `clientSecret`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cli_authorization_codes` (
    `id` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `clientId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NULL,
    `redirect_uri` VARCHAR(191) NOT NULL,
    `code_challenge` VARCHAR(191) NULL,
    `code_challenge_method` VARCHAR(191) NULL,
    `state` VARCHAR(191) NULL,
    `expires_at` DATETIME(3) NOT NULL,
    `is_used` BOOLEAN NOT NULL DEFAULT false,
    `created_by` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_ip` VARCHAR(191) NULL,
    `updated_by` VARCHAR(191) NULL,
    `updated_at` DATETIME(3) NULL,
    `updated_ip` VARCHAR(191) NULL,

    UNIQUE INDEX `cli_authorization_codes_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cli_redirect_urls` (
    `id` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `clientId` VARCHAR(191) NOT NULL,
    `created_by` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_ip` VARCHAR(191) NULL,
    `updated_by` VARCHAR(191) NULL,
    `updated_at` DATETIME(3) NULL,
    `updated_ip` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cli_post_logout_redirect_urls` (
    `id` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `client_id` VARCHAR(191) NOT NULL,
    `created_by` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_ip` VARCHAR(191) NULL,
    `updated_by` VARCHAR(191) NULL,
    `updated_at` DATETIME(3) NULL,
    `updated_ip` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usr_users` (
    `id` VARCHAR(191) NOT NULL,
    `first_name` VARCHAR(191) NOT NULL,
    `last_name` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone_number` VARCHAR(191) NULL,
    `username` VARCHAR(191) NOT NULL,
    `ndi_identifier` VARCHAR(191) NULL,
    `password` VARCHAR(191) NULL,
    `role` ENUM('MEMBER', 'MODRATOR', 'DEV', 'SUPER_ADMIN') NOT NULL DEFAULT 'MEMBER',
    `is_verified` BOOLEAN NOT NULL DEFAULT false,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_by` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_ip` VARCHAR(191) NULL,
    `updated_by` VARCHAR(191) NULL,
    `updated_at` DATETIME(3) NULL,
    `updated_ip` VARCHAR(191) NULL,

    UNIQUE INDEX `usr_users_username_key`(`username`),
    UNIQUE INDEX `usr_users_ndi_identifier_key`(`ndi_identifier`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usr_password_reset_tokens` (
    `id` VARCHAR(191) NOT NULL,
    `token` LONGTEXT NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `expires_at` DATETIME(3) NOT NULL,
    `is_used` BOOLEAN NOT NULL DEFAULT false,
    `created_by` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_ip` VARCHAR(191) NULL,
    `updated_by` VARCHAR(191) NULL,
    `updated_at` DATETIME(3) NULL,
    `updated_ip` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usr_refresh_tokens` (
    `id` VARCHAR(191) NOT NULL,
    `token` VARCHAR(768) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `clientId` VARCHAR(191) NOT NULL,
    `expiresAt` DATETIME(3) NOT NULL,
    `revoked` BOOLEAN NOT NULL DEFAULT false,
    `created_by` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_ip` VARCHAR(191) NULL,
    `updated_by` VARCHAR(191) NULL,
    `updated_at` DATETIME(3) NULL,
    `updated_ip` VARCHAR(191) NULL,

    UNIQUE INDEX `usr_refresh_tokens_token_key`(`token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wbh_webhook_logs` (
    `id` VARCHAR(191) NOT NULL,
    `proof_request_id` VARCHAR(191) NOT NULL,
    `payload` LONGTEXT NOT NULL,
    `processed_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_by` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_ip` VARCHAR(191) NULL,
    `updated_by` VARCHAR(191) NULL,
    `updated_at` DATETIME(3) NULL,
    `updated_ip` VARCHAR(191) NULL,

    UNIQUE INDEX `wbh_webhook_logs_proof_request_id_key`(`proof_request_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `cli_authorization_codes` ADD CONSTRAINT `cli_authorization_codes_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `cli_clients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cli_authorization_codes` ADD CONSTRAINT `cli_authorization_codes_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `usr_users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cli_redirect_urls` ADD CONSTRAINT `cli_redirect_urls_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `cli_clients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cli_post_logout_redirect_urls` ADD CONSTRAINT `cli_post_logout_redirect_urls_client_id_fkey` FOREIGN KEY (`client_id`) REFERENCES `cli_clients`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usr_password_reset_tokens` ADD CONSTRAINT `usr_password_reset_tokens_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `usr_users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usr_refresh_tokens` ADD CONSTRAINT `usr_refresh_tokens_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `usr_users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usr_refresh_tokens` ADD CONSTRAINT `usr_refresh_tokens_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `cli_clients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

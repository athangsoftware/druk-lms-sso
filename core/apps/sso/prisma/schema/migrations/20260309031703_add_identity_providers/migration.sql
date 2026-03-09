-- CreateTable
CREATE TABLE `idp_identity_providers` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `type` ENUM('OIDC', 'CUSTOM') NOT NULL DEFAULT 'OIDC',
    `client_id` VARCHAR(191) NULL,
    `client_secret` TEXT NULL,
    `authorization_url` VARCHAR(191) NULL,
    `token_url` VARCHAR(191) NULL,
    `user_info_url` VARCHAR(191) NULL,
    `redirect_url` VARCHAR(191) NULL,
    `scopes` VARCHAR(191) NULL,
    `icon_url` VARCHAR(191) NULL,
    `is_enabled` BOOLEAN NOT NULL DEFAULT true,
    `display_order` INTEGER NOT NULL DEFAULT 0,
    `metadata` JSON NULL,
    `created_by` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_ip` VARCHAR(191) NULL,
    `updated_by` VARCHAR(191) NULL,
    `updated_at` DATETIME(3) NULL,
    `updated_ip` VARCHAR(191) NULL,

    UNIQUE INDEX `idp_identity_providers_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

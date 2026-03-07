-- CreateTable
CREATE TABLE `rpt_global_filters` (
    `id` VARCHAR(191) NOT NULL,
    `column_name` VARCHAR(191) NOT NULL,
    `column_value` TEXT NOT NULL,
    `missing_column_behavior` ENUM('SHOW_ALL', 'HIDE_DATA') NULL,
    `is_enabled` BOOLEAN NOT NULL DEFAULT true,
    `order` INTEGER NOT NULL DEFAULT 0,
    `created_by` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_ip` VARCHAR(191) NULL,
    `updated_by` VARCHAR(191) NULL,
    `updated_at` DATETIME(3) NULL,
    `updated_ip` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rpt_global_filter_overrides` (
    `id` VARCHAR(191) NOT NULL,
    `global_filter_id` VARCHAR(191) NOT NULL,
    `dashboard_id` VARCHAR(191) NOT NULL,
    `is_disabled` BOOLEAN NOT NULL DEFAULT false,
    `column_value` TEXT NULL,
    `missing_column_behavior` ENUM('SHOW_ALL', 'HIDE_DATA') NULL,
    `created_by` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_ip` VARCHAR(191) NULL,
    `updated_by` VARCHAR(191) NULL,
    `updated_at` DATETIME(3) NULL,
    `updated_ip` VARCHAR(191) NULL,

    UNIQUE INDEX `rpt_global_filter_overrides_global_filter_id_dashboard_id_key`(`global_filter_id`, `dashboard_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `rpt_global_filter_overrides` ADD CONSTRAINT `rpt_global_filter_overrides_global_filter_id_fkey` FOREIGN KEY (`global_filter_id`) REFERENCES `rpt_global_filters`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rpt_global_filter_overrides` ADD CONSTRAINT `rpt_global_filter_overrides_dashboard_id_fkey` FOREIGN KEY (`dashboard_id`) REFERENCES `rpt_dashboards`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

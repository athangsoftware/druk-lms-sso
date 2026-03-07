-- CreateTable
CREATE TABLE `rpt_dashboard_filters` (
    `id` VARCHAR(191) NOT NULL,
    `dashboard_id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `filter_type` ENUM('MULTI_SELECT', 'SINGLE_SELECT', 'DATE_RANGE', 'TEXT', 'NUMBER') NOT NULL,
    `connection_id` VARCHAR(191) NOT NULL,
    `target_column` VARCHAR(191) NOT NULL,
    `source_query` LONGTEXT NULL,
    `default_value` TEXT NULL,
    `order` INTEGER NOT NULL DEFAULT 0,
    `created_by` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_ip` VARCHAR(191) NULL,
    `updated_by` VARCHAR(191) NULL,
    `updated_at` DATETIME(3) NULL,
    `updated_ip` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `rpt_dashboard_filters` ADD CONSTRAINT `rpt_dashboard_filters_dashboard_id_fkey` FOREIGN KEY (`dashboard_id`) REFERENCES `rpt_dashboards`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rpt_dashboard_filters` ADD CONSTRAINT `rpt_dashboard_filters_connection_id_fkey` FOREIGN KEY (`connection_id`) REFERENCES `rpt_db_connections`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

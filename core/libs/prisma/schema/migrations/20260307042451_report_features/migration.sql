-- CreateTable
CREATE TABLE `rpt_db_connections` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `db_type` ENUM('MYSQL') NOT NULL,
    `host` VARCHAR(191) NOT NULL,
    `port` INTEGER NOT NULL,
    `database_name` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `encrypted_password` LONGTEXT NOT NULL,
    `created_by` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_ip` VARCHAR(191) NULL,
    `updated_by` VARCHAR(191) NULL,
    `updated_at` DATETIME(3) NULL,
    `updated_ip` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rpt_ai_providers` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `encrypted_api_key` LONGTEXT NOT NULL,
    `is_enabled` BOOLEAN NOT NULL DEFAULT false,
    `created_by` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_ip` VARCHAR(191) NULL,
    `updated_by` VARCHAR(191) NULL,
    `updated_at` DATETIME(3) NULL,
    `updated_ip` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rpt_charts` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `connection_id` VARCHAR(191) NOT NULL,
    `sql_query` LONGTEXT NOT NULL,
    `chart_type` ENUM('BAR', 'LINE', 'PIE', 'DOUGHNUT', 'SCATTER', 'AREA', 'TABLE') NOT NULL,
    `chart_config` JSON NOT NULL,
    `created_by` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_ip` VARCHAR(191) NULL,
    `updated_by` VARCHAR(191) NULL,
    `updated_at` DATETIME(3) NULL,
    `updated_ip` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rpt_dashboards` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `created_by` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_ip` VARCHAR(191) NULL,
    `updated_by` VARCHAR(191) NULL,
    `updated_at` DATETIME(3) NULL,
    `updated_ip` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rpt_dashboard_charts` (
    `id` VARCHAR(191) NOT NULL,
    `dashboard_id` VARCHAR(191) NOT NULL,
    `chart_id` VARCHAR(191) NOT NULL,
    `position_x` INTEGER NOT NULL DEFAULT 0,
    `position_y` INTEGER NOT NULL DEFAULT 0,
    `width` INTEGER NOT NULL DEFAULT 6,
    `height` INTEGER NOT NULL DEFAULT 4,
    `order` INTEGER NOT NULL DEFAULT 0,
    `created_by` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_ip` VARCHAR(191) NULL,
    `updated_by` VARCHAR(191) NULL,
    `updated_at` DATETIME(3) NULL,
    `updated_ip` VARCHAR(191) NULL,

    UNIQUE INDEX `rpt_dashboard_charts_dashboard_id_chart_id_key`(`dashboard_id`, `chart_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `rpt_charts` ADD CONSTRAINT `rpt_charts_connection_id_fkey` FOREIGN KEY (`connection_id`) REFERENCES `rpt_db_connections`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rpt_dashboard_charts` ADD CONSTRAINT `rpt_dashboard_charts_dashboard_id_fkey` FOREIGN KEY (`dashboard_id`) REFERENCES `rpt_dashboards`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rpt_dashboard_charts` ADD CONSTRAINT `rpt_dashboard_charts_chart_id_fkey` FOREIGN KEY (`chart_id`) REFERENCES `rpt_charts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

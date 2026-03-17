-- AlterTable
ALTER TABLE `rbac_permissions` ADD COLUMN `group_id` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `rbac_permission_groups` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `rbac_permission_groups_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `rbac_permissions` ADD CONSTRAINT `rbac_permissions_group_id_fkey` FOREIGN KEY (`group_id`) REFERENCES `rbac_permission_groups`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

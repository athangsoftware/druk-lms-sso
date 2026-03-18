-- AlterTable
ALTER TABLE `rbac_permission_groups` ADD COLUMN `client_id` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `rbac_permission_groups` ADD CONSTRAINT `rbac_permission_groups_client_id_fkey` FOREIGN KEY (`client_id`) REFERENCES `cli_clients`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

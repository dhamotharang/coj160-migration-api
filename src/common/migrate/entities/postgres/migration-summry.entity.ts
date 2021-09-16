import { HelperService } from "src/shared/helpers/helper.service";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "migration_summaries" })
export class PostgreSQLMigrationSummaries extends HelperService {
  con
  @PrimaryGeneratedColumn({ name: "id" }) id: number;
  @Column({ name: "module" }) module: string;
  @Column({ name: "module_name" }) moduleName: string;
  @Column({ name: "source_total" }) sourceTotal: number;
  @Column({ name: "destination_old_total" }) destinationOldTotal: number;
  @Column({ name: "destination_new_total" }) destinationNewTotal: number;
  @Column({ name: "destination_total" }) destinationTotal: number;
  @Column({ name: "error_total" }) errorTotal: number;
  @Column({ name: "duplicate_total" }) duplicateTotal: number;
  @Column({ name: "create_by" }) createBy: number;
  @Column({ name: "modify_by" }) modifyBy: number;
  @CreateDateColumn({ name: "create_at" }) createAt: Date;
  @UpdateDateColumn({ name: "modify_at" }) modifyAt: Date;

  toResponseObject() {
    const { id, module, moduleName, sourceTotal, destinationOldTotal, destinationNewTotal, destinationTotal, errorTotal, duplicateTotal, createBy, modifyBy, createAt, modifyAt } = this;
    const responseObject = { id, module, moduleName, sourceTotal, destinationOldTotal, destinationNewTotal, destinationTotal, errorTotal, duplicateTotal, createBy, modifyBy, createAt, modifyAt };
    return responseObject;
  }
}
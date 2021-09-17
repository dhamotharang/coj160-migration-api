import { HttpException, HttpStatus, Logger } from "@nestjs/common";
import { HelperService } from "src/shared/helpers/helper.service";
import { BeforeInsert, Column, CreateDateColumn, Entity, getManager, PrimaryGeneratedColumn } from "typeorm";
import { MigrationLogDTO } from "../../dto/migration-log.dto";

@Entity({ name: "migration_logs" })
export class PostgresMigrationLogs extends HelperService {
  @PrimaryGeneratedColumn({ name: "id" }) id: number;
  @Column({ name: "code" }) code: string;
  @Column({ name: "name" }) name: string;
  @Column({ name: "server_type", enum: ["PROD", "UAT"] }) serverType: string;
  @Column({ name: "status", enum: ["SUCCESS", "ERROR", "DUPLICATE", "MATCH"] }) status: string;
  @CreateDateColumn({ name: "datetime", type: "timestamp", default: new Date() }) datetime: Date;
  @Column({ name: "source_dbtype", enum: ["ORACLE", "MYSQL", "POSTGRES"] }) sourceDBType: string;
  @Column({ name: "source_table_name" }) sourceTableName: string;
  @Column({ name: "source_id" }) sourceId: number;
  @Column({ name: "source_data", type: "text", nullable: true }) sourceData: string;
  @Column({ name: "destination_dbtype", nullable: true, enum: ["ORACLE", "MYSQL", "POSTGRES"] }) destinationDBType: string;
  @Column({ name: "destination_table_name", nullable: true }) destinationTableName: string;
  @Column({ name: "destination_id", nullable: true }) destinationId: number;
  @Column({ name: "destination_data", type: "text", nullable: true }) destinationData: string;

  @BeforeInsert()
  async generateCode(): Promise<void> {
    try {
      this.code = this.dateFormat("YYYYMMDDHism");
    } catch (error) {
      throw new HttpException(`[migration log code failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  toResponseObject() {
    const { id, code, name, serverType, status, datetime, sourceDBType, sourceTableName, sourceId, sourceData, destinationDBType, destinationTableName, destinationId, destinationData } = this;
    const responseObject: any = {
      id, code, name, serverType, status, datetime: this.dateFormat("YYYY-MM-DD H:i:s", datetime),
      sourceDBType, sourceTableName, sourceId, sourceData, destinationDBType, destinationTableName, destinationId, destinationData
    };
    return responseObject;
  }
}
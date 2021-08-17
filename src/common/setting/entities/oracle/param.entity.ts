import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "PC_PARAM" })
export class OracleParams {
  @PrimaryColumn({ name: "PARAM_ID", comment: "" }) paramId: number;
  @Column({ name: "ORDER_NO", default: 0.0, comment: "" }) orderNo: number;
  @Column({ name: "PARAM_DESCRIPTION", nullable: true, comment: "" }) paramDescription: string;
  @Column({ name: "PARAM_NAME", comment: "" }) paramName: string;
  @Column({ name: "PARAM_VALUE", comment: "" }) paramValue: string;
  @Column({ name: "CREATED_BY", default: 0, comment: "" }) createdBy: number;
  @Column({ name: "REMOVED_BY", default: 0, comment: "" }) removedBy: number;
  @Column({ name: "UPDATED_BY", default: 0, comment: "" }) updatedBy: number;
  @Column({ name: "CREATED_DATE", comment: "" }) createdDate: Date;
  @Column({ name: "UPDATED_DATE", nullable: true, type: "timestamp", comment: "" }) updatedDate: Date;
  @Column({ name: "REMOVED_DATE", nullable: true, type: "timestamp", comment: "" }) removedDate: Date;

  toResponseObject() {
    const { paramId, orderNo, paramDescription, paramName, paramValue, createdBy, removedBy, updatedBy, createdDate, updatedDate, removedDate } = this;
    const responseObject = { paramId, orderNo, paramDescription, paramName, paramValue, createdBy, removedBy, updatedBy, createdDate, updatedDate, removedDate };
    return responseObject;
  }
}
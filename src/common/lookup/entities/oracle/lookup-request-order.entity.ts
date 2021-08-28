import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "PC_LOOKUP_REQ_ORDER" })
export class OracleLookupReqOrders {
  @PrimaryGeneratedColumn({ name: "REQ_ORDER_ID" }) reqOrderId: number;
  @Column({ name: "ORDER_NO", type: "float", default: 0.0 }) orderNo: number;
  @Column({ name: "ACTIVE_FLAG", nullable: true }) activeFlag: number;
  @Column({ name: "COURT_ID", nullable: true }) courtId: number;
  @Column({ name: "REQ_ORDER_CODE", nullable: true }) reqOrderCode: string;
  @Column({ name: "REQ_ORDER_DESC", nullable: true }) reqOrderDesc: string;
  @Column({ name: "REQ_ORDER_NAME" }) reqOrderName: string;
  @Column({ name: "SELECT_CODE", nullable: true }) selectCode: string;
  @Column({ name: "CREATED_BY", default: 0 }) createdBy: number;
  @Column({ name: "UPDATED_BY", default: 0 }) updatedBy: number;
  @Column({ name: "REMOVED_BY", default: 0 }) removedBy: number;
  @CreateDateColumn({ name: "CREATED_DATE", type: "timestamp" }) createdDate: Date;
  @UpdateDateColumn({ name: "UPDATED_DATE", type: "timestamp", nullable: true }) updatedDate: Date;
  @UpdateDateColumn({ name: "REMOVED_DATE", type: "timestamp", nullable: true }) removedDate: Date;

  toResponseObject() {
    const { reqOrderId, orderNo, activeFlag, courtId, reqOrderCode, reqOrderDesc, reqOrderName, selectCode, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate } = this;
    const responseObject = { reqOrderId, orderNo, activeFlag, courtId, reqOrderCode, reqOrderDesc, reqOrderName, selectCode, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate };
    return responseObject;
  }
}
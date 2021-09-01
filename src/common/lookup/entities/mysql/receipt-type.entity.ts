import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { MySQLReceiptSubTypes } from "./receipt-sub-type.entity";

@Entity({ name: "preceipt_type" })
export class MySQLReceiptTypes {
  @PrimaryColumn({ name: "court_running" }) courtRunning: number;
  @PrimaryColumn({ name: "receipt_type_id" }) receiptTypeId: number;
  @Column({ name: "receipt_type_desc", nullable: true }) receiptTypeDesc: string;
  @Column({ name: "cost_flag" }) costFlag: number;
  @Column({ name: "create_dep_code", nullable: true }) createDepCode: number;
  @Column({ name: "create_user_id" }) createUserId: string;
  @Column({ name: "create_user", nullable: true }) createUser: string;
  @Column({ name: "update_dep_code", nullable: true }) updateDepCode: number;
  @Column({ name: "update_user_id" }) updateUserId: number;
  @Column({ name: "update_user", nullable: true }) updateUser: string;
  @UpdateDateColumn({ name: "update_date", nullable: true, type: "datetime" }) updateDate: Date;
  @Column({ name: "ref_id", nullable: true }) refId: string;
  @CreateDateColumn({ name: "create_date", nullable: true, type: "datetime" }) createDate: Date;

  @OneToMany(type => MySQLReceiptSubTypes, sub => sub.receiptTypes)
  @JoinColumn({ name: "receipt_type_id" }) receiptSubTypes: MySQLReceiptSubTypes;

  toResponseObject() {
    const { courtRunning, receiptTypeId, receiptTypeDesc, costFlag, createDepCode, createUserId, createUser, updateDepCode, updateUserId, updateUser, updateDate, refId, createDate } = this;
    const responseObject = { courtRunning, receiptTypeId, receiptTypeDesc, costFlag, createDepCode, createUserId, createUser, updateDepCode, updateUserId, updateUser, updateDate, refId, createDate };
    return responseObject;
  }
}
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { MySQLReceiptTypes } from "./receipt-type.entity";

@Entity({ name: "preceipt_sub_type" })
export class MySQLReceiptSubTypes {
  @PrimaryColumn({ name: "court_running", comment: "รหัสศาล running" }) courtRunning: number;
  @PrimaryColumn({ name: "receipt_type_id", comment: "ครั้งที่" }) receiptTypeId: number;
  @PrimaryColumn({ name: "sub_type_id", comment: "รหัสประเภทเงิน" }) subTypeId: number;
  @Column({ name: "sub_type_name", comment: "ชื่อประเภทเงิน" }) subTypeName: string;
  @Column({ name: "default_value", type: "double", comment: "ค่าเริ่มต้น" }) defaultValue: number;
  @Column({ name: "other_flag", nullable: true, comment: "ค่าอื่นๆ" }) otherFlag: number;
  @Column({ name: "no_edit_flag", nullable: true, comment: "ห้ามแก้ไข" }) noEditFlag: number;
  @Column({ name: "fine_type", nullable: true, comment: "1 ปรับนายประกัน 2 ปรับจำเลย" }) fineType: number;
  @Column({ name: "cost_flag", nullable: true, comment: "1 ใช้ในการคำนวณค่าฤชาธรรมเนียม" }) costFlag: string;
  @Column({ name: "print_flag", nullable: true, comment: "ไม่พิมพ์รวมกับประเภทหลัก" }) printFlag: number;
  @Column({ name: "print_group", nullable: true, comment: "กลุ่มการพิมพ์ ใช้แยกพิมพ์ เช่น เงินค่าส่งคำคู่ความพิมพ์แยกจากเงินกลาง" }) printGroup: number;
  @Column({ name: "create_dep_code", nullable: true, comment: "รหัสหน่วยงานที่สร้าง record" }) createDepCode: number;
  @Column({ name: "create_user_id", nullable: true, comment: "รหัส user ที่สร้าง record" }) createUserId: string;
  @Column({ name: "create_user", nullable: true, comment: "ชื่อ user ที่สร้าง record" }) createUser: string;
  @Column({ name: "update_dep_code", nullable: true, comment: "หน่วยงานที่แก้ไข" }) updateDepCode: number;
  @Column({ name: "update_user_id", nullable: true, comment: "รหัสผู้ update record" }) updateUserId: number;
  @Column({ name: "update_user", nullable: true, comment: "user ที่ update record" }) updateUser: string;
  @Column({ name: "update_date", type: "datetime", comment: "วันที่ update record" }) updateDate: Date;
  @Column({ name: "create_date", type: "datetime", comment: "วันที่สร้าง record" }) createDate: Date;

  @ManyToOne(type => MySQLReceiptTypes, types => types.receiptSubTypes)
  @JoinColumn({ name: "receipt_type_id" }) receiptTypes: MySQLReceiptTypes;

  toResponseObject() {
    const {
      courtRunning, receiptTypeId, subTypeId, subTypeName, defaultValue, otherFlag, noEditFlag, fineType, costFlag,
      printFlag, printGroup, createDepCode, createUserId, createUser, updateDepCode, updateUserId, updateUser, updateDate, createDate, receiptTypes
    } = this;

    const responseObject = {
      courtRunning, receiptTypeId, subTypeId, subTypeName, defaultValue, otherFlag, noEditFlag, fineType, costFlag,
      printFlag, printGroup, createDepCode, createUserId, createUser, updateDepCode, updateUserId, updateUser, updateDate, createDate,
    };

    Object.assign(responseObject, {
      receiptTypes: receiptTypes ? receiptTypes.toResponseObject() : null
    })

    return responseObject;
  }
}
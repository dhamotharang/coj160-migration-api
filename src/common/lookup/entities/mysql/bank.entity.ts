import { MySQLReceipts } from "src/business/finance/entities/mysql/receipt.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "pbank" })
export class MySQLBanks {
  @PrimaryColumn({ name: "court_running", comment: "รหัสศาลเจ้าของระบบ" }) courtRunning: number;
  @PrimaryColumn({ name: "bank_id", comment: "รหัสธนาคาร" }) bankId: number;
  @Column({ name: "bank_name", nullable: true, comment: "ชื่อธนาคาร" }) bankName: string;
  @Column({ name: "bank_logo", nullable: true, type: "longblob", comment: "logo ธนาคาร" }) bankLogo: string;
  @Column({ name: "bank_logo_type", nullable: true, comment: "content type ของ logo" }) bankLogotype: string;
  @Column({ name: "std_id", comment: "รหัสมาตราฐาน fk std_pbank.std_id" }) stdId: number;
  @Column({ name: "create_dep_code", nullable: true, comment: "รหัสหน่วยงานที่สร้าง record" }) createDepcode: number;
  @Column({ name: "create_user_id", nullable: true, comment: "รหัส user ที่สร้าง record" }) createUserid: string;
  @Column({ name: "create_user", nullable: true, comment: "user ที่สร้าง record" }) createUser: string;
  @Column({ name: "update_dep_code", nullable: true, comment: "รหัสหน่วยงานที่ update" }) updateDepcode: number;
  @Column({ name: "update_user_id", nullable: true, comment: "รหัส user ที่ update record" }) updateUserid: string;
  @Column({ name: "update_user", nullable: true, comment: "user ที่ update record" }) updateUser: string;
  @Column({ name: "ref_id", comment: "transfer " }) refId: string;
  @CreateDateColumn({ name: "create_date", nullable: true, comment: "วันที่เวลาสร้าง record" }) createDate: Date;
  @UpdateDateColumn({ name: "update_date", nullable: true, comment: "วันที่ เวลา update record" }) updateDate: Date;

  @OneToMany(type => MySQLReceipts, receipts => receipts.banks)
  @JoinColumn({ name: "bank_id" }) receipts: MySQLReceipts[];

  toResponseObject(showLogo: boolean = false) {
    const {
      courtRunning, bankId, bankName, bankLogo, bankLogotype, stdId, createDepcode, createUserid, createUser, createDate, updateDepcode,
      updateUserid, updateUser, updateDate, refId,
    } = this;

    const responseObject = { courtRunning, bankId, bankName };

    if (showLogo) {
      Object.assign(responseObject, {
        bankLogo
      });
    }

    Object.assign(responseObject, {
      bankLogotype, stdId, createDepcode, createUserid, createUser, createDate,
      updateDepcode, updateUserid, updateUser, updateDate, refId,
    })

    return responseObject;
  }
}
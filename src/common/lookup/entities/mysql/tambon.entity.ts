import { HelperService } from "src/shared/helpers/helper.service";
import { Entity, PrimaryGeneratedColumn, PrimaryColumn, Column } from "typeorm";

@Entity({ name: "ptambon" })
export class MySQLTambons extends HelperService {
  constructor() {
    super();
  }
  @PrimaryGeneratedColumn({ name: "tambon_id", comment: "รหัสตำบล" }) tambonId: string;
  @PrimaryColumn({ name: "court_running", comment: "รหัสศาลเจ้าของระบบ" }) courtRunning: number;
  @PrimaryColumn({ name: "amphur_id", comment: "รหัสอำเภอ" }) amphurId: string;
  @PrimaryColumn({ name: "prov_id", comment: "รหัสจังหวัด" }) provId: number;
  @Column({ name: "tambon_name", nullable: true, comment: "ชื่อตำบล" }) tambonName: string;
  @Column({ name: "tambon_name_eng", nullable: true, comment: "ชื่อตำบล(ภาษาอังกฤษ)" }) tambonNameEng: string;
  @Column({ name: "std_id", comment: "รหัสมาตราฐาน fk std_ptambon.std_id" }) stdId: number;
  @Column({ name: "post_code", nullable: true, comment: "รหัสไปรษณีย์" }) postCode: number;
  @Column({ name: "post_remark", nullable: true, comment: "หมายเหตุรหัสไปรษณ๊ย์" }) postRemark: string;
  @Column({ name: "create_dep_code", nullable: true, comment: "รหัสหน่วยงานที่สร้าง record" }) createDepCode: number;
  @Column({ name: "create_user_id", nullable: true, comment: "รหัส user ที่สร้าง record" }) createUserId: string;
  @Column({ name: "create_user", nullable: true, comment: "user ที่สร้าง record" }) createUser: string;
  @Column({ name: "update_dep_code", nullable: true, comment: "รหัสหน่วยงานที่ update" }) updateDepCode: number;
  @Column({ name: "update_user_id", nullable: true, comment: "รหัส user ที่ update record" }) updateUserId: string;
  @Column({ name: "update_user", nullable: true, comment: "user ที่ update record" }) updateUser: string;
  @Column({ name: "ref_prov", nullable: true, comment: "ref_transfer" }) refProv: string;
  @Column({ name: "ref_amp", nullable: true, comment: "ref Boundary" }) refAmp: string;
  @Column({ name: "ref_tam", nullable: true, comment: "ref district" }) refTam: string;
  @Column({ name: "update_date", nullable: true, type: "datetime", comment: "วันที่ เวลา update record" }) updateDate: Date;
  @Column({ name: "create_date", nullable: true, type: "datetime", comment: "วันที่เวลาสร้าง record" }) createDate: Date;

  toResponseObject() {
    const {
      courtRunning, tambonId, tambonName, tambonNameEng, amphurId, provId, stdId, postCode, postRemark, createDepCode, createUserId,
      createUser, createDate, updateDepCode, updateUserId, updateUser, updateDate, refProv, refAmp, refTam
    } = this;

    const responseObject = {
      courtRunning, tambonId, tambonName, tambonNameEng, amphurId, provId, stdId, postCode, postRemark, createDepCode,
      createUserId, createUser, updateDepCode, updateUserId, updateUser, refProv, refAmp, refTam,
      createDate: createDate ? this.dateFormat('YYYY-MM-DD H:i:s', createDate) : null,
      updateDate: updateDate ? this.dateFormat('YYYY-MM-DD H:i:s', updateDate) : null,
    };
    return responseObject;
  }
}
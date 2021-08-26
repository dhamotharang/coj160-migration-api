import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "pjudge" })
export class MySQLJudges {
  @PrimaryColumn({ name: "court_running", comment: "รหัสศาลเจ้าของระบบ" }) courtRunning: number;
  @PrimaryGeneratedColumn({ name: "judge_id", comment: "รหัสผู้พิพากษา" }) judgeId: number;
  @Column({ name: "judge_name", nullable: true, comment: "ชื่อผู้พิพากษา" }) judgeName: string;
  @Column({ name: "short_judge_name", nullable: true, comment: "ชื่อย่อ" }) shortJudgeName: string;
  @Column({ name: "post_id", nullable: true, comment: "รหัสตำแหน่ง fk:pposition.post_id" }) postId: number;
  @Column({ name: "position", nullable: true, comment: "ตำแหน่งผู้พิพากษา" }) position: string;
  @Column({ name: "position2", nullable: true, comment: "ตำแหน่งผู้พิพากษา2" }) position2: string;
  @Column({ name: "position3", nullable: true, comment: "ตำแหน่งผู้พิพากษา3" }) position3: string;
  @Column({ name: "position4", nullable: true, comment: "ตำแหน่งผู้พิพากษา4" }) position4: string;
  @Column({ name: "head_level_flag", nullable: true, comment: "1-ผู้บริหาร" }) headLevelFlag: number;
  @Column({ name: "court_judge_flag", nullable: true, comment: "ผู้พิพากษาประจำศาล" }) courtJudgeFlag: number;
  @Column({ name: "dep_code", nullable: true, comment: "หน่วยงาน" }) depCode: number;
  @Column({ name: "room_id", nullable: true, comment: "ห้องพิจารณาคดี" }) roomId: string;
  @Column({ name: "super_id", nullable: true, comment: "รหัสอาวุโส" }) superId: number;
  @Column({ name: "flag_judge_old", nullable: true, type: "char", length: 1, enum: [1, 2], comment: "สถานะ  1- อยู่   2 - ย้าย" }) flagJudgeOld: number;
  @Column({ name: "judge_check", nullable: true, enum: [1, 0], comment: "ผู้พิพากษาที่สามารถจ่ายเช็ค  1 - จ่ายได้, 0 - จ่ายไม่ได้" }) judgeCheck: number;
  @Column({ name: "gen_no", nullable: true, comment: "รุ่นที่" }) genNo: number;
  @Column({ name: "start_date", nullable: true, type: "date", comment: "วันที่เริ่มต้น" }) startDate: Date;
  @Column({ name: "end_date", nullable: true, type: "date", comment: "วันที่สิ้นสุด" }) endDate: Date;
  @Column({ name: "ref_id", nullable: true, comment: "รหัสผู้พิพากษาจาก converst data" }) refId: string;
  @Column({ name: "from_court", nullable: true, comment: "ย้ายมาจากศาล" }) fromCourt: number;
  @Column({ name: "to_court", nullable: true, comment: "ย้ายไปศาล" }) toCourt: number;
  @Column({ name: "old_judge_id", nullable: true, comment: "รหัสเดิม" }) oldJudgeId: string;
  @Column({ name: "signature", nullable: true, type: "longblob", comment: "ลายเซ้นต์" }) signature: number;
  @Column({ name: "office_room", nullable: true, comment: "ห้องพัก" }) officeRoom: string;
  @Column({ name: "address", nullable: true, type: "text", comment: "ที่อยู่ เพิ่มเติม" }) address: number;
  @Column({ name: "addr_no", nullable: true, comment: "บ้านเลขที่" }) addrNo: string;
  @Column({ name: "moo", nullable: true, comment: "หมู่ที่" }) moo: string;
  @Column({ name: "soi", nullable: true, comment: "ซอย" }) soi: string;
  @Column({ name: "near_to", comment: "ใกล้เกคียง" }) nearTo: string;
  @Column({ name: "road", nullable: true, comment: "ถนน" }) road: string;
  @Column({ name: "tambon_id", nullable: true, comment: "รหัสตำบล" }) tambonId: string;
  @Column({ name: "amphur_id", nullable: true, comment: "รหัสอำเภอ" }) amphurId: string;
  @Column({ name: "prov_id", nullable: true, type: "char", comment: "รหัสจังหวัด" }) provId: number;
  @Column({ name: "post_no", nullable: true, comment: "รหัสไปรษณีย์" }) postNo: string;
  @Column({ name: "tel_no", nullable: true, comment: "หมายเลขโทรศํพท์" }) telNo: string;
  @Column({ name: "remark", nullable: true, type: "text", comment: "หมายเหตุ" }) remark: number;
  @Column({ name: "create_dep_code", nullable: true, comment: "รหัสหน่วยงานที่สร้าง record" }) createDepCode: number;
  @Column({ name: "create_user_id", nullable: true, comment: "รหัส user ที่สร้าง record" }) createUserId: string;
  @Column({ name: "create_user", nullable: true, comment: "user ที่สร้าง record" }) createUser: string;
  @Column({ name: "create_date", nullable: true, type: "datetime", comment: "วันที่เวลาสร้าง record" }) createDate: Date;
  @Column({ name: "update_dep_code", nullable: true, comment: "รหัสหน่วยงานที่ update" }) updateDepCode: number;
  @Column({ name: "update_user_id", nullable: true, comment: "รหัส user ที่ update record" }) updateUserId: string;
  @Column({ name: "update_user", nullable: true, comment: "user ที่ update record" }) updateUser: string;
  @Column({ name: "update_date", nullable: true, type: "datetime", comment: "วันที่ เวลา update record" }) updateDate: Date;

  toResponseObject() {
    const { courtRunning, judgeId, judgeName, shortJudgeName, postId, position, position2, position3, position4, headLevelFlag, courtJudgeFlag, depCode, roomId, superId, flagJudgeOld, judgeCheck, genNo, startDate, endDate, refId, fromCourt, toCourt, oldJudgeId, signature, officeRoom, address, addrNo, moo, soi, nearTo, road, tambonId, amphurId, provId, postNo, telNo, remark, createDepCode, createUserId, createUser, createDate, updateDepCode, updateUserId, updateUser, updateDate } = this;
    const reponseObject = { judgeId, courtRunning, judgeName, shortJudgeName, postId, position, position2, position3, position4, headLevelFlag, courtJudgeFlag, depCode, roomId, superId, flagJudgeOld, judgeCheck, genNo, startDate, endDate, refId, fromCourt, toCourt, oldJudgeId, signature, officeRoom, address, addrNo, moo, soi, nearTo, road, tambonId, amphurId, provId, postNo, telNo, remark, createDepCode, createUserId, createUser, createDate, updateDepCode, updateUserId, updateUser, updateDate };
    return reponseObject;
  }
}
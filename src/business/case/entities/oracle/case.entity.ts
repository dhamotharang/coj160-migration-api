import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "PC_CASE" })
export class OracleCases {
  @PrimaryGeneratedColumn({ name: "CASE_ID" }) caseId: number;
  @Column({ name: "ORDER_NO", type: "float", default: 0, nullable: true }) oraderNo: number;
  @Column({ name: "ACCU_DESC", nullable: true }) accuDesc: string;
  @Column({ name: "ACCU_JOINT_DESC", nullable: true }) accuJointDesc: string;
  @Column({ name: "ALLE_DESC", nullable: true }) alleDesc: string;
  @Column({ name: "BARCODE", nullable: true }) barcode: string;
  @Column({ name: "CASE_CATE_ID", nullable: true }) caseCateId: number;
  @Column({ name: "COMPLAINANT_DESC", nullable: true }) complainantDesc: string;
  @Column({ name: "CASE_CONFESS", nullable: true }) caseConfess: number;
  @Column({ name: "COURT_ID", nullable: true }) courtId: number;
  @Column({ name: "CASE_DATE", type: "timestamp", nullable: true }) caseDate: Date;
  @Column({ name: "DEPOSIT", type: "float", nullable: true }) deposit: number;
  @Column({ name: "CASE_DISPUTE_ID", nullable: true }) caseDisputeId: number;
  @Column({ name: "FEE", type: "float", nullable: true }) fee: number;
  @Column({ name: "BLACK_IDNUM" }) blackIdnum: number;
  @Column({ name: "CASE_OR_REQ", nullable: true }) caseOrReq: number;
  @Column({ name: "ORDER_JUDGE_DATE", nullable: true, type: "timestamp" }) orderJudgeDate: Date;
  @Column({ name: "POLICE_ID", nullable: true }) policeId: number;
  @Column({ name: "PROS_DESC", nullable: true }) prosDesc: string;
  @Column({ name: "PROS_JOINT_DESC", nullable: true }) prosJointDesc: string;
  @Column({ name: "RATE_PENALTY", nullable: true }) ratePenalty: number;
  @Column({ name: "CASE_REMARK_PLACE", nullable: true }) caseRemarkPlace: string;
  @Column({ name: "CASE_RESULT_DESC", nullable: true, type: "clob" }) caseResultDesc: string;
  @Column({ name: "CASE_RESULT_DESC_INPUT_DATE", type: "timestamp", nullable: true }) caseResultDescInputDate: Date;
  @Column({ name: "CASE_STEP_ID", nullable: true }) caseStepId: number;
  @Column({ name: "BLACK_TITLE_ID" }) blackTitleId: number;
  @Column({ name: "CASE_TYPE_ID", nullable: true }) caseTypeId: number;
  @Column({ name: "CASE_TYPE_SUB_ID", nullable: true }) caseTypeSubId: number;
  @Column({ name: "BLACK_YEAR" }) blackYear: number;
  @Column({ name: "CONVERTID", nullable: true }) convertId: number;
  @Column({ name: "CONVERTSTRINGCASE", nullable: true }) convertStringCase: string;
  @Column({ name: "COURT_ZONE_PROVINCE_ID", nullable: true }) courtZoneProvinceId: number;
  @Column({ name: "CRIME_DATE", nullable: true, type: "timestamp" }) crimeDate: Date;
  @Column({ name: "DISTRICT_OR_PROVINCIAL", nullable: true }) districtOrProvincial: number;
  @Column({ name: "FEE_FLAG", nullable: true }) feeFlag: number;
  @Column({ name: "IMPORTANT_CASE_FLAG", nullable: true }) importantCaseFlag: number;
  @Column({ name: "INDICT_BRAND_DESC", nullable: true, type: "clob" }) indictBrandDesc: string;
  @Column({ name: "INDICT_BRAND_ID", nullable: true }) indictBrandId: number;
  @Column({ name: "JUDGE_ROOM_ID", nullable: true }) judgeRoomId: number;
  @Column({ name: "JUDGEMENT_INPUT_DATE", nullable: true, type: "timestamp" }) judgeInputDate: Date;
  @Column({ name: "LITIGANT_RECEIVE_BY_ID", nullable: true }) litigantReceiveById: number;
  @Column({ name: "PENALTY_DESC", nullable: true, type: "clob" }) penaltyDesc: string;
  @Column({ name: "CASE_REMARK", nullable: true, type: "clob" }) caseRemark: string;
  @Column({ name: "REPORT_HEAD_FLAG", nullable: true }) reportHeadFlag: number;
  @Column({ name: "SYNDICATE_DECISION_DESC", nullable: true, type: "clob" }) syndicateDecisionDesc: string;
  @Column({ name: "HOLD_REASON_ID", nullable: true }) holdReasonId: number;
  @Column({ name: "CASE_RECEIVE_BY", nullable: true }) caseReceiveBy: number;
  @Column({ name: "CASE_SITUATION_ID", nullable: true }) caseSituationId: number;
  @Column({ name: "CASE_STATUS_ID", nullable: true }) caseStatusId: number;
  @Column({ name: "CREATED_BY", default: 0 }) createdBy: number;
  @Column({ name: "UPDATED_BY", nullable: true }) updatedBy: number;
  @Column({ name: "REMOVED_BY", nullable: true }) removedBy: number;
  @CreateDateColumn({ name: "CREATED_DATE", type: "timestamp" }) createdDate: Date;
  @UpdateDateColumn({ name: "UPDATED_DATE", type: "timestamp", nullable: true }) updatedDate: Date;
  @UpdateDateColumn({ name: "REMOVED_DATE", type: "timestamp", nullable: true }) removedDate: Date;

  toResponseObject() {
    const {
      caseId, oraderNo, accuDesc, accuJointDesc, alleDesc, barcode, caseCateId, complainantDesc, caseConfess, courtId, caseDate, deposit, caseDisputeId, fee, blackIdnum, caseOrReq, orderJudgeDate, policeId, prosDesc,
      prosJointDesc, ratePenalty, caseRemarkPlace, caseResultDesc, caseResultDescInputDate, caseStepId, blackTitleId, caseTypeId, caseTypeSubId, blackYear, convertId,
      convertStringCase, courtZoneProvinceId, crimeDate, districtOrProvincial, feeFlag, importantCaseFlag, indictBrandDesc, indictBrandId, judgeRoomId,
      judgeInputDate, litigantReceiveById, penaltyDesc, caseRemark, reportHeadFlag, syndicateDecisionDesc, holdReasonId, caseReceiveBy, caseSituationId, caseStatusId, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate
    } = this;

    const responseObject = {
      caseId, oraderNo, accuDesc, accuJointDesc, alleDesc, barcode, caseCateId, complainantDesc, caseConfess, courtId, caseDate, deposit, caseDisputeId, fee, blackIdnum, caseOrReq, orderJudgeDate, policeId, prosDesc,
      prosJointDesc, ratePenalty, caseRemarkPlace, caseResultDesc, caseResultDescInputDate, caseStepId, blackTitleId, caseTypeId, caseTypeSubId, blackYear, convertId,
      convertStringCase, courtZoneProvinceId, crimeDate, districtOrProvincial, feeFlag, importantCaseFlag, indictBrandDesc, indictBrandId, judgeRoomId,
      judgeInputDate, litigantReceiveById, penaltyDesc, caseRemark, reportHeadFlag, syndicateDecisionDesc, holdReasonId, caseReceiveBy, caseSituationId, caseStatusId, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate
    };

    return responseObject;
  }
}
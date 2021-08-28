import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity({ name: 'PC_LABOR_EXECUTION_PROCESS' })
export class OraclePcLaborExecutionProcess {
    @PrimaryGeneratedColumn({ name: 'PROCESS_ID', comment: 'รหัสข้อมูลส่วนรายละเอียดทรัพย์สินที่ต้องทำการบังคับคดี (AUTO INCREMENT)' }) processId: number;
    @Column({ name: 'EXECUTION_ID', nullable: false, comment: 'รหัสข้อมูลผู้ร้องบังคับคดี เชื่อมโยงตาราง PC_LABOR_EXECUTION' }) executionId: number;
    @Column({ name: 'EXECUTION_TYPE_ID', nullable: true, comment: 'ข้อมูลประเภทการบังคับคดี' }) executionTypeId: string;
    @Column({ name: 'DEFENDANT_ID', nullable: true, comment: 'รหัสข้อมูลจำเลย เชื่อมโยงตาราง PC_CASE_LIT' }) defendantId: number;
    @Column({ name: 'CREATED_BY', nullable: false, comment: 'รหัสผู้สร้างข้อมูล เชื่อมโยง PC_USER_PROFILE' }) createdBy: number;
    @Column({ name: 'CREATED_DATE', nullable: false, comment: 'วันเวลาที่สร้างข้อมูล' }) createdDate: Date;
    @Column({ name: 'UPDATED_BY', nullable: true, comment: 'รหัสผู้แก้ไขข้อมูลล่าสุด เชื่อมโยง PC_USER_PROFILE' }) updatedBy: number;
    @Column({ name: 'UPDATED_DATE', nullable: true, comment: 'วันเวลาที่แก้ไขข้อมูลล่าสุด' }) updatedDate: Date;
    @Column({ name: 'REMOVED_BY', nullable: false, comment: 'รหัสผู้ลบข้อมูล เชื่อมโยง PC_USER_PROFILE' }) removedBy: number;
    @Column({ name: 'REMOVED_DATE', nullable: true, comment: 'วันเวลาที่ลบข้อมูล' }) removedDate: Date;
    @Column({ name: 'ORDER_NO', nullable: true, comment: 'ลำดับของข้อมูล' }) orderNo: number;
    @Column({ name: 'ASSET_DETAIL', nullable: true, comment: 'รายละเอียดของทรัพย์สิน' }) assetDetail: string;
    @Column({ name: 'ASSET_LOCATION', nullable: true, comment: 'สถานที่ของทรัพย์สิน' }) assetLocation: string;
    @Column({ name: 'COST_ESTIMATE', nullable: false, comment: 'ราคาประเมิน' }) costEstimate: number;
    @Column({ name: 'DEFENDANT_LASTNAME', nullable: true, comment: 'นามสกุลจำเลย' }) defendantLastname: string;
    @Column({ name: 'DEFENDANT_NAME', nullable: true, comment: 'ชื่อจำเลย' }) defendantName: string;
    @Column({ name: 'DEFENDANT_ORDER_NO', nullable: true, comment: 'ลำดับจำเลย' }) defendantOrderNo: number;

    toResponseObject() {
        const { processId, executionId, executionTypeId, defendantId, createdBy, createdDate, updatedBy, updatedDate, removedBy, removedDate, orderNo, assetDetail, assetLocation, costEstimate, defendantLastname, defendantName, defendantOrderNo } = this;
        const responseObject = { processId, executionId, executionTypeId, defendantId, createdBy, createdDate, updatedBy, updatedDate, removedBy, removedDate, orderNo, assetDetail, assetLocation, costEstimate, defendantLastname, defendantName, defendantOrderNo };
        return responseObject;
    }
}
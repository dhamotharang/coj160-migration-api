import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity({ name: 'PC_LABOR_COMPLAINANT_DEFENDANT_ADDRESS' })
export class OraclePcLaborComplainantDefendantAddress {
    @PrimaryGeneratedColumn({ name: 'DEFENDANT_ADDRESS_ID', comment: 'รหัสระบบบันทึกคดีแรงงาน (รง. 2) ส่วนที่อยู่จำเลย (AUTO INCREMENT)' }) defendantAddressId: number;
    @Column({ name: 'CREATED_BY', nullable: false, comment: 'รหัสผู้สร้างข้อมูล เชื่อมโยง PC_USER_PROFILE' }) createdBy: number;
    @Column({ name: 'CREATED_DATE', nullable: false, comment: 'วันเวลาที่สร้างข้อมูล' }) createdDate: Date;
    @Column({ name: 'UPDATED_BY', nullable: true, comment: 'รหัสผู้แก้ไขข้อมูลล่าสุด เชื่อมโยง PC_USER_PROFILE' }) updatedBy: number;
    @Column({ name: 'UPDATED_DATE', nullable: true, comment: 'วันเวลาที่แก้ไขข้อมูลล่าสุด' }) updatedDate: Date;
    @Column({ name: 'REMOVED_BY', nullable: false, comment: 'รหัสผู้ลบข้อมูล เชื่อมโยง PC_USER_PROFILE' }) removedBy: number;
    @Column({ name: 'REMOVED_DATE', nullable: true, comment: 'วันเวลาที่ลบข้อมูล' }) removedDate: Date;
    @Column({ name: 'ORDER_NO', nullable: true, comment: 'ลำดับของข้อมูล' }) orderNo: number;
    @Column({ name: 'ADDRESS_NO', nullable: true, comment: 'ที่อยู่เลขที่' }) addressNo: string;
    @Column({ name: 'ADDRESS_TYPE_ID', nullable: true, comment: 'รหัสประเภทที่อยู่ เชื่อมโยง PC_LOOKUP_ADDRESS_TYPE' }) addressTypeId: number;
    @Column({ name: 'COUNTRY_ID', nullable: true, comment: 'รหัสประเทศ เชื่อมโยง PC_LOOKUP_COUNTRY' }) countryId: number;
    @Column({ name: 'DISTRICT_ID', nullable: true, comment: 'รหัสเขต/อำเภอ เชื่อมโยง PC_LOOKUP_DISTRICT' }) districtId: number;
    @Column({ name: 'COMPLAINANT_DEFENDANT_ID', nullable: false, comment: 'รหัสระบบบันทึกคำร้องศาลแรงงาน ส่วนผู้คัดค้าน เชื่อมโยง PC_LABOR_COMPLAINANT_DEFENDANT' }) complainantDefendantId: number;
    @Column({ name: 'MOO', nullable: true, comment: 'หมู่ที่' }) moo: string;
    @Column({ name: 'PHONE_NUMBER', nullable: true, comment: 'เบอร์โทรศัพท์' }) phoneNumber: string;
    @Column({ name: 'POST', nullable: true, comment: 'รหัสไปรษณีย์' }) post: string;
    @Column({ name: 'PROVINCE_ID', nullable: true, comment: 'รหัสจังหวัด เชื่อมโยง PC_LOOKUP_PROVINCE' }) provinceId: number;
    @Column({ name: 'ROAD', nullable: true, comment: 'ถนน' }) road: string;
    @Column({ name: 'SOI', nullable: true, comment: 'ซอย' }) soi: string;
    @Column({ name: 'SUB_DISTRICT_ID', nullable: true, comment: 'รหัสแขวง/ตำบล เชื่อมโยง PC_LOOKUP_SUB_DISTRICT' }) subDistrictId: number;

    toResponseObject() {
        const { defendantAddressId, createdBy, createdDate, updatedBy, updatedDate, removedBy, removedDate, orderNo, addressNo, addressTypeId, countryId, districtId, complainantDefendantId, moo, phoneNumber, post, provinceId, road, soi, subDistrictId } = this;
        const responseObject = { defendantAddressId, createdBy, createdDate, updatedBy, updatedDate, removedBy, removedDate, orderNo, addressNo, addressTypeId, countryId, districtId, complainantDefendantId, moo, phoneNumber, post, provinceId, road, soi, subDistrictId };
        return responseObject;
    }
}
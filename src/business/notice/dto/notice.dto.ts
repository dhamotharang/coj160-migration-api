import { ApiProperty } from "@nestjs/swagger";

export class OracleNoticeDTO {
  @ApiProperty() caseId: number;
  @ApiProperty() noticeCodeNo: number;
  @ApiProperty() noticeCodeYear: number;
  @ApiProperty() noticeTypeId: number;
  @ApiProperty() noticeTypeName: string;
  @ApiProperty() noticeTypeCode: string;
  @ApiProperty() noticeDate: Date;
  @ApiProperty() allegationId: number;
  @ApiProperty() alleDesc: string;
  @ApiProperty() allegationDetail: string;
  @ApiProperty() address: string;
  @ApiProperty() addressPlace: string;
  @ApiProperty() road: string;
  @ApiProperty() currentPostCode: string;
  @ApiProperty() currentSubdistrictId: number;
  @ApiProperty() currentDistrictId: number;
  @ApiProperty() currentProvinceId: number;
  @ApiProperty() isCancel: number;
  @ApiProperty() noticeColor: string;
  @ApiProperty() noticeSendStatus: number;
  @ApiProperty() noticePrint: string;
  @ApiProperty() releaseDate: Date;
  @ApiProperty() printDate: Date;
  @ApiProperty() sendDate: Date;
  @ApiProperty() sendFee: number;
  @ApiProperty() sendBy: number;
  @ApiProperty() sendMethod: number;
  @ApiProperty() sendToCourt: number;
  @ApiProperty() isCountryArea: number;
  @ApiProperty() isCourtArea: number;
  @ApiProperty() litigantId: number;
  /* 
    @ApiProperty() alley: string;
    @ApiProperty() appointListCode: string;
    @ApiProperty() appointListName: string;
    @ApiProperty() cancelReason: string;
    @ApiProperty() cancelStatus: number;
    @ApiProperty() courtId: number;
    @ApiProperty() courtType: string;
    @ApiProperty() decreeNo: number;
    @ApiProperty() departmentId: number;
    @ApiProperty() imprisonDay: string;
    @ApiProperty() imprisonNote: string;
    @ApiProperty() imprisonedDays: number;
    @ApiProperty() litigantName: string;
    @ApiProperty() litigantRank: number;
    
    
    @ApiProperty() judgeId: number;
    @ApiProperty() lawNumber: string;
    
    
    @ApiProperty() litigantReceivedDate: Date;
    @ApiProperty() moo: string;
    @ApiProperty() noticeAllday: number;
    @ApiProperty() noticeIsAgent: number;
    @ApiProperty() noticeReason: string;
    @ApiProperty() officerReceivedBy: number;
    @ApiProperty() orderSendMethod: string;
    @ApiProperty() phoneNumber: string;
    @ApiProperty() postDebtDate: Date;
    @ApiProperty() postDebtNo: string;
    @ApiProperty() postInvoiceDate: Date;
    @ApiProperty() postSendResult: number;
    @ApiProperty() postSendTransDate: Date;
    @ApiProperty() printBy: number;
    @ApiProperty() prisonId: number;
    @ApiProperty() receivedBy: number;
    @ApiProperty() section: string;
    
    
    
    @ApiProperty() sineTheDate: Date;
    @ApiProperty() telephoneAgency: string;
    @ApiProperty() typeOfSubpoena: number;
    @ApiProperty() unsendDetail: string;
    
    @ApiProperty() endNoticeId: number;
    @ApiProperty() noticeTypeCodeRef: string;
    @ApiProperty() noticeTypeIdRef: number;
    @ApiProperty() noticeReleaseNotice: string;
    @ApiProperty() noticeSendResultStatus: number;
    @ApiProperty() backpage: string;
    @ApiProperty() impirson: string;
    @ApiProperty() imprisonment: string;
    @ApiProperty() noticeNowReson: string;
    @ApiProperty() rubberStamp: string;
    @ApiProperty() careTaker: string;
    @ApiProperty() courtAppointDate: Date;
    @ApiProperty() courtCommand: string;
    @ApiProperty() currentStatus: string;
    @ApiProperty() prisoner: string;
    @ApiProperty() endNoticeName: string;
    @ApiProperty() noticeRedDate: Date;
    @ApiProperty() bookAccoutId: number;
    @ApiProperty() litigantTypeId: number;
    @ApiProperty() imprisonDetail: string; */
}
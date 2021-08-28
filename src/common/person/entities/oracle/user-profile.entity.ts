import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "PC_USER_PROFILE" })
export class OracleUserProfiles {
  @PrimaryColumn({ name: "USER_PROFILE_ID" }) userProfileId: number;
  @Column({ name: "ORDER_NO", type: "float", default: 0.0 }) orderNo: number;
  @Column({ name: "USER_PROFILE_CODE", nullable: true }) userProfileCode: string;
  @Column({ name: "CREATE_STATEMENT", nullable: true }) createStatement: number;
  @Column({ name: "CREATE_WARRANT", nullable: true }) createWarrant: number;
  @Column({ name: "USER_PROFILE_DEFAULT_SELECT", nullable: true }) userProfileDefaultSelect: number;
  @Column({ name: "DIGITAL_KEY", nullable: true }) digitalKey: string;
  @Column({ name: "USER_PROFILE_EMAIL", nullable: true }) userProfileEmail: string;
  @Column({ name: "USER_PROFILE_FIRST_NAME", nullable: true }) userProfileFirstName: string;
  @Column({ name: "USER_PROFILE_FULL_NAME", nullable: true }) userProfileFullName: string;
  @Column({ name: "USER_PROFILE_LAST_NAME", nullable: true }) userProfileLastName: string;
  @Column({ name: "LINK_ID", nullable: true }) linkId: number;
  @Column({ name: "LINK_TYPE", nullable: true }) linkType: string;
  @Column({ name: "USER_PROFILE_TEL", nullable: true }) userProfileTel: string;
  @Column({ name: "POSITION_ID", nullable: true }) positionId: number;
  @Column({ name: "POSITION_TYPE_ID", nullable: true }) positionTypeId: number;
  @Column({ name: "STRUCTURE_ID" }) structureId: number;
  @Column({ name: "USER_ID" }) userId: number;
  @Column({ name: "USER_PROFILE_TYPE", nullable: true }) userProfileType: number;
  @Column({ name: "CREATED_BY", default: 0 }) createdBy: number;
  @Column({ name: "UPDATED_BY", default: 0 }) updatedBy: number;
  @Column({ name: "REMOVED_BY", default: 0 }) removedBy: number;
  @Column({ name: "CREATED_DATE", type: "timestamp" }) createdDate: Date;
  @Column({ name: "UPDATED_DATE", nullable: true, type: "timestamp" }) updatedDate: Date;
  @Column({ name: "REMOVED_DATE", nullable: true, type: "timestamp" }) removedDate: Date;

  toResponseObject() {
    const { userProfileId, orderNo, userProfileCode, createStatement, createWarrant, userProfileDefaultSelect, digitalKey, userProfileEmail, userProfileFirstName, userProfileFullName, userProfileLastName, linkId, linkType, userProfileTel, positionId, positionTypeId, structureId, userId, userProfileType, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate } = this;
    const responseObject = { userProfileId, orderNo, userProfileCode, createStatement, createWarrant, userProfileDefaultSelect, digitalKey, userProfileEmail, userProfileFirstName, userProfileFullName, userProfileLastName, linkId, linkType, userProfileTel, positionId, positionTypeId, structureId, userId, userProfileType, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate };
    return responseObject;
  }
}
import { HelperService } from "src/shared/helpers/helper.service";
import { BeforeInsert, Column, CreateDateColumn, Entity, getManager, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import fs = require("fs");
import CryptoJS = require("crypto-js");

@Entity({ name: "users" })
export class PostgresUsers extends HelperService {
  @PrimaryGeneratedColumn({ name: "id" }) id: number;
  @Column({ name: "code" }) code: string;
  @Column({ name: "type", enum: ["DV", "SA", "AM", "US"], default: "US" }) type: string;
  @Column({ name: "level", enum: [1, 2, 3, 4], default: 4 }) level: number;
  @Column({ name: "username" }) username: string;
  @Column({ name: "password" }) password: string;
  @Column({ name: "firstname" }) firstname: string;
  @Column({ name: "lastname", nullable: true }) lastname: string;
  @Column({ name: "email", nullable: true }) email: string;
  @Column({ name: "phone_no", nullable: true }) phoneNo: string;
  @Column({ name: "mobile_no", nullable: true }) mobileNo: string;
  @Column({ name: "is_active", default: true }) isActive: boolean;
  @Column({ name: "is_delete", default: false }) isDelete: boolean;
  @Column({ name: "create_by" }) createBy: number;
  @Column({ name: "modify_by" }) modifyBy: number;
  @CreateDateColumn({ name: "create_at" }) createAt: Date;
  @UpdateDateColumn({ name: "modify_at" }) modifyAt: Date;

  @BeforeInsert()
  async hashPassword() {
    const date = this.dateFormat('YYMM');
    const type = (typeof this.type !== "undefined" ? this.type : "US");
    const countUser = await getManager("postgresql").getRepository(PostgresUsers).count({ type });
    this.code = `${type}${date}${`${(countUser + 1)}`.padStart(4, '0')}`;
    this.password = await bcrypt.hash(this.password.trim(), 10);

    switch (this.type) {
      case "DV": this.level = 1; break;
      case "SA": this.level = 2; break;
      case "AM": this.level = 3; break;
      case "US": this.level = 4; break;
      default: this.level = 4; break;
    }
  }

  private strEncrypt(text) {
    const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(text), process.env.SECRET).toString();
    return ciphertext;
  }

  private get access_token() {
    // PAYLOAD
    const { id, email, code, username, type, level } = this;

    const payload = this.strEncrypt({ id, email, code, username, type, level });

    // PRIVATE key
    const privateKEY = fs.readFileSync(`${process.env.PRIVATE_KEY}`, 'utf8');

    return jwt.sign({ payload }, privateKEY, {
      issuer: `${process.env.ISSUER}`,
      subject: `${process.env.SUBJECT}`,
      audience: `${process.env.AUDIENCE}`,
      expiresIn: "7d",
      algorithm: "RS256"
    });
  }

  async comparePassword(text: string) {
    return await bcrypt.compare(text, this.password);
  }

  toResponseObject(showPassword: boolean = false, showToken: boolean = false) {
    const { id, type, username, password, firstname, lastname, email, phoneNo, mobileNo, isActive, isDelete, createBy, modifyBy, createAt, modifyAt, access_token } = this;
    const responseObject = { id, type, username };

    if (showPassword) {
      Object.assign(responseObject, {
        password
      });
    }

    Object.assign(responseObject, {
      firstname, lastname, email, phoneNo, mobileNo, isActive, isDelete, createBy, modifyBy, createAt, modifyAt
    });

    if (showToken) {
      Object.assign(responseObject, {
        access_token
      });
    }

    return responseObject;
  }
}
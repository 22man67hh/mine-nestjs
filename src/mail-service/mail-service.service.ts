import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
@Injectable()
export class MailServiceService {
    private readonly logger = new Logger(MailServiceService.name);
    private transporter: nodemailer.Transporter;
    constructor() {
        this.transporter=nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            port:process.env.MAIL_PORT,
            secure:false,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSWORD
            }
        });
    }

    generateOtp():string{
        return Math.floor(100000 + Math.random() * 900000).toString();
    }
    async sendOtpEmail(email:string,otp:string){
        const mailOptions={
            from:process.env.MAIL_USER,
            to:email,
            subject:'OTP',
            text:`Your OTP is ${otp}`
        }
        this.transporter.sendMail(mailOptions,(error,info)=>{
            if(error){
                this.logger.error(error);
            }else{
                this.logger.log(info);
            }
        })
    }
}

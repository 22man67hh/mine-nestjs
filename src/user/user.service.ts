import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

import { DatabaseService } from 'src/database/database.service';
import { MailServiceService } from 'src/mail-service/mail-service.service';
@Injectable()
export class UserService {
  constructor(private readonly prisma: DatabaseService,
    private readonly mailService: MailServiceService
  ) {}
  async create(createUserDto: CreateUserDto) {
    const { email, password, fullName, phoneNumber, address } = createUserDto;
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }
    const saltOrRounds = 10;
const hashPassword = await bcrypt.hash(password, saltOrRounds);

const otp =this.mailService.generateOtp();
const otpExpiresAt=new Date(Date.now()+10*60*1000);
const hashedOtp = await bcrypt.hash(otp, saltOrRounds);
    const newUser = await this.prisma.user.create({
      data: {
        email,
        password: hashPassword,
        fullName: fullName,
        phoneNumber,
        address,
        country: 'nepal',
        isPackage: false,
        otp:hashedOtp,
        otpExpiresAt:otpExpiresAt,
        isActive:false
      },
    });
await this.mailService.sendOtpEmail(email,otp);
    const { password: _, ...userWithoutPassword } = newUser;
    return {
      message:'Registration successfull please check emial for verification',
      user:userWithoutPassword,
    };
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
  findByEmail(email: string) {
    const user=this.prisma.user.findUnique({
      where:{email}
    })
    return user ;
  }
}

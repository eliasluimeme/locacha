import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { signUpDto } from './dto/signup.dto';
import { signInDto } from './dto/signin.dto';
import * as argon from 'argon2';
import * as uuid from 'uuid';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as nodemailer from 'nodemailer';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { ForgotPasswordDto } from './dto/forgotPw.dto';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, 
        private jwt: JwtService, 
        private userService: UserService,
        private mailerService: MailerService,
        private configSerivice: ConfigService ) {}

    async createUser( dto: signUpDto ): Promise<any> {
        try {
            const user = await this.prisma.user.create({
                data: dto,
            })
            return user;
        } catch ( error ) {
            console.log( error );
        }
    }

    async ifValidCredentials( dto: signUpDto ): Promise<any> {
        try {
            const user = await this.prisma.user.findUnique({
                where: {
                  email: dto.email,
                },
            });
            if (user) return false; else return true;
        } catch (error) {
            console.log(error);
        }
    }

    async signup( dto: signUpDto ): Promise<any> {
        try {
            const valid = await this.ifValidCredentials(dto);
            if (!valid)
                throw new UnauthorizedException("Email already taken");

            dto.password = await argon.hash(dto.password);
            const user = await this.createUser(dto);
            delete user.password;

            return user;
        } catch(error) {
            // console.log( error );
            if (error instanceof UnauthorizedException)
                throw error;
        }
    }

    async signin(user: signInDto): Promise<any> {
        try {
            return await this.validateUser(user.email, user.password);
        } catch(error) {
            if (error instanceof UnauthorizedException)
                throw error;
            console.log(error);
        }
    }

    async validateUser(email: string, pw: string): Promise<any> {
        try {
            const user = await this.prisma.user.findUnique({
                where: {
                  email: email,
                },
            });
          
            if (!user) throw new UnauthorizedException("User does not exist");
          
            const pwMatch = await argon.verify(user.password, pw);
            if (pwMatch) return user; else throw new UnauthorizedException("Invalid password");
        } catch(error) {
            if (error instanceof UnauthorizedException)
                throw error;
            console.log(error)
        }
    }

    async generateToken( email: string ): Promise<any> {
        return await this.jwt.signAsync({
            email: email,
          }, { 
            secret: process.env.JWT_SECRET, 
            expiresIn: '1d',
        });
    }

    async sendEmail(email: string ): Promise<any> {
        try {
            const result = await this.mailerService.sendMail({
                from: this.configSerivice.get('EMAIL_SENDER'),
                to: email,
                subject: 'Reset Password',
                text: `To reset your password, click the following link: http://example.com/reset-password/`,
            })
            return result;
        } catch(error) {
            console.log(error);
        }
    }

    async forgotPassword(email: string): Promise<void> {
        try {
            const user = await this.userService.findUserByEmail(email);
    
            if (!user)
                throw new BadRequestException(`User not found`);
    
            return await this.sendEmail(email)
        } catch (error) {
            console.log(error);
        }
    }
}

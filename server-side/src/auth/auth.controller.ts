import { Body, Controller, Get, HttpStatus, Post, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signUpDto } from './dto/signup.dto';
import { signInDto } from './dto/signin.dto';
import { JwtAuthGuard } from './guards/jwt.guard';
import { ForgotPasswordDto } from './dto/forgotPw.dto';

@Controller('')
export class AuthController {
    constructor( private authService: AuthService) {}

    @Post('auth/signup')
    @UsePipes(new ValidationPipe())
    async signup(@Body() dto: signUpDto, @Res() res) {
        const user = await this.authService.signup(dto);
        const token = await this.authService.generateToken( user.email );
        res.cookie( 'access_token', `${token}`, { httpOnly: true, maxAge: 60 * 60 * 24 * 1000 });
        return res.status(HttpStatus.CREATED).json(user);
    }
    
    @Post('auth/login')
    // @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe())
    async login(@Body() dto: signInDto, @Res() res) {
        const user = await this.authService.signin(dto);
        const token = await this.authService.generateToken( user.email );
        res.cookie( 'access_token', `${token}`, { httpOnly: true, maxAge: 60 * 60 * 24 * 1000 });
        return res.status(HttpStatus.OK).json(user);
    }

    @Post('auth/reset-password')
    @UsePipes(new ValidationPipe())
    async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto): Promise<void> {
      return await this.authService.forgotPassword(forgotPasswordDto.email);
    }

    @Get('logout')
    @UseGuards(JwtAuthGuard)
    logout(@Res() res: any) {
        res.clearCookie('access_token');
        return res.status(200).json({});
    }
}

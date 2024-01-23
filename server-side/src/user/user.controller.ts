import { Body, Controller, Get, Post, Req, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UserService } from './user.service';

@Controller('')
export class UserController {
    constructor(private userService: UserService) {}

    @Post('post')
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe())
    async post(@Req() req: any, @Res() res: any, @Body() body: any) {
        return res.status(201).json( await this.userService.post(req.user, body) );
    }

    @Get('posts')
    @UseGuards(JwtAuthGuard)
    async getPosts(@Req() req: any, @Res() res: any) {
        return res.status(200).json( await this.userService.getPosts(req.user) );
    }
}

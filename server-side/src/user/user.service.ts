import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { postDto } from './dto/post.dto';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async findUserByEmail(email: string) {
        try {
            const user = await this.prisma.user.findUnique({
                where: {
                  email: email,
                },
            });
            return user;
        } catch ( error ) {
            console.log( error );
        }
    }

    async post(user: any, dto: postDto) {
        try {
            return await this.prisma.post.create({
                data: {
                    title: dto.title,
                    content: dto.content,
                    latitude: dto.location.latitude,
                    longitude: dto.location.longitude,
                    author: {
                        connect: {
                            id: user.id,
                        }
                    }
                },
            })
        } catch (error) {
            console.log(error);
        }
    }

    async getPosts(user: any) {
        try {
            return await this.prisma.post.findMany({})
        } catch (error) {
            console.log(error);
        }
    }
}

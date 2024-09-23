import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    async signIn(username: string, pass: string): Promise<{ access_token: string; refresh_token: string }> {
        const user = await this.usersService.findOneByEmail(username);

        const comparison = await compare(pass, user.password);

        if (user.password === undefined || comparison === false) {
            throw new UnauthorizedException('User or password are incorrect');
        }

        const payload = { sub: user.id, username: user.email };
        return {
            access_token: await this.jwtService.signAsync(payload, {
                secret: this.configService.get('access_token_key'),
            }),
            refresh_token: await this.jwtService.signAsync(payload, {
                secret: this.configService.get('refresh_token_key'),
            }),
        };
    }
}

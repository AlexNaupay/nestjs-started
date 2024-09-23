import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC_KEY } from './public.decorator';
import { Request as ExpressRequest } from 'express';

@Injectable()
export class AuthJwtCookieGuard implements CanActivate {
    private readonly logger = new Logger(AuthJwtCookieGuard.name);

    constructor(
        private readonly configService: ConfigService,
        private readonly reflector: Reflector,
        private readonly jwtService: JwtService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler()); // Get from @Public decorator
        if (isPublic) {
            return true;
        }

        const request = context.switchToHttp().getRequest(); // HTTP request
        const token = this.extractCookieFromRequest(this.configService.get('cookie_access_key'), request);
        if (!token) {
            throw new UnauthorizedException();
        }

        try {
            // 💡 We're assigning the payload to the request object here
            // so that we can access it in our route handlers
            request['user'] = await this.jwtService.verifyAsync(token, {
                secret: this.configService.get('app_key'),
            });
        } catch (error) {
            this.logger.error(error);
            throw new UnauthorizedException();
        }
        return true;
    }

    private extractCookieFromRequest(cookieKey: string, request: ExpressRequest): string | undefined {
        return request.cookies[cookieKey];
    }
}

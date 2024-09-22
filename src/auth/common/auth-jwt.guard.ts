import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC_KEY } from './public.decorator';

@Injectable()
export class AuthJwtGuard implements CanActivate {
    constructor(
        private readonly configService: ConfigService,
        private readonly reflector: Reflector,
        private readonly jwtService: JwtService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const logger = new Logger(AuthJwtGuard.name);

        const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler()); // Get from @Public decorator
        if (isPublic) {
            return true;
        }

        const request = context.switchToHttp().getRequest(); // HTTP request
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException();
        }

        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: this.configService.get('app_key'),
            });
            // 💡 We're assigning the payload to the request object here
            // so that we can access it in our route handlers
            request['user'] = payload;
        } catch (error) {
            logger.error(error);
            throw new UnauthorizedException();
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const authHeader = request.headers['authorization'] || request.headers['Authorization'];
        const [type, token] = authHeader.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}

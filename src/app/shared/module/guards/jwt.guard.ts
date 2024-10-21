import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthServiceGuard implements CanActivate {
  private readonly logger = new Logger(AuthServiceGuard.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (token) {
      this.logger.log(`Token extracted: ${token}`);
    } else {
      this.logger.warn('No authorization token found');
      throw new UnauthorizedException('Authorization token is missing');
    }

    this.logger.log('Validating token with Auth Service...');

    return this.httpService
      .post('http://localhost:3000/api/v1/auth/validate-token', { token })
      .pipe(
        map((response) => {
          if (response.data.isValid) {
            this.logger.log(
              `Token is valid for user: ${response.data.user.id}`,
            );
            request.user = response.data.user;
            return true;
          }
          this.logger.warn('Invalid token');
          throw new UnauthorizedException('Invalid token');
        }),
        catchError((error) => {
          this.logger.error(
            'Token validation failed with Auth Service',
            error.message,
          );
          throw new UnauthorizedException('Invalid or expired token');
        }),
      );
  }

  private extractTokenFromHeader(request): string | null {
    const authHeader = request.headers['authorization'];
    if (!authHeader) {
      return null;
    }
    const [, token] = authHeader.split(' ');
    this.logger.log(`Extracted token from header: ${token}`);
    return token;
  }
}

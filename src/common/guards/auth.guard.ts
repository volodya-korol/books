import { applyDecorators, Injectable, UseGuards } from '@nestjs/common';
import { AuthGuard as authGuard } from '@nestjs/passport';
import { ApiCookieAuth, ApiResponse } from '@nestjs/swagger';

@Injectable()
export class JwtAuthGuard extends authGuard('jwt') {}

export function AuthGuard() {
  return applyDecorators(
    ApiCookieAuth(),
    ApiResponse({
      status: 401,
      description: 'Unauthorized',
    }),
    UseGuards(JwtAuthGuard),
  );
}

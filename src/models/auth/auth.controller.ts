import { Body, Controller, Get, HttpCode, Post, Req } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthGuard } from '../../common/guards/auth.guard';
import { RequestWithAuthor } from '../../common/types/requestWithAuthor';
import { Author } from '../authors/entities/author.entity';
import { AuthService } from './auth.service';
import { ConfirmCodeDto } from './dto/confirm-code.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { SendConfirmCodeDto } from './dto/send-confirm-code.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @AuthGuard()
  @ApiOperation({ summary: 'Check author auth' })
  @ApiOkResponse({ type: Author })
  checkAuth(@Req() request: RequestWithAuthor) {
    const cookie = this.authService.getCookieWithJwt(request.user.id);
    request.res.setHeader('Set-Cookie', cookie);
    return request.user;
  }

  @Post('register')
  @ApiOperation({ summary: 'Registraton' })
  @ApiCreatedResponse()
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('confirmRegistration')
  @ApiOperation({ summary: 'Confirm registration' })
  @ApiOkResponse({ type: Author })
  async confirm(@Body() { email, code }: ConfirmCodeDto, @Req() request: Request) {
    const newAuthor = await this.authService.confirmAuthor(email, code);
    const cookie = this.authService.getCookieWithJwt(newAuthor.id);
    request.res.setHeader('Set-Cookie', cookie);
    return newAuthor;
  }

  @Post('login')
  @HttpCode(200)
  @ApiOperation({ summary: 'Login' })
  @ApiOkResponse({ type: Author })
  async login(@Body() loginDto: LoginDto, @Req() request: Request) {
    const author = await this.authService.login(loginDto);
    const cookie = this.authService.getCookieWithJwt(author.id);
    request.res.setHeader('Set-Cookie', [cookie]);
    return author;
  }

  @Post('logout')
  @HttpCode(200)
  @AuthGuard()
  @ApiOperation({ summary: 'Logout' })
  logout(@Req() request: RequestWithAuthor) {
    const emptyCookie = this.authService.removeCookieWithJwt();
    request.res.setHeader('Set-Cookie', emptyCookie);
  }

  @Post('sendConfirmationEmailCode')
  @HttpCode(200)
  @ApiOperation({ summary: 'Send email to confirm author registration' })
  sendConfirmCode(@Body() { email }: SendConfirmCodeDto) {
    return this.authService.sendConfirmAuthorCode(email);
  }

  @Post('forgotPassword')
  @HttpCode(200)
  @ApiOperation({ summary: 'Changes the author password' })
  @ApiResponse({ status: 200, type: Author })
  forgotPassword(@Body() { email, code, newPassword }: ForgotPasswordDto) {
    return this.authService.forgotPassword(email, newPassword, code);
  }

  @Post('sendForgotPasswordCode')
  @HttpCode(200)
  @ApiOperation({ summary: 'Send email to change author password' })
  sendForgotPasswordCode(@Body() { email }: SendConfirmCodeDto) {
    return this.authService.sendForgotPasswordCode(email);
  }
}

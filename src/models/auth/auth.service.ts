import { CACHE_MANAGER, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Cache } from 'cache-manager';
import { generateConfirmationCode } from 'src/common/lib/generateСonfirmationСode';
import { AuthorsService } from 'src/models/authors/authors.service';
import { MailService } from '../../providers/mail/mail.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private authorService: AuthorsService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private mailService: MailService,
  ) {}

  //* auth
  async register(registerDto: RegisterDto) {
    const { password, email } = registerDto;
    const isExistEmail = await this.authorService.isExist({ email });
    if (!isExistEmail) throw new HttpException('Author with that email already exists', HttpStatus.BAD_REQUEST);
    try {
      const code = generateConfirmationCode();
      const hashedPassword = await bcrypt.hash(password, 10);
      const author = { ...registerDto, password: hashedPassword };
      this.cacheManager.set(`${email}-confirmation`, { author, code }, { ttl: 15000 });
      this.mailService.sendConfirmationCode(email, code);
    } catch (error) {
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    try {
      const author = await this.authorService.getByEmail(email);
      await this.verifyPassword(password, author.password);
      return author;
    } catch (error) {
      throw new HttpException('Wrong credential provided', HttpStatus.UNAUTHORIZED);
    }
  }

  async confirmAuthor(email: string, code: string) {
    const cachedAuthor = await this.cacheManager.get<{ code: number; author: RegisterDto }>(`${email}-confirmation`);
    if (!cachedAuthor) throw new HttpException('code expired please register account again', HttpStatus.BAD_REQUEST);
    const { author, code: confirmationCode } = cachedAuthor;
    if (confirmationCode !== +code) throw new HttpException('Code is wrong', HttpStatus.BAD_REQUEST);
    await this.cacheManager.del(`${email}-confirmation`);
    return this.authorService.create(author);
  }

  async sendConfirmAuthorCode(email: string) {
    const code = generateConfirmationCode();
    try {
      this.mailService.sendConfirmationCode(email, code);
    } catch (error) {
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  //* password
  async forgotPassword(email: string, newPassword: string, code: string) {
    const confirmCode = await this.cacheManager.get<number>(`${email}-password`);
    if (!confirmCode) throw new HttpException('code expired send email again', HttpStatus.BAD_REQUEST);
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    if (confirmCode !== +code) throw new HttpException('code is wrong', HttpStatus.BAD_REQUEST);
    return this.authorService.changePassword(email, hashedPassword);
  }

  async sendForgotPasswordCode(email: string) {
    const code = generateConfirmationCode();
    this.cacheManager.set(`${email}-password`, code, { ttl: 15000 });
    this.mailService.sendForgotPasswordCode(email, code);
  }

  private async verifyPassword(authorPassword: string, HashedPassword: string) {
    const result = await bcrypt.compare(authorPassword, HashedPassword);
    if (!result) throw new HttpException('Wrong password provided', HttpStatus.BAD_REQUEST);
  }

  //* jwt
  getCookieWithJwt(authorId: number) {
    const payload = { authorId };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET_KEY'),
      expiresIn: `${this.configService.get('JWT_TOKEN_EXPIRATION_TIME')}s`,
    });
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
    )}`;
  }

  removeCookieWithJwt() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=;`;
  }
}

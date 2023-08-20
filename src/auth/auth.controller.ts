import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  signIn(@Body() SignInDto: Record<string, any>) {
    return this.authService.validateUser(SignInDto.email, SignInDto.password);
  }
}


import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}
    @Post('login')
    async login(@Body() body) {
      const user = await this.authService.validateUser(body.email, body.pass);
      const roles = await this.authService.getRoles(user.id)
      return this.authService.login(user,roles);
    }
}

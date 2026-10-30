import { Body, Controller, Get, Param, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor( private readonly authService: AuthService) {}
    @Get('/login')
    login(@Body(ValidationPipe) loginDto: LoginDto) {
        return this.authService.login( loginDto);
    }

}

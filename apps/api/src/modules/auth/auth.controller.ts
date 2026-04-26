import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../user/dto/login-user.dto'
import { Public } from '../../common/decorators/public.decorator'
import { AppLogger } from '../../core/logger/logger.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly logger: AppLogger,
    ) { }

    @Public()
    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() loginUserDto: LoginUserDto) {
        this.logger.log('POST /auth/login - Login request', 'AuthController');
        return this.authService.login(loginUserDto);
    }
}
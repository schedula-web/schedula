import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { LoginUserDto } from '../user/dto/login-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) { }

    async validateUser(email: string, password: string): Promise<any> {
        // Get user with password field
        const userWithPassword = await this.userService.findByEmailWithPassword(email);

        if (!userWithPassword) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, userWithPassword.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // Return user without password
        const userObject = userWithPassword.toObject();
        const { password: _, ...result } = userObject;
        return result;
    }

    async login(loginUserDto: LoginUserDto) {
        const user = await this.validateUser(loginUserDto.email, loginUserDto.password);

        const payload = {
            email: user.email,
            sub: user._id,
            schoolCode: user.schoolCode,
            schedulaId: user.schedulaId  // Use schedulaId instead of scheduleId
        };

        return {
            success: true,
            message: 'Login successful',
            access_token: this.jwtService.sign(payload),
            user: {
                id: user._id,
                email: user.email,
                schoolName: user.schoolName,
                schoolCode: user.schoolCode,
                schedulaId: user.schedulaId,  // Use schedulaId
                principalName: user.principalName,
                boardType: user.boardType,
                phoneNumber: user.phoneNumber,
            },
        };
    }
}
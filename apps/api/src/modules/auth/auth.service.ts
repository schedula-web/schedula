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

    async validateUser(identifier: string, password: string): Promise<any> {
        let userWithPassword = null;

        // Check if identifier is email (contains @) or schedulaId
        if (identifier.includes('@')) {
            // It's an email
            userWithPassword = await this.userService.findByEmailWithPassword(identifier);
        } else {
            // It's a schedulaId
            userWithPassword = await this.userService.findBySchedulaIdWithPassword(identifier);
        }

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
        // Get the identifier (either email or schedulaId)
        const identifier = loginUserDto.email || loginUserDto.schedulaId;

        if (!identifier) {
            throw new UnauthorizedException('Please provide either email or schedulaId');
        }

        const user = await this.validateUser(identifier, loginUserDto.password);

        const payload = {
            email: user.email,
            sub: user._id,
            schoolCode: user.schoolCode,
            schedulaId: user.schedulaId
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
                schedulaId: user.schedulaId,
                principalName: user.principalName,
                boardType: user.boardType,
                phoneNumber: user.phoneNumber,
            },
        };
    }
}
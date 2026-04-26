import { Injectable, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { UserRole } from '../../core/constants/enums';
import * as bcrypt from 'bcrypt';
import { AppLogger } from '../../core/logger/logger.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly logger: AppLogger,
    ) { }

    async validateUser(identifier: string, password: string, role: UserRole): Promise<any> {
        let userWithPassword = null;

        // Check if identifier is email (contains @) or schedulaId
        if (identifier.includes('@')) {
            userWithPassword = await this.userService.findByEmailWithPassword(identifier);
        } else {
            userWithPassword = await this.userService.findBySchedulaIdWithPassword(identifier);
        }

        if (!userWithPassword) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // Validate role
        if (userWithPassword.role !== role) {
            throw new ForbiddenException(`Invalid role. Expected ${role}, but user has ${userWithPassword.role}`);
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
        const identifier = loginUserDto.email || loginUserDto.schedulaId;
        this.logger.log(`Login attempt for identifier: ${identifier}`, 'AuthService');

        if (!identifier) {
            throw new UnauthorizedException('Please provide either email or schedulaId');
        }

        // Pass the role to validateUser
        const user = await this.validateUser(identifier, loginUserDto.password, loginUserDto.role);

        const payload = {
            email: user.email,
            sub: user._id,
            schoolCode: user.schoolCode,
            schedulaId: user.schedulaId,
            role: user.role
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
                role: user.role
            },
        };
    }
}
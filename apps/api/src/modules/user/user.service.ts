import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRole } from '../../core/constants/enums';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    // ✅ Normalize email
    const email = createUserDto.email.toLowerCase();

    // ✅ Check duplicate email
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // ✅ Check duplicate school code
    const existingSchoolCode = await this.userRepository.findBySchoolCode(
      createUserDto.schoolCode,
    );
    if (existingSchoolCode) {
      throw new ConflictException('School with this code already exists');
    }

    // ✅ NEVER trust client role → force ADMIN
    return this.userRepository.create({
      ...createUserDto,
      email,
      role: UserRole.ADMIN,
    });
  }

  // 🔐 Should be protected by controller (SUPER_ADMIN)
  async findAll() {
    return this.userRepository.findAll();
  }

  // 🔐 Should be protected
  async findOne(id: string) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  // Used internally (auth)
  async findByEmail(email: string) {
    return this.userRepository.findByEmail(email.toLowerCase());
  }

  async findByEmailWithPassword(email: string) {
    return this.userRepository.findByEmailWithPassword(
      email.toLowerCase(),
    );
  }

  async findBySchedulaId(schedulaId: string) {
    return this.userRepository.findBySchedulaId(schedulaId);
  }

  async findBySchedulaIdWithPassword(schedulaId: string) {
    return this.userRepository.findBySchedulaIdWithPassword(schedulaId);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    // ❌ Prevent role override from client
    const { role, ...safeData } = updateUserDto as any;

    const user = await this.userRepository.update(id, safeData);

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async remove(id: string) {
    const user = await this.userRepository.delete(id);

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return {
      success: true,
      message: `User with ID ${id} deleted`,
    };
  }
}
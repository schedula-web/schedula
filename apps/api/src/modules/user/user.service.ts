import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) { }

  async create(createUserDto: CreateUserDto) {
    // Check if user already exists
    const existingUser = await this.userRepository.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const existingSchoolCode = await this.userRepository.findBySchoolCode(createUserDto.schoolCode);
    if (existingSchoolCode) {
      throw new ConflictException('School with this code already exists');
    }

    return this.userRepository.create(createUserDto);
  }

  async findAll() {
    return this.userRepository.findAll();
  }

  async findOne(id: string) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findByEmail(email: string) {
    return this.userRepository.findByEmail(email);
  }

  async findByEmailWithPassword(email: string) {
    return this.userRepository.findByEmailWithPassword(email);
  }

  async findBySchedulaId(schedulaId: string) {
    return this.userRepository.findBySchedulaId(schedulaId);
  }

  async findBySchedulaIdWithPassword(schedulaId: string) {
    return this.userRepository.findBySchedulaIdWithPassword(schedulaId);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.update(id, updateUserDto);
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
    return { success: true, message: `User with ID ${id} deleted` };
  }
}
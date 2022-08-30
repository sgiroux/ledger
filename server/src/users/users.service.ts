import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async selectAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return await this.usersRepository.findOne({
      where: {
        email: email,
      },
    });
  }

  async getUserById(userId: number): Promise<User> {
    return await this.usersRepository.findOneOrFail({
      where: {
        id: userId,
      },
    });
  }

  async getDefaultUser(): Promise<User | null> {
    return await this.usersRepository.findOne({
      where: {
        id: 1,
      },
    });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const defaultUser = await this.getDefaultUser();

    if (defaultUser) {
      throw new BadRequestException(
        'You cannot have more than one default user',
      );
    }

    // We need to hash the password accordingly prior to saving
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    createUserDto.password = hashedPassword;
    const user = this.usersRepository.create(createUserDto);
    const savedUser = await this.usersRepository.save(user);

    return savedUser;
  }
}

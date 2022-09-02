import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { CreateUserDTO } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { SystemStatusDTO } from './dto/system-status.dto';

@Injectable()
export class SystemService {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  async getStatus() {
    const users = await this.usersService.selectAll();

    const systemStatus = new SystemStatusDTO();

    // If we have at least one user, consider the system initialized
    systemStatus.isInitialized = users.length > 0;

    return systemStatus;
  }

  async initialize(createUserDTO: CreateUserDTO) {
    const systemStatus = await this.getStatus();
    if (systemStatus.isInitialized) {
      throw new BadRequestException('System Already Initialized');
    }

    const user = await this.usersService.create(createUserDTO);
    const accessDTO = await this.authService.login(user);
    return accessDTO;
  }
}

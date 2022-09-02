import { DataSource } from 'typeorm';
import { CreateUserDTO } from '../../users/dto/create-user.dto';
import { User } from '../../users/entities/user.entity';

export const createTestDataset = async (dataSource: DataSource) => {
  await dataSource.transaction(async (manager) => {
    const createUserDto = new CreateUserDTO();
    createUserDto.email = 'allen.grant@gmail.com';
    createUserDto.password = 'plain-text-password';

    const user: User = manager.create<User>(User, createUserDto);

    await manager.insert(User, user);
  });
};

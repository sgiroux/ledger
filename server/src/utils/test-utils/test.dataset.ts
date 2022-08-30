import { DataSource } from 'typeorm';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import { User } from '../../users/entities/user.entity';

export const createTestDataset = async (dataSource: DataSource) => {
  await dataSource.transaction(async (manager) => {
    const createUserDto = new CreateUserDto();
    createUserDto.email = 'allen.grant@gmail.com';
    createUserDto.firstName = 'Allen';
    createUserDto.lastName = 'Grant';
    createUserDto.password = 'plain-test-password';

    const user: User = manager.create<User>(User, createUserDto);

    await manager.insert(User, user);
  });
};

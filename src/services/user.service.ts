import { UserRepository } from '../repositories/interfaces/UserRepository.ts';
import { UserNotFoundException } from '../exceptions/users/index.ts';
import { MongoUserRepository } from '../repositories/mongo/MongoUserRepository.ts';

export class UserService {
  private readonly userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async me(userId: string) {
    const user = await this.userRepository.getOne(userId);

    if (!user) throw new UserNotFoundException();

    return {
      uuid: user.uuid,
      name: user.name,
      rol: user.role,
    };
  }
}

const userRepository = new MongoUserRepository();
export const userService = new UserService(userRepository);

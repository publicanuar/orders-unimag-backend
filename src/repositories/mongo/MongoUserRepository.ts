import { UserRepository } from '../interfaces/UserRepository.ts';
import { MongoBaseRepository } from './MongoBaseRepository.ts';
import { UserEntity } from '../../entities/User.ts';
import { users } from './models/User.ts';

export class MongoUserRepository extends MongoBaseRepository<
  UserEntity
> implements UserRepository {
  constructor() {
    super(users);
  }

  async getByPhone(phone: string): Promise<UserEntity | null> {
    const data = await this.getCollection().findOne({ phone });
    if (!data) return null;

    return data;
  }
}

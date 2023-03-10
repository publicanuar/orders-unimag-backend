import { UserEntity } from '../../entities/User.ts';
import { GeneralRepository } from './GeneralRepository.ts';

export interface UserRepository extends GeneralRepository<UserEntity> {
  getByPhone: (phone: string) => Promise<UserEntity | null>;
}

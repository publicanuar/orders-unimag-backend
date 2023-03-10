import { MongoEntity } from '../types/types.d.ts';
import { db } from '../db/index.ts';
import { UserEntity } from '../../../entities/User.ts';

export const users = db.collection<MongoEntity<UserEntity>>('users');

import { ObjectId, UUID } from '../../../deps.ts';

export type MongoEntity<T> = T & {
  _id?: ObjectId | undefined;
  uuid: UUID | undefined;
};

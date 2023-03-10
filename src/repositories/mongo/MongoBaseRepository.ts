import { GeneralRepository } from '../interfaces/GeneralRepository.ts';
import { Collection, ObjectId } from '../../deps.ts';
import { MongoEntity } from './types/types.d.ts';

export class MongoBaseRepository<
  T,
> implements GeneralRepository<T> {
  constructor(private collection: Collection<MongoEntity<T>>) {}

  protected getCollection(): Collection<MongoEntity<T>> {
    return this.collection;
  }

  async getOne(uuid: string): Promise<T | null> {
    const data = await this.collection.findOne({ uuid });
    if (!data) return null;

    return data;
  }

  async getAll(resultsPerPage: number, currentPage: number): Promise<{
    documents: T[];
    totalPages: number;
    totalResults: number;
    currentPage: number;
  }> {
    const totalResults = await this.collection.count({});
    const totalPages = Math.ceil(totalResults / resultsPerPage);

    const skip = (currentPage - 1) * resultsPerPage;

    const documents = await this.collection.find({}).skip(skip).limit(
      resultsPerPage,
    ).toArray();

    return {
      documents,
      currentPage,
      totalPages,
      totalResults,
    };
  }

  async upsert(uuid: string | undefined, item: T): Promise<string | null> {
    let id: ObjectId | undefined;

    if (uuid) {
      const itemUpdate = await this.collection.updateOne({
        uuid,
      }, { ...item });

      id = itemUpdate.upsertedId;
    } else {
      const itemCreated = await this.collection.insertOne(item);
      id = itemCreated;
    }
    if (!id) return null;
    const data = await this.collection.findOne({ _id: id });

    return data!.uuid!.toString();
  }
}

export interface GeneralRepository<T> {
  getAll: (resultsPerPage: number, currentPage: number) => Promise<{
    documents: T[];
    totalPages: number;
    totalResults: number;
    currentPage: number;
  }>;
  getOne: (id: string) => Promise<T | null>;
  upsert: (uuid: string | undefined, item: T) => Promise<string | null>;
  delete?: (id: string) => Promise<boolean>;
}

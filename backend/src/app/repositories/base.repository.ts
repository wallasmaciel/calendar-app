export abstract class BaseRepository<T> {
  abstract findAll(): Promise<T[] | null>;
  abstract findById(id: string): Promise<T>;
  abstract create(object: T): Promise<T>;
  abstract update(object: T): Promise<T>;
  abstract delete(id: string): Promise<void>;
}

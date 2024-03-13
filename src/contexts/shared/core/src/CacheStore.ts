import { Nullable } from './Types/Nullable';

export interface CacheStore {
  set(key: string, payload: any, time: number): Promise<boolean>;
  get(key: string): Promise<Nullable<any>>;
  delete(key: string): Promise<boolean>;
  getOrSet<T>(key: string, transaction: Promise<any>, expireIn?: number): Promise<Nullable<T>>;
}

import { Flag } from './Flag';

export interface FlagRepository {
  list(): Promise<Flag[]>;
  create(flag: Flag): Promise<void>;
  getFlag(name: string): Promise<Flag>;
}

export interface FlagClientRepository {
  getFlags(): Promise<any[]>;
  createFlag(flag: Flag): Promise<void>;
  updateFlag(flag: Flag): Promise<void>;
  deleteFlag(flag: Flag): Promise<void>;
}

import { Aggregate } from '../Aggregate';

export type EntityConstructor<T extends Aggregate> = new (...args: any[]) => T;

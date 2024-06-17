import { DataSource } from 'typeorm';

export class TypeORMConnection {
  private connection: DataSource;
  constructor(source: DataSource) {
    this.connection = source;
  }
  getConnection(): DataSource {
    return this.connection;
  }
  getRepository(entity: any) {
    return this.getConnection().getRepository(entity);
  }

  async transaction(fn: () => Promise<void>) {
    const queryRunner = this.getConnection().createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await fn();
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}

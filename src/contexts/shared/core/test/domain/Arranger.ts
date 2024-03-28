export abstract class Arranger {
  public abstract arrange(): Promise<void>;

  public abstract close(): Promise<void>;
}

export abstract class BaseObject {
  public abstract toPrimitives(): any;
  public static fromPrimitives: (params: any) => BaseObject;
  public withOutNulls() {
    return Object.fromEntries(Object.entries(this.toPrimitives()).filter(([_, v]) => v != null));
  }
  public static toArray(entities: any[]): Array<any> {
    return entities.map((e) => e.toPrimitives());
  }
}

abstract class Storage<T> {
  protected readonly STORGE_KEY: string;
  protected constructor(storageKey: string) {
    this.STORGE_KEY = storageKey;
    this.init();
  }

  public abstract getItems(): T[];

  public abstract  saveItems(items: T[]): void;

  public abstract clearItems(): void;

  protected abstract  init(): void;
}

export default Storage;

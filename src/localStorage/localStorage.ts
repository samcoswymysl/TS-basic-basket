import Storage from '../Storage/storage';

class LocalStorage<T> extends Storage<T> {

  public constructor(storageKey: string) {
    super(storageKey);
  }

  public getItems(): T[] {
    const jsonItems = localStorage.getItem(this.STORGE_KEY) as string;
    return JSON.parse(jsonItems) as T[];
  }
  public saveItems(items: T[]): void {
    localStorage.setItem(this.STORGE_KEY, JSON.stringify(items));
  }
  public clearItems(): void {
    localStorage.setItem(this.STORGE_KEY, JSON.stringify([]));
  }
  protected init(): void {
    if(!localStorage.getItem(this.STORGE_KEY)) {
      this.clearItems();
    }
  }

}

export default LocalStorage;

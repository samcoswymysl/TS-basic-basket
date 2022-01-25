import LocalStorage from '../localStorage/localStorage';
// import BasketProduct from '../ProductTypes/BasketProduct';

class BasketStorage extends LocalStorage<any> {
  private static readonly BASKET_KEY = 'BasketStorage';
  public constructor() {
    super(BasketStorage.BASKET_KEY);
  }
}

export default  BasketStorage;

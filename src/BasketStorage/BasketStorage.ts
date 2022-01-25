import LocalStorage from '../localStorage/localStorage';
import BasketProduct from '../ProductTypes/BasketProduct';

class BasketStorage extends LocalStorage<BasketProduct> {
  private static readonly BASKET_KEY = 'BasketStorage';
  constructor() {
    super(BasketStorage.BASKET_KEY);
  }
}

export default  BasketStorage;

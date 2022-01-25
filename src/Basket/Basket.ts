import './Basket.module.scss';
import Storage from '../Storage/storage';
import BasketProduct from '../ProductTypes/BasketProduct';

class Basket {
  private static readonly BASKET_CLAS = 'basket';
  private static readonly OPEN_POPUP_CLASS = 'basket--is-popup-active';
  private static readonly BASKET_POPUP_CLASS = 'basket__popup';
  private static readonly PRODUCTS_LIST_CLASS = 'basket__products-list';
  private static readonly PRODUCTS_LIST_ITEM_CLASS = 'basket__list-item';

  private readonly rootElement: HTMLDivElement;
  private readonly storage: Storage<BasketProduct>;
  private readonly products: BasketProduct[] = [];
  private basketProductsList!: HTMLUListElement;

  public constructor(containerId: string, storage: Storage<BasketProduct>) {
    const basketElement = document.getElementById(containerId);
    if (basketElement) {
      this.rootElement = basketElement as HTMLDivElement;
      this.attachBasketElement();
      this.storage = storage;
      this.products = storage.getItems();
      return;
    }

    throw new Error('Nie odnaleziono elementu koszyka');
  }

  public addToBasket(product: BasketProduct): void {

    if(this.isProductAlreadyInBasket(product.id)) {
      this.changeProductQuantity(product.id, product.quantity);
    } else {
      this.products.push(product);
      this.refreshBasketData();
    }
    this.storage.saveItems(this.products);
  }

  public increaseQuantity(id: string): void {
    this.changeProductQuantity(id, 1);
    this.storage.saveItems(this.products);
  }
  public decreaseQuantity(id: string): void {
    this.changeProductQuantity(id, -1);
    this.storage.saveItems(this.products);
  }

  private isProductAlreadyInBasket(id: string): boolean {
    return this.products.some(product => product.id === id);
  }

  private changeProductQuantity(id: string, newQuantity: number): void {
    let indexProductToRemove: number | null = null;
    this.products.forEach((product, index) => {
      if(product.id !== id ) {
        return;
      }
      product.quantity += newQuantity;
      if(product.quantity <= 0) {
        indexProductToRemove = index;
      }
    });

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if(indexProductToRemove !== null) {
      this.products.splice(indexProductToRemove, 1);
    }
    this.refreshBasketData();
  }

  private attachBasketElement(): void {
    this.rootElement.classList.add(Basket.BASKET_CLAS);
    this.appendBasketButton();
    this.appendBasketPopup();
  }

  private  appendBasketButton(): void {
    const basketButton = document.createElement('button');
    const basketIcon = document.createElement('span');

    basketIcon.textContent = '\u232C';
    basketButton.addEventListener('click', () => {
      if(this.rootElement.classList.contains(Basket.OPEN_POPUP_CLASS)) {
        this.refreshBasketData();
      }
      this.rootElement.classList.toggle(Basket.OPEN_POPUP_CLASS);
    });
    basketButton.appendChild(basketIcon);
    this.rootElement.appendChild(basketButton);
  }

  private refreshBasketData(): void {
    while(this.basketProductsList.firstChild) {
      this.basketProductsList.firstChild.remove();
    }
    this.products.forEach(product => {
      this.createListElement(product);
    });

  }

  private readonly  createListElement = (product: BasketProduct): void => {
    const listElement = document.createElement('li');
    const productInfoElement = document.createElement('p');
    const incBtn = document.createElement('button');
    const decBtn = document.createElement('button');

    productInfoElement.textContent = `${product.name}, ilość ${product.quantity}`;
    incBtn.textContent = '+';
    decBtn.textContent = '-';

    listElement.classList.add(Basket.PRODUCTS_LIST_ITEM_CLASS);

    incBtn.addEventListener('click', () => this.increaseQuantity(product.id));
    decBtn.addEventListener('click', () => this.decreaseQuantity(product.id));

    listElement.append(productInfoElement, incBtn, decBtn);
    this.basketProductsList.appendChild(listElement);

  };

  private appendBasketPopup(): void {
    const popupContainer =document.createElement('div');
    const productsList = document.createElement('ul');

    popupContainer.classList.add(Basket.BASKET_POPUP_CLASS);
    productsList.classList.add(Basket.PRODUCTS_LIST_CLASS);

    this.basketProductsList = productsList;
    popupContainer.appendChild(productsList);
    this.rootElement.appendChild(popupContainer);
  }
}
export default Basket;

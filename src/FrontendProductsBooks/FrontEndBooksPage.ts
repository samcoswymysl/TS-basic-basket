import FrontendBook from '../ProductTypes/FrontendBook';
import ProductPage from '../ProductPage/ProductPage';
import Router from '../Router/Router';
import Basket from '../Basket/Basket';

class FrontendBooksPage extends ProductPage<FrontendBook> {
  protected readonly palcesAfterComa = 2;
  protected readonly products: FrontendBook[] = [
    { id: 'fe-001', name: 'Super Frontend', price: 5 },
    { id: 'fe-002', name: 'Czarny Frontend', price: 15 },
    { id: 'fe-003', name: 'Niebieski Frontend', price: 35 },
    { id: 'fe-004', name: 'Czerwony Frontend', price: 55 },
    { id: 'fe-005', name: 'Zielony Frontend', price: 75 },
    { id: 'fe-006', name: 'Inny Frontend', price: 85 },
  ];

  public constructor(containerId: string, listingName: string, router: Router, basket: Basket) {
    super(containerId, listingName, router, basket);
  }
  protected readonly productTemplate= ({ id, name, price }: FrontendBook): HTMLElement => {
    const element = document.createElement('article');
    const titleElement = document.createElement('p');
    const priceElement = document.createElement('p');
    const formElement = document.createElement('form');
    formElement.innerHTML = `
    <label>
      Ilość
      <input id="product-${id}" type="number" required, value="0">
    </label>
    <button type="submit">Dodaj Do Koszyka</button>
    `.trim();

    titleElement.textContent = name;
    priceElement.textContent =price.toFixed(this.palcesAfterComa);

    formElement.addEventListener('submit', ()=> {
      const input = formElement.querySelector(`#product-${id}`) as HTMLInputElement;
      const quantity = Number(input.value);
      this.basket.addToBasket({ id, name, price, quantity });
      input.value = '0';
    });
    element.append(titleElement, priceElement, formElement);
    return element;

  };
}

export default FrontendBooksPage;

import BackendBook from '../ProductTypes/BackendBook';
import Basket from '../Basket/Basket';
import ProductPage from '../ProductPage/ProductPage';
import Router from '../Router/Router';

class BackendBooksPage extends ProductPage<BackendBook> {
  protected readonly palcesAfterComa = 2;
  protected readonly products: BackendBook[] = [
    { id: 'fe-007', name: 'Super Backend', price: 5, backendLang: 'JavaScript' },
    { id: 'fe-008', name: 'Czarny Backend', price: 15, backendLang: 'JavaScript'  },
    { id: 'fe-009', name: 'Niebieski Backend', price: 35, backendLang: 'JavaScript'  },
    { id: 'fe-010', name: 'Czerwony Backend', price: 55, backendLang: 'JavaScript'  },
    { id: 'fe-011', name: 'Zielony Backend', price: 75, backendLang: 'C#' },
    { id: 'fe-012', name: 'Inny Backend', price: 85, backendLang: 'Java'  },
  ];

  public constructor(containerId: string, listingName: string, router: Router, basket: Basket) {
    super(containerId, listingName, router, basket);
  }
  protected readonly productTemplate= ({ id, name, price, backendLang }: BackendBook): HTMLElement => {
    const element = document.createElement('article');
    const titleElement = document.createElement('p');
    const priceElement = document.createElement('p');
    const lang = document.createElement('p');
    const formElement = document.createElement('form');
    formElement.innerHTML = `
    <label>
      Ilość
      <input id="product-${id}" type="number" required, value="0">
    </label>
    <button type="submit">Dodaj Do Koszyka</button>
    `.trim();

    titleElement.textContent = name;
    priceElement.textContent =price.toFixed(this.palcesAfterComa).toString();
    lang.innerText = backendLang;

    formElement.addEventListener('submit', ()=> {
      const input = formElement.querySelector(`#product-${id}`) as HTMLInputElement;
      const quantity = Number(input.value);
      this.basket.addToBasket({ id, name, price, quantity });
      input.value = '0';
    });
    element.append(lang, titleElement, priceElement, formElement);
    return element;

  };
}

export default BackendBooksPage;

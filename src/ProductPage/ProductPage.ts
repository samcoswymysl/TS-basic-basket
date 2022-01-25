import Product from '../ProductTypes/Product';
import Router from '../Router/Router';
import Basket from '../Basket/Basket';

abstract class ProductPage<T extends Product> {
  protected readonly  abstract  productTemplate: (product: T ) => HTMLElement;
  protected abstract readonly products: T[] = [];

  private readonly rootElement!: HTMLDivElement;
  protected constructor(
    containerId: string,
    listingName: string,
    private readonly router: Router,
    protected readonly  basket: Basket
  ) {
    const containerElement = document.getElementById(containerId);
    if(!containerElement) {
      return;
    }
    this.router.addRoute({ name: listingName, renderFunction: this.render });
    this.rootElement = containerElement as HTMLDivElement;

  }

  public render = (): void => {
    while(this.rootElement.firstChild) {
      this.rootElement.firstChild.remove();
    }
    const productBoxes = this.products.map(this.productTemplate);
    productBoxes.forEach(product => this.rootElement.appendChild(product));

  };

}

export default ProductPage;

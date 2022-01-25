import Basket from './Basket/Basket';
import BasketStorage from './BasketStorage/BasketStorage';
import './global-styles.scss';
import Router from './Router/Router';
import FrontendBooksPage from './FrontendProductsBooks/FrontEndBooksPage';
import BackendBooksPage from './BackendBooksPage/BackendBooksPage';

const redirectFunction = (location: string): void => {
  window.location.hash = `#/${location}`;
};

const frontendButton = document.getElementById('fe-button');
const backendButton = document.getElementById('be-button');

const storage = new BasketStorage();

const router = new Router();
const basket = new Basket('basket', storage);
new FrontendBooksPage('listing-page', 'frontend', router, basket);

new BackendBooksPage('listing-page', 'backend', router, basket);
if(frontendButton) {
  frontendButton.addEventListener('click', () => redirectFunction('frontend'));
}
if(backendButton) {
  backendButton.addEventListener('click', () => redirectFunction('backend'));
}

export {};

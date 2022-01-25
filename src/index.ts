import Basket from './Basket/Basket';
import BasketStorage from './BasketStorage/BasketStorage';
import './global-styles.scss';
import Router from './Router/Router';

declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Window {
    storage: BasketStorage;
  }
}
let x: Window | null |  0= null;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
x = 0;
const redirectFunction = (location: string): void => {
  window.location.hash = `#/${location}`;
};

const frontendButton = document.getElementById('fe-button');
const backendButton = document.getElementById('be-button');

const storage = new BasketStorage();
const router = new Router();
const basket = new Basket('basket', storage);

// eslint-disable-next-line no-console
console.log(basket);
// eslint-disable-next-line no-console
router.addRoute({ name: 'frontend', renderFunction: () => console.log('frontend') });
// eslint-disable-next-line no-console
router.addRoute({ name: 'backend', renderFunction: () => console.log('backedn') });

window.storage = storage;

if(frontendButton) {
  frontendButton.addEventListener('click', () => redirectFunction('frontend'));
}
if(backendButton) {
  backendButton.addEventListener('click', () => redirectFunction('backend'));
}

export {};

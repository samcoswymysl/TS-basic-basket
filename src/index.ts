import './global-styles.scss';

const redirectFunction = (location: string): void => {
  window.location.hash = `#/${location}`
}

const frontendButton = document.getElementById('fe-button');
const backendButton = document.getElementById('be-button');




if(frontendButton) {
  frontendButton.addEventListener('click', () => redirectFunction('frontend'))
}
if(backendButton) {
  backendButton.addEventListener('click', () => redirectFunction('backend'))
}

export {};

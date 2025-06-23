import { DESKTOP_WIDTH, updateContainerFocus } from './common-constants.js';

const mainFooter = document.querySelector('.main-footer');
const mainFooterElements = mainFooter.querySelectorAll('.main-footer__container > *');
updateContainerFocus(mainFooterElements, DESKTOP_WIDTH);
export {mainFooterElements};

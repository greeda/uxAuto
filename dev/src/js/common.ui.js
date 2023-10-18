
import {
  refreshUI,
  clTabsHandler,
  familySiteSelectHandler,
  UiMap
} from './functions/simple.ui.js';

let frontUI = {
  refreshUI,
};

window.frontUI = frontUI;
window.frontAPI = UiMap;


function init() {
  refreshUI();
  clTabsHandler();
  familySiteSelectHandler();
};


document.addEventListener('DOMContentLoaded', () => {
  init();
});
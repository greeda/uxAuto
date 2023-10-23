import commonUiList from './common.ui.list.js';
import { Popup } from './components/index.js';

import {
  refreshUI,
  clTabsHandler,
  familySiteSelectHandler,
  UiMap
} from './functions/simple.ui.js';

let frontUI = {
  Popup,
  refreshUI,
};

window.frontUI = frontUI;
window.frontAPI = UiMap;


function init() {
  Popup.loadInit();

  refreshUI();

  clTabsHandler();
  familySiteSelectHandler();
};


document.addEventListener('DOMContentLoaded', () => {
  init();
});
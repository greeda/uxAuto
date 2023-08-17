
import {
  refreshUI,
  clTabsHandler,
  familySiteSelectHandler
} from './functions/simple.ui.js';

let frontUI = {

};

window.frontUI = frontUI;


function init() {
  refreshUI();
  clTabsHandler();
  familySiteSelectHandler();
};


document.addEventListener('DOMContentLoaded', () => {
  init();
});
import commonUiList from './common.ui.list.js';
import {
  clTabsHandler,
  familySiteSelectHandler
} from './functions/simple.ui.js';

let frontUI = {

};

window.frontUI = frontUI;


function init() {
  clTabsHandler();
  familySiteSelectHandler();
};


document.addEventListener('DOMContentLoaded', () => {
  init();
});
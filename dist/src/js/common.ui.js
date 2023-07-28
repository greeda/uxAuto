import commonUiList from './common.ui.list.js';
import {
  clTabsHandler
} from './functions/simple.ui.js';

let frontUI = {

};

window.frontUI = frontUI;


function init() {
  clTabsHandler();
};


document.addEventListener('DOMContentLoaded', () => {
  init();
});
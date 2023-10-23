import UI from './UI.js';

export default class Popup extends UI {
  $popup;
  $popupContainer;
  $dimm;

  static loadInit() {
    // console.log(this);
    console.log(this.$container);
    
  }

  /**
   * 
   * @param {HTMLElement} html element
   * @param {object} options 
   */
  popupInit(el ,options) {
    // console.log(el, options);
  }
}
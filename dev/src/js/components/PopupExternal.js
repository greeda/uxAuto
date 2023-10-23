import Popup from './base/Popup.js';

export default class PopupExternal extends Popup {
  constructor(el, options) {
    super('popupExternal', el);

    this.init(el, options);
  }

  init(el, options) {
    this.popupInit(el, options);

    this.render();
  }

  render() {
    if(!this.$popup) {
      this.$popup = this.$el;
      this.$el = undefined;
      console.log(this.$popup);
      console.log(this.$el);
      // this.$popup.setAttribute('data-id', this.uiId);
      console.log(this.$popup);
    }
  }
}
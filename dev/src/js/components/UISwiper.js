import UI from '/src/js/components/base/UI.js';

class UISwiper extends UI {
  defaultOptions = {

  };

  constructor(el, options) {
    super('UISwiper', el);

    this.render();
  }

  render() {
    this.detachEvents();
    this.attachEvents();
  }

  attachEvents() {
    
  }

  detachEvents() {

  }

  destroy() {

  }
}

export default UISwiper;
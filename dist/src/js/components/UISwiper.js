import UI from './base/UI';

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
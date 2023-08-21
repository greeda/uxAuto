import UI from "/src/js/components/base/UI.js";

class UISwiper extends UI {
  defaultOptions = {
    slidesPerView: 'auto'
  };

  constructor(el, options) {
    super("UISwiper", el);

    this.init(el, options);
  }

  init(el, options) {
    this.defaults = { ...this.defaults, ...this.parseOptions(options) };

    this.render();
  }

  render() {
    this.detachEvents();
    this.attachEvents();
  }

  attachEvents() {
    let options = {
      ...this.defaultOptions,
      spaceBetween: 24,
      speed: 600,
      autoplay: {
        delay: 3000,
      },
      loop: true
    };

    this.swiper = new Swiper(this.el, options);
  }

  detachEvents() {}

  destroy() {}
}

export default UISwiper;

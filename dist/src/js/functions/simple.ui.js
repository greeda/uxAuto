import commonUiList from "/src/js/common.ui.list.js";

export const UiMap = new WeakMap();

export function clTabsHandler() {
  const tabList = document.querySelectorAll(".prototype-list li");
  let activeList = document.querySelector(".prototype-list li.active");

  tabList.forEach((list) => {
    list.addEventListener("click", (e) => {
      if (activeList) activeList.classList.remove("active");
      activeList = e.currentTarget;
      activeList.classList.add("active");
    });
  });
}

export function familySiteSelectHandler() {
  const footerEl = document.querySelector("#footer");
  const selectBtn = document.querySelector(".ui-select .btn-select");
  let isActive = false;

  if (footerEl) {
    selectBtn.addEventListener("click", (e) => {
      isActive = !isActive;
      bindEvents(isActive);
    });

    selectBtn.addEventListener("focusout", (e) => {
      isActive = false;
      bindEvents(isActive);
    });

    function bindEvents(isActive) {
      if (isActive) {
        selectBtn.parentNode.classList.add("active");
      } else {
        selectBtn.parentNode.classList.remove("active");
      }
    }
  }
}

export function refreshUI(force = false) {
  commonUiList.forEach((ui) => {
    let elements = document.querySelectorAll(ui.className);

    elements.forEach((el) => {
      if (force || !el.dataset.ui) {
        if (!el.dataset.ui) {
        }
        const Class = ui.classObject;
        const options = {...el.dataset};
        const uiInstance = new Class(el, options);
        UiMap.set(el, uiInstance);
      }
    });
  });
}

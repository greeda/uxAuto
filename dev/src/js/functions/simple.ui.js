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
    const footerEl = document.querySelector('#footer');
    const selectBtn = document.querySelector('.ui-select .btn-select');
    let isActive = false;

    if (footerEl) {
        selectBtn.addEventListener('click', (e) => {
            isActive = !isActive;
            bindEvents(isActive);
        });

        selectBtn.addEventListener('focusout', (e) => {
            isActive = false;
            bindEvents(isActive);
        });

        function bindEvents(isActive) {
            if (isActive) {
                selectBtn.parentNode.classList.add('active');
            } else {
                selectBtn.parentNode.classList.remove('active')
            }
        };
    }
}
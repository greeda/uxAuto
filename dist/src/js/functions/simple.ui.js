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

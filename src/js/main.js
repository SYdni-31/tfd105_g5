console.log('main');
// ------ Hamburger漢堡選單 ------
let ham_icon = document.getElementById("ham-icon");
let ham_menu = document.querySelector("ul.menu");
let ham_mask = document.getElementById("menu-backdrop");
ham_icon.addEventListener("click", function () {
    // 選單收合
    ham_menu.classList.toggle("menu-active");
    // 漢堡按鈕特效
    ham_icon.classList.toggle('open');
    // 遮罩
    ham_mask.classList.toggle('menu-backdrop');
});
    // 點擊遮罩
ham_mask.addEventListener("click", function () {
    // 選單收合
    ham_menu.classList.toggle("menu-active");
    // 漢堡按鈕特效
    ham_icon.classList.toggle('open');
    // 遮罩
    ham_mask.classList.toggle('menu-backdrop');
});
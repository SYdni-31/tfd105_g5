// ------ Hamburger漢堡選單 ------
let ham_icon = document.getElementById("ham-icon");
let ham_menu = document.querySelector("ul.menu");
let ham_mask = document.getElementById("menu-backdrop");
let login_page_icon = document.getElementById("login_page_icon");
let nav = document.getElementById("nav");
let login = document.getElementById("login");
let company_menu = document.getElementById("company_menu");
let companyBack_info = document.getElementById("companyBack_info");
let companyBack_live = document.getElementById("companyBack_live");
let companyBack = document.getElementById("companyBack");
let logo_orange = document.getElementById("logo_orange");
let logo_main = document.getElementById("logo_main");
ham_icon.addEventListener("click", function () {
  // 選單收合
  ham_menu.classList.toggle("menu-active");
  // 漢堡按鈕特效
  ham_icon.classList.toggle("open");
  nav.classList.toggle("bg-null");
  // 遮罩
  ham_mask.classList.toggle("menu-backdrop");
});
// 點擊遮罩
ham_mask.addEventListener("click", function () {
  // 選單收合
  ham_menu.classList.toggle("menu-active");
  // 漢堡按鈕特效
  ham_icon.classList.toggle("open");
  nav.classList.toggle("bg-null");
  // 遮罩
  ham_mask.classList.toggle("menu-backdrop");
});
// 點擊開啟登入註冊
login_page_icon.addEventListener("click", function () {
  // 選單收合
  login.classList.add("-login_page_icon");
});

let now_page = window.location.href;
let nav_login = document.getElementById("nav_login");
// 查網址是不是後台
if(now_page.includes("companyback_info")){
  companyBack_info.classList.add("company-menu-border");
}else if(now_page.includes("companyback_live")){
  companyBack_live.classList.add("company-menu-border");

}else if(now_page.includes("companyback")){
  companyBack.classList.add("company-menu-border");

}
if(now_page.includes("companyback")){
  logo_main.classList.add("logo-icon-hide");
  logo_orange.classList.add("logo-icon-show");
  company_menu.classList.remove("company-menu-hide");
  login_page_icon.classList.add("login-icon-hide");
  login_page_icon.classList.remove("login-icon-show");
  nav_login.classList.remove("login-icon-hide");
}else{
  logo_main.classList.remove("logo-icon-hide");
  logo_orange.classList.remove("logo-icon-show");
  company_menu.classList.add("company-menu-hide");
  login_page_icon.classList.add("login-icon-show");
  login_page_icon.classList.remove("login-icon-hide");
  nav_login.classList.add("login-icon-hide");
}
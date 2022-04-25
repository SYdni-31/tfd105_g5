// // ------ Hamburger漢堡選單 ------
// let ham_icon = document.getElementById("ham-icon");
// let ham_menu = document.querySelector("ul.menu");
// let ham_mask = document.getElementById("menu-backdrop");
// let login_page_icon = document.getElementById("login_page_icon");
// let nav = document.getElementById("nav");
// let login = document.getElementById("login");
// let company_menu = document.getElementById("company_menu");
// let companyBack_info = document.getElementById("companyBack_info");
// let companyBack_tech = document.getElementById("companyBack_tech");
// let companyBack = document.getElementById("companyBack");
// let logo_orange = document.getElementById("logo_orange");
// let logo_main = document.getElementById("logo_main");
// let menu_el = document.getElementsByClassName("menu");
// let now_page_el = document.getElementsByClassName("now_page");
// let href_page = window.location.pathname;
// let nav_login = document.getElementById("nav_login");
// let nav_logout = document.querySelector("#nav_logout");
// // console.log(nav_logout);
                    // ham_icon.addEventListener("click", function () {
                    //   // 選單收合
                    //   ham_menu.classList.toggle("menu-active");
                    //   // 漢堡按鈕特效
                    //   ham_icon.classList.toggle("open");
                    //   nav.classList.toggle("bg-null");
                    //   // 遮罩
                    //   ham_mask.classList.toggle("menu-backdrop");
                    // });
                    // // 點擊遮罩
                    // ham_mask.addEventListener("click", function () {
                    //   // 選單收合
                    //   ham_menu.classList.toggle("menu-active");
                    //   // 漢堡按鈕特效
                    //   ham_icon.classList.toggle("open");
                    //   nav.classList.toggle("bg-null");
                    //   // 遮罩
                    //   ham_mask.classList.toggle("menu-backdrop");
                    // });
                    // // 點擊開啟登入註冊
                    // login_page_icon.addEventListener("click", function () {
                    //   // 選單收合
                    //   login.classList.add("-login_page_icon");
                    // });

// // 查網址是不是後台
// if (href_page.includes("companyback_info")) {
//   this.companyback=true
//   companyBack_info.classList.add("company-menu-border");
// } else if (href_page.includes("companyback_tech")) {
//   companyBack_tech.classList.add("company-menu-border");

// } else if (href_page.includes("companyback_look")) {
//   companyBack_info.classList.add("company-menu-border");

// }else if (href_page.includes("companyback")) {
//   companyBack.classList.add("company-menu-border");

// }
// if (href_page.includes("companyback_look") ) {
//   logo_main.classList.add("logo-icon-hide");
//   logo_orange.classList.add("logo-icon-show");
//   company_menu.classList.add("company-menu-hide");
//   login_page_icon.classList.add("login-icon-hide");
//   login_page_icon.classList.remove("login-icon-show");
//   nav_login.classList.remove("login-icon-hide");
//   $(".menu_img_back").removeClass("-hide");
// } else if(href_page.includes("companyback") ){
//   logo_main.classList.add("logo-icon-hide");
//   logo_orange.classList.add("logo-icon-show");
//   company_menu.classList.remove("company-menu-hide");
//   login_page_icon.classList.add("login-icon-hide");
//   login_page_icon.classList.remove("login-icon-show");
//   nav_login.classList.remove("login-icon-hide");
//   $(".menu_img_back").removeClass("-hide");
// }else {
//   logo_main.classList.remove("logo-icon-hide");
//   logo_orange.classList.remove("logo-icon-show");
//   company_menu.classList.add("company-menu-hide");
//   login_page_icon.classList.add("login-icon-show");
//   login_page_icon.classList.remove("login-icon-hide");
//   nav_login.classList.add("login-icon-hide");
// }
                                  // if(href_page.includes("extend")){
                                  //   $(".menu_img_extend").removeClass("-hide");
                                  // }else if(href_page.includes("live")){
                                  //   $(".menu_img_live").removeClass("-hide");
                                  // }else if(href_page.includes("about")){
                                  //   $(".menu_img_about").removeClass("-hide");
                                  // }else if(href_page.includes("news")){
                                  //   $(".menu_img_news").removeClass("-hide");
                                  // }else if(href_page.includes("contect")){
                                  //   $(".menu_img_contect").removeClass("-hide");
                                  // }

                                  // 點擊登出，清除所有sessionStorage
                                  // nav_logout.addEventListener("click", function(){
                                  //   sessionStorage.clear();
                                  // })


// // 將名稱丟到管理後台頁面右上角並顯示
document.querySelector('#login_name').textContent = sessionStorage.getItem('login_name');
document.querySelector('#login_page_icon2').textContent = sessionStorage.getItem('login_name');


// Vue
new Vue({
  el: '#nav_app',
  data: {
    logo:"",
    burger:false,
    user: false,
    companyBack: false,
    companyBack2: false,
    companyLogIn: false,
    manageBack: false,
    logOut: false,
    burgerItem: true,
    loginPageIcon: true,
    userHead: false,
    loginPageIcon2: true,  
  },
  methods: {
    ham(){
      this.burger= !this.burger
    },
    user1(){
      let loginType2 = sessionStorage.getItem('login_type');  
      // console.log(loginType2);
        if(loginType2 != null){
          this.ham();
        }else{
          this.user = !this.user
        }
      },
      clr_session(){
        sessionStorage.clear();
      },
  },
  mounted(){
    // 判斷是廠商登入或是訪客登入，漢堡選單才出現管理後台鈕及登出鈕，若沒登入則都不顯示
    let loginType = sessionStorage.getItem('login_type');  
    if(loginType == 'COMPANY'){
      this.manageBack = !this.manageBack;
      this.logOut = !this.logOut;
      this.loginPageIcon = !this.loginPageIcon;
      this.userHead = !this.userHead;
    }else if(loginType == 'GUEST'){
      this.loginPageIcon = !this.loginPageIcon;
      this.logOut = !this.logOut;
    }else{

    }
    
    // 判斷為後台頁面時，更改logo顏色為強調色，出現左側側邊欄
    if(window.location.href.includes("companyback")){
      this.logo='orange';
      this.companyBack = !this.companyBack;
      this.companyBack2 = !this.companyBack2;
      this.loginPageIcon2 = !this.loginPageIcon2;
    }else{
      this.logo='blue';
    }

    // 依據網址判斷在頁面時，移除隱藏屬性，顯示小齒輪圖示
    if(window.location.href.includes("extend")){
      $(".menu_img_extend").removeClass("-hide");
    }else if(window.location.href.includes("live")){
      $(".menu_img_live").removeClass("-hide");
    }else if(window.location.href.includes("about")){
      $(".menu_img_about").removeClass("-hide");
    }else if(window.location.href.includes("news")){
      $(".menu_img_news").removeClass("-hide");
    }else if(window.location.href.includes("contect")){
      $(".menu_img_contect").removeClass("-hide");
    }

  },
  
});

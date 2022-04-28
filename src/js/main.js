// Vue
new Vue({
  el: '#nav_app',
  data: {
    logo:"", // 進後台的logo變化
    burger:false, //漢堡選單的toggle
    companyBack: false, // 後台nav顯示與否
    manageBack: false, // 出現管理後台選單
    logOut: false, //出現登出選單
    // burgerItem: true, //要拿來裝選單v-for的變數
    loginPageIcon: false, //現在是否已登入(人頭icon切換)
  },
  methods: {
    ham(){
      this.burger= !this.burger
    },
      clr_session(){
        sessionStorage.clear();
      },
  },
  mounted(){
    // 判斷是廠商登入或是訪客登入，漢堡選單才出現管理後台鈕及登出鈕，若沒登入則都不顯示
    let loginType = sessionStorage.getItem('login_type');  
    if(loginType == 'COMPANY'){
      this.manageBack = true;
      this.logOut = true;
      this.loginPageIcon = true;
    }else if(loginType == 'GUEST'){
      this.loginPageIcon = true;
      this.logOut = true;
    }else{

    }

    // 抓取login_name的值，並顯示在網頁上
    document.querySelector('#login_name').textContent = sessionStorage.getItem('login_name');
    
    // 判斷為後台頁面時，更改logo顏色為強調色，出現左側側邊欄
    if(window.location.href.includes("companyback")){
      this.logo='orange';
      if(window.location.href.includes("companyback_look")){
        this.companyBack = false;
      }else{
        this.companyBack = true;
      }
      if(window.location.href.includes("companyback_info")){
        $("#companyBack_info").addClass("company-menu-border")
      }else if(window.location.href.includes("companyback_tech")){
        $("#companyBack_tech").addClass("company-menu-border")
      }else {
        $("#companyBack").addClass("company-menu-border")
      }
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
    }else if(window.location.href.includes("companyback_info") || window.location.href.includes("companyback_tech") || window.location.href.includes("companyback")){
      $(".menu_img_back").removeClass("-hide");
    }

  },
  
});

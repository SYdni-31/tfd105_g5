document.addEventListener("DOMContentLoaded", function () {
    let login_page_icon = document.getElementById('login_page_icon');
    let login = document.getElementById('login');
    let btn_close = document.getElementById('BtnClose');
    //點擊人頭叫出登入頁燈箱
    login_page_icon.addEventListener('click', function () {
        login.classList.remove('js-none');
        // login.fadeIn(1000);
        login.classList.add('js-block');
        // login.fadeIn(1000);
        document.body.style.overflow = 'hidden';  
    });
    //點擊叉叉可以關閉燈箱
    btn_close.addEventListener('click', function () {
        CloseLightBox();
    });
});

function CloseLightBox() {
    login.classList.remove('-login_page_icon');
    login.classList.remove('js-block');
    document.body.style.overflow = '';  
}

//點擊遮罩處可以關閉燈箱
$(document).on("click", "form.login", function(e) {
    if ($(e.target).is("form.login")) {
        CloseLightBox();
    }
});

//按Esc鍵可以關閉燈箱
$(document).keyup(function(e) {
    if (e.which == '27') {
        CloseLightBox();
    }
});

let login_btn_signup = document.getElementById('login_btn_signup');
let signIn = document.getElementById('signIn');
let companySignInContainer = document.getElementById('company-sign-in-container');
let companySignUpContainer = document.getElementsByClassName('company-sign-up-container')[0];
let guestSignInContainer = document.getElementsByClassName('guest-sign-in-container')[0];

login_btn_signup.addEventListener('click', function(){
    companySignUpContainer.classList.remove('js-none');
    companySignUpContainer.classList.add('js-block');
    // guestSignInContainer.classList.add('js-none')
    companySignInContainer.classList.add('js-slide-left');
});
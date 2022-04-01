document.addEventListener("DOMContentLoaded", function () {
    let login_page_icon = document.getElementById('login_page_icon');
    let login = document.getElementById('login');
    let btn_close = document.getElementById('BtnClose');
    //點擊人頭叫出登入頁燈箱
    login_page_icon.addEventListener('click', function () {
        login.classList.remove('js-none');
        // login.fadeIn(1000);
        login.classList.add('js-block');
        // login.fadeIn(3000);
        document.body.style.overflow = 'hidden';
    });
    //點擊叉叉可以關閉燈箱
    btn_close.addEventListener('click', function () {
        CloseLightBox();
    });

    //關閉燈箱
    function CloseLightBox() {
        login.classList.remove('-login_page_icon');
        login.classList.remove('js-block');
        document.body.style.overflow = '';
    }

    //點擊遮罩處可以關閉燈箱
    $(document).on("click", "form.login", function (e) {
        if ($(e.target).is("form.login")) {
            CloseLightBox();
        }
    });

    //按Esc鍵可以關閉燈箱
    $(document).keyup(function (e) {
        if (e.which == '27') {
            CloseLightBox();
        }
    });

    let login_btn_signup = document.getElementById('login_btn_signup');
    let signIn = document.getElementById('signIn');
    let companySignInContainer = document.getElementById('company-sign-in-container');
    let companySignUpContainer = document.getElementsByClassName('company-sign-up-container')[0];
    let guestSignInContainer = document.getElementsByClassName('guest-sign-in-container')[0];
    let overlayContainer = document.getElementsByClassName('overlay-container')[0];

    login_btn_signup.addEventListener('click', function () {
        // 廠商登入往左滑
        companySignInContainer.classList.add('js-slide-left');
        setTimeout(function () {
            companySignInContainer.classList.add('js-none');
            guestSignInContainer.classList.add('js-none');
            overlayContainer.classList.remove('js-none');
            overlayContainer.classList.add('js-block');

        }, 700);
    });

    // 點擊出現忘記密碼區塊
    let formForgetPassword = document.getElementsByClassName('form-forget-password')[0];
    let forgetA = document.getElementsByClassName('forget-a')[0];
    forgetA.addEventListener('click', function () {
        companySignInContainer.classList.add('js-none');
        companySignUpContainer.classList.add('js-none');
        formForgetPassword.classList.add('js-block');
    });

    //點擊送出資料鈕 顯示已送出
    let receivedForm = document.getElementsByClassName('received-form')[0];
    let loginBtnSubmitinfo = document.getElementsByClassName('login_btn_submitinfo')[0];
    loginBtnSubmitinfo.addEventListener('click', function () {
        companySignUpContainer.classList.add('js-none')
        receivedForm.classList.add('js-block');
    })

    //點擊確認 回到廠商登入頁
    let loginBtnConfirm = document.getElementsByClassName('login_btn_confirm')[0];
    loginBtnConfirm.addEventListener('click', function () {
        receivedForm.classList.remove('js-block');
        receivedForm.classList.add('js-none');
        CloseLightBox();
        setTimeout(function () {
            // companySignInContainer.classList.remove('js-none');
            companySignInContainer.classList.add('js-slide-right');
            companySignInContainer.classList.add('js-block');
        }, 300);
        overlayContainer.classList.remove('js-block');
        overlayContainer.classList.add('js-none');
    })

    //點擊登入會員鈕 返回顯示廠商登入頁面
    signIn.addEventListener('click', function () {

        if ($("#company-sign-in-container").hasClass('js-slide-left')) {
            // 廠商登入往右滑
            companySignInContainer.classList.remove('js-slide-left');
            overlayContainer.classList.remove('js-slide-right');
            overlayContainer.classList.add('js-slide-right2');
            // guestSignInContainer.classList.remov('js-none');
            setTimeout(function () {
                companySignInContainer.classList.remove('js-none');
                guestSignInContainer.classList.remove('js-none');
                overlayContainer.classList.add('js-none');
                overlayContainer.classList.remove('js-block');
            }, 700);
        }


        // overlayContainer.classList.add('js-slide-right');
        // companySignUpContainer.classList.add('js-none');
        // companySignInContainer.classList.add('js-slide-right');
        // // companySignInContainer.classList.add('js-block');
        // // guestSignInContainer.classList.add('js-block2');
        // companySignInContainer.classList.remove('js-none');
        // companySignInContainer.classList.add('js-block3');
        // setTimeout(function () {
        //     guestSignInContainer.classList.remove('js-none');
        //     guestSignInContainer.classList.add('js-block');
        //     // overlayContainer.classList.remove('js-block');
        //     overlayContainer.classList.add('js-none2');
        //     guestSignInContainer.classList.add('js-block2');
        // }, 500);
        
    })
});

// rwd js
var $li = $('ul.tab-title li');
$($li.eq(0).addClass('active').find('a').attr('href')).siblings('.tab-inner').hide();

$li.click(function () {
    $($(this).find('a').attr('href')).show().siblings('.tab-inner').hide();
    $(this).addClass('active').siblings('.active').removeClass('active');
});



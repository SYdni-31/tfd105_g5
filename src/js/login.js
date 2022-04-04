document.addEventListener("DOMContentLoaded", function () {
    let login_page_icon = document.getElementById('login_page_icon');
    let login = document.getElementById('login');
    let btn_close = document.getElementById('BtnClose');

    // 點擊人頭叫出登入頁燈箱
    login_page_icon.addEventListener('click', function () {
        login.classList.remove('js-none');
        // login.fadeIn(1000);
        login.classList.add('js-block');
        // login.fadeIn(3000);
        document.body.style.overflow = 'hidden';
    });

    // 點擊叉叉可以關閉燈箱
    btn_close.addEventListener('click', function () {
        CloseLightBox();
    });

    // 關閉燈箱
    function CloseLightBox() {
        login.classList.remove('-login_page_icon');
        login.classList.remove('js-block');
        document.body.style.overflow = '';
    }

    // 點擊遮罩處可以關閉燈箱
    $(document).on("click", "form.login", function (e) {
        if ($(e.target).is("form.login")) {
            CloseLightBox();
        }
    });

    // 按Esc鍵可以關閉燈箱
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

        if ($("#company-sign-in-container").hasClass('js-slide-right') && $("#company-sign-in-container").hasClass('js-block')) {
                    // 初始化流程
                    companySignInContainer.classList.remove('js-slide-right');
                    companySignInContainer.classList.remove('js-block');
                    receivedForm.classList.remove('js-none');
                    companySignUpContainer.classList.remove('js-none');
                    guestSignInContainer.classList.remove('js-block');
                    overlayContainer.classList.add('js-slide-right');
                    setTimeout(function () {
                        companySignInContainer.classList.remove('js-block3');
                        companySignInContainer.classList.add('js-none');
                        overlayContainer.classList.remove('js-none2');
                        overlayContainer.classList.remove('js-slide-right2');
                        overlayContainer.classList.remove('js-block');
                        // overlayContainer.classList.remove('js-block3');
                        // overlayContainer.classList.add('js-slide-right');
                        overlayContainer.classList.add('js-block3');
                        // $(overlay-container).css("z-index", "2");
                        // guestSignInContainer.classList.remove('js-none');
                        guestSignInContainer.classList.remove('js-block2');
                    }, 700);
        }
        if($("#company-sign-in-container").hasClass('js-slide-right') && $("#company-sign-in-container").hasClass('js-slide-left') && $("#company-sign-in-container").hasClass('js-none') && $("#company-sign-in-container").hasClass('js-block2')){
            companySignInContainer.classList.remove('js-slide-right');
            // companySignInContainer.classList.add('js-slide-left');
            companySignUpContainer.classList.remove('js-none');
            setTimeout(function () {
                companySignInContainer.classList.remove('js-block2');
                companySignInContainer.classList.remove('js-slide-left');
                guestSignInContainer.classList.remove('js-block2');
                // companySignInContainer.classList.add('js-none');
                // guestSignInContainer.classList.remove('js-none');
                // formForgetPassword.classList.remove('js')
                overlayContainer.classList.remove('js-none2');
                overlayContainer.classList.remove('js-slide-right2');
            }, 700);
        }
        

    });

    // 點擊出現 忘記密碼區塊
    let formForgetPassword = document.getElementsByClassName('form-forget-password')[0];
    let forgetA = document.getElementsByClassName('forget-a')[0];
    forgetA.addEventListener('click', function () {
        companySignInContainer.classList.add('js-none');
        companySignUpContainer.classList.add('js-none');
        formForgetPassword.classList.add('js-block');
        // 初始化
        if($("#company-sign-in-container").hasClass('js-block2') && $("#company-sign-in-container").hasClass('js-none')){
            companySignInContainer.classList.add('js-none');
            companySignInContainer.classList.remove('js-block2');
            companySignUpContainer.classList.add('js-none2');
            formForgetPassword.classList.remove('js-none');
            promptMessage.classList.remove('js-block');
        }
        if ($("#company-sign-in-container").hasClass('js-slide-right') && $("#company-sign-in-container").hasClass('js-block') && $("#company-sign-in-container").hasClass('js-block3') && $("#company-sign-in-container").hasClass('js-slide-left')) {
            // companySignInContainer.classList.remove('js-none');
            companySignInContainer.classList.remove('js-block');
            companySignInContainer.classList.remove('js-block3');
        }
    });

    // 點擊送出資料鈕 顯示已送出
    let receivedForm = document.getElementsByClassName('received-form')[0];
    let loginBtnSubmitinfo = document.getElementsByClassName('login_btn_submitinfo')[0];
    loginBtnSubmitinfo.addEventListener('click', function () {
        companySignUpContainer.classList.add('js-none')
        receivedForm.classList.add('js-block');
    })

    // 點擊確認 回到廠商登入頁
    let loginBtnConfirm = document.getElementsByClassName('login_btn_confirm')[0];
    loginBtnConfirm.addEventListener('click', function () {
        receivedForm.classList.remove('js-block');
        receivedForm.classList.add('js-none');
        CloseLightBox();
        setTimeout(function () {
            companySignInContainer.classList.remove('js-slide-left');
            companySignInContainer.classList.remove('js-none');
            companySignInContainer.classList.add('js-slide-right');
            companySignInContainer.classList.add('js-block');
            guestSignInContainer.classList.remove('js-none');
            guestSignInContainer.classList.add('js-block');
        }, 300);
        overlayContainer.classList.remove('js-block');
        overlayContainer.classList.add('js-none');
    })

    // //點擊登入會員按鈕 返回顯示廠商登入頁面
    signIn.addEventListener('click', function () {
        overlayContainer.classList.add('js-slide-right2');
        setTimeout(function () {
            guestSignInContainer.classList.add('js-block2');
            guestSignInContainer.classList.remove('js-none');
            guestSignInContainer.classList.add('js-block');
            guestSignInContainer.classList.add('js-block2');
            companySignUpContainer.classList.add('js-none');
            companySignInContainer.classList.add('js-slide-right');
            companySignInContainer.classList.add('js-block');
            companySignInContainer.classList.remove('js-none');
            companySignInContainer.classList.add('js-block3');
            overlayContainer.classList.remove('js-block');
            overlayContainer.classList.add('js-none2');
        }, 500);

        
    })

    // 點擊寄送驗證信 出現提示字
    let give = document.getElementsByClassName('give')[0];
    // console.log(give);
    let promptMessage = document.getElementById('prompt_message');
    give.addEventListener('click', function () {
        // console.log(give);
        // promptMessage.classList.remove('js-block');
        promptMessage.classList.add('js-block');
        if($("#form-forget-password").hasClass('js-block')){
            promptMessage.classList.remove('js-none');
            promptMessage.classList.add('js-block');
        }  
    });
    
    // 輸入完資訊，點擊參觀按鈕後關閉彈窗
    let loginBtnVisit = document.getElementsByClassName('login_btn-visit')[0];
    loginBtnVisit.addEventListener('click', function () {
        CloseLightBox();
    });

    // 點擊返回登入鈕，返回廠商登入頁
    let loginBtnBack = document.getElementsByClassName('login_btn_back')[0];
    loginBtnBack.addEventListener('click', function () {
        formForgetPassword.classList.add('js-none');
        companySignInContainer.classList.add('js-block2');
        setTimeout(function(){
            
        })
    })

});


// 判斷螢幕寬度 螢幕寬度大於767px時，頁籤消失
window.addEventListener("resize", function () {
    let tabTitle = this.document.getElementsByClassName('tab-title')[0];
    if (window.innerWidth >= 767) {
        tabTitle.classList.add('js-none');
    } else {
        // RWD JS
        var $li = $('ul.tab-title li');
        $($li.eq(0).addClass('active').find('a').attr('href')).siblings('.tab-inner').hide();

        $li.click(function () {
            $($(this).find('a').attr('href')).show().siblings('.tab-inner').hide();
            $(this).addClass('active').siblings('.active').removeClass('active');
        });
    }
});
document.addEventListener("DOMContentLoaded", function () {
    let login_page_icon = document.getElementById("login_page_icon");
    let login = document.getElementById("login");
    let btn_close = document.getElementById("BtnClose");

    // 點擊人頭叫出登入頁燈箱
    login_page_icon.addEventListener("click", function () {
        login.classList.remove("js-none");
        // login.fadeIn(1000);
        login.classList.add("js-block");
        // login.fadeIn(3000);
        document.body.style.overflow = "hidden";
    });

    // 點擊叉叉可以關閉燈箱
    btn_close.addEventListener("click", function () {
        CloseLightBox();
    });

    // 關閉燈箱
    function CloseLightBox() {
        login.classList.remove("-login_page_icon");
        login.classList.remove("js-block");
        document.body.style.overflow = "";
    }

    // 點擊遮罩處可以關閉燈箱
    $(document).on("click", ".login", function (e) {
        if ($(e.target).is(".login")) {
            CloseLightBox();
        }
    });

    // 按Esc鍵可以關閉燈箱
    $(document).keyup(function (e) {
        if (e.which == "27") {
            CloseLightBox();
        }
    });

    var login_btn_signup = document.getElementById("login_btn_signup");
    var signIn = document.getElementById("signIn");
    var companySignInContainer = document.getElementById("company_sign_in_container");
    var companySignUpContainer = document.getElementsByClassName("company-sign-up-container")[0];
    var guestSignInContainer = document.getElementsByClassName("guest-sign-in-container")[0];
    let overlayContainer = document.getElementsByClassName("overlay-container")[0];

    // 點擊註冊
    login_btn_signup.addEventListener("click", function () {
        // 廠商登入往左滑
        companySignInContainer.classList.add("js-slide-left");
        companySignInContainer.classList.remove("js-slide-right");
        companySignUpContainer.classList.remove("js-none");
        setTimeout(function () {
            companySignInContainer.classList.add("js-none");
            guestSignInContainer.classList.add("js-none");
            overlayContainer.classList.remove("js-none");
            overlayContainer.classList.remove("js-none2");
            overlayContainer.classList.remove("js-slide-right2");
        }, 700);

        if (
            $("#company_sign_in_container").hasClass("js-slide-right") &&
            $("#company_sign_in_container").hasClass("js-block")
        ) {
            // 初始化流程
            companySignInContainer.classList.remove("js-slide-right");
            companySignInContainer.classList.remove("js-block");
            receivedForm.classList.remove("js-none");
            companySignUpContainer.classList.remove("js-none");
            guestSignInContainer.classList.remove("js-block");
            overlayContainer.classList.add("js-slide-right");
            setTimeout(function () {
                companySignInContainer.classList.remove("js-block3");
                companySignInContainer.classList.add("js-none");
                overlayContainer.classList.remove("js-none2");
                overlayContainer.classList.remove("js-slide-right2");
                overlayContainer.classList.remove("js-block");
                // overlayContainer.classList.remove('js-block3');
                // overlayContainer.classList.add('js-slide-right');
                overlayContainer.classList.add("js-block3");
                // $(overlay-container).css("z-index", "2");
                // guestSignInContainer.classList.remove('js-none');
                guestSignInContainer.classList.remove("js-block2");
            }, 700);
        }
        if (
            $("#company_sign_in_container").hasClass("js-slide-right") &&
            $("#company_sign_in_container").hasClass("js-slide-left") &&
            $("#company_sign_in_container").hasClass("js-none") &&
            $("#company_sign_in_container").hasClass("js-block2")
        ) {
            companySignInContainer.classList.remove("js-slide-right");
            // companySignInContainer.classList.add('js-slide-left');
            companySignUpContainer.classList.remove("js-none");
            setTimeout(function () {
                companySignInContainer.classList.remove("js-block2");
                companySignInContainer.classList.remove("js-slide-left");
                guestSignInContainer.classList.remove("js-block2");
                // companySignInContainer.classList.add('js-none');
                // guestSignInContainer.classList.remove('js-none');
                // formForgetPassword.classList.remove('js')
                overlayContainer.classList.remove("js-none2");
                overlayContainer.classList.remove("js-slide-right2");
            }, 700);
        }

    });

    // 點擊出現 忘記密碼區塊
    let formForgetPassword = document.getElementsByClassName("form-forget-password")[0];
    let forgetA = document.getElementsByClassName("forget-a")[0];
    forgetA.addEventListener("click", function () {
        companySignInContainer.classList.add("js-none");
        companySignUpContainer.classList.add("js-none");
        formForgetPassword.classList.add("js-block");
        companySignInContainer.classList.remove("js-block");
        // 初始化
        if (
            $("#company_sign_in_container").hasClass("js-block2") &&
            $("#company_sign_in_container").hasClass("js-none")
        ) {
            companySignInContainer.classList.add("js-none");
            companySignInContainer.classList.remove("js-block2");
            companySignUpContainer.classList.add("js-none2");
            formForgetPassword.classList.remove("js-none");
            promptMessage.classList.remove("js-block");
        }
        if (
            $("#company_sign_in_container").hasClass("js-slide-right") &&
            $("#company_sign_in_container").hasClass("js-block") &&
            $("#company_sign_in_container").hasClass("js-block3") &&
            $("#company_sign_in_container").hasClass("js-slide-left")
        ) {
            // companySignInContainer.classList.remove('js-none');
            companySignInContainer.classList.remove("js-block");
            companySignInContainer.classList.remove("js-block3");
        }
    });

    // 點擊送出資料鈕 顯示已送出
    let receivedForm = document.getElementsByClassName("received-form")[0];
    let loginBtnSubmitinfo = document.getElementsByClassName("login_btn_submitinfo")[0];
    // 抓取註冊表單欄位
    let name_2 = document.getElementById('name_2');
    let email_3 = document.getElementById('email_3');
    let password_2 = document.getElementById('password_2');
    let company_2 = document.getElementById('company_2');
    let exb_dropdown = document.getElementById('exb_dropdown');
    loginBtnSubmitinfo.addEventListener("click", function (e) {
        let companySignUp_name = name_2.value.trim();
        let companySignUp_email = email_3.value.trim();
        let companySignUp_password = password_2.value.trim();
        let companySignUp_company = company_2.value.trim();
        let companySignUp_dropdown = exb_dropdown.value;
        let send_data = true;

        // 姓名欄位不得為空值
        if (companySignUp_name === "") {
            send_data = false;
            name_2.classList.add('login-error');
        } else {
            name_2.classList.remove('login-error');
        }

        // 電子郵件不得為空值且符合格式
        // console.log(companySignUp_email);
        // console.log(is.email(companySignUp_email));
        if (is.email(companySignUp_email)) {
            // console.log("1");
            email_3.classList.remove("login-error");
        } else {
            send_data = false;
            // console.log("2");
            email_3.classList.add("login-error");
            // alert('email錯誤!');
        }

        // 密碼欄位不得為空值
        if (companySignUp_password === "") {
            send_data = false;
            password_2.classList.add("login-error");
        } else {
            password_2.classList.remove("login-error");
        }

        //密碼欄位輸入不得大於20碼或小於8碼
        if (password_2.value.length > 20) {
            send_data = false;
            alert('密碼長度不得大於20碼');
            password_2.focus();
            password_2.classList.add("login-error");
            // password_2.value = "";
        } else if (password_2.value.length < 8) {
            send_data = false;
            alert('密碼長度不得小於8碼');
            password_2.focus();
            password_2.classList.add("login-error");
            // password_2.value = "";
        } else {
            password_2.classList.remove("login-error");
        }

        // 貴公司單位欄位不得為空值
        if (companySignUp_company === "") {
            send_data = false;
            company_2.classList.add('login-error');
        } else {
            company_2.classList.remove('login-error');
        }

        // 參展類型不得為空值
        if (companySignUp_dropdown !== 0) {

        } else {
            send_data = false;
        }

        // 各欄位不得為空值
        if (companySignUp_name === "" && companySignUp_password === "" && companySignUp_company === "" && !is.email(companySignUp_email)) {
            send_data = false;
        } else if (companySignUp_password === "") {
            send_data = false;
        } else if (companySignUp_company === "") {
            send_data = false;
        } else {

        }

        // 判斷是否成功送出資料
        // console.log(send_data);
        if (!send_data) {
            alert('格式錯誤或是必填欄位未輸入!');
            e.preventDefault();
        } else {
            companySignUpContainer.classList.add("js-none");
            companySignUpContainer.classList.remove("js-block");
            receivedForm.classList.add("js-block");
            companySignInContainer.classList.remove("js-block");
            guestSignInContainer.classList.add("js-none");
            guestSignInContainer.classList.remove("js-block");
            alert('資料送出成功');
            name_2.value = "";
            email_3.value = "";
            password_2.value = "";
            company_2.value = "";
            exb_dropdown.value = 1;
        }
    });

    // 點擊確認 回到廠商登入頁
    let loginBtnConfirm = document.getElementsByClassName("login_btn_confirm")[0];
    loginBtnConfirm.addEventListener("click", function () {
        receivedForm.classList.remove("js-block");
        receivedForm.classList.remove("js-block");
        loginTabGuest.classList.remove('js-none');
        CloseLightBox();
        setTimeout(function () {
            companySignInContainer.classList.remove("js-slide-left");
            companySignInContainer.classList.remove("js-none");
            companySignInContainer.classList.add("js-slide-right");
            companySignInContainer.classList.add("js-block");
            guestSignInContainer.classList.remove("js-none");
            guestSignInContainer.classList.add("js-block");
        }, 300);
        overlayContainer.classList.remove("js-block");
        overlayContainer.classList.add("js-none");
    });

    //點擊登入會員按鈕 返回顯示廠商登入頁面
    signIn.addEventListener("click", function (e) {
        overlayContainer.classList.add("js-slide-right2");
        guestSignInContainer.classList.remove("js-block2");
        guestSignInContainer.classList.remove("js-none");
        guestSignInContainer.classList.remove("js-block");
        setTimeout(function () {
            companySignUpContainer.classList.add("js-none");
            companySignInContainer.classList.add("js-slide-right");
            //   companySignInContainer.classList.add("js-block");
            companySignInContainer.classList.remove("js-none");
            companySignInContainer.classList.remove("js-slide-left");
            //   companySignInContainer.classList.add("js-block3");
            overlayContainer.classList.remove("js-block");
            overlayContainer.classList.add("js-none2");
        }, 500);


    });

    // 點擊寄送驗證信 出現提示字
    let give = document.getElementsByClassName("give")[0];
    // console.log(give);
    let promptMessage = document.getElementById("prompt_message");
    give.addEventListener("click", function () {
        //發信，有信件數量限制，故暫時不發信
        //   var templateParams = {
        //      user: "台積電",
        //     from_name:"聚策展",
        //     message: "您的密碼已變更為password!''",
        //   };

        //   emailjs.send("service_gos3kx1", "template_a1m2ysc", templateParams).then(
        //     function (response) {
        //       console.log("SUCCESS!", response.status, response.text);
        //     },
        //     function (error) {
        //       console.log("FAILED...", error);
        //     }
        //   );


        promptMessage.classList.add("js-block");
        if ($("#form-forget-password").hasClass("js-block")) {
            promptMessage.classList.remove("js-none");
            promptMessage.classList.add("js-block");
        }
    });

    // 輸入完資訊，點擊參觀按鈕後關閉彈窗
    var loginBtnVisit = document.getElementsByClassName("login_btn-visit")[0];
    let name_1 = document.getElementById('name_1');
    let email_2 = document.getElementById('email_2');
    let Company_1 = document.getElementById('Company_1');
    loginBtnVisit.addEventListener("click", function (e) {
        let send_data = true;
        send_data = false;
        let guest_name = name_1.value.trim();
        let guest_email = email_2.value.trim();
        let guest_company = Company_1.value.trim();

        // 姓名.電子郵件為必填欄位
        if (guest_name === "" || guest_email === "") {
            send_data = false;
        } else if (guest_name === "" && guest_email === "") {
            send_data = false;
        } else {
            send_data = true;
        }

        // 電子郵件欄位驗證
        if (is.email(guest_email)) {
            // console.log("1");
            email_2.classList.remove("login-error");
        } else {
            // console.log("2");
            email_2.classList.add("login-error");
            send_data = false;
        }

        // 參觀成功與參觀失敗
        if (!send_data) {
            alert('格式錯誤或是必填欄位未輸入!');
            e.preventDefault();
        } else {
            send_data = true;
            CloseLightBox();
            alert('歡迎參觀聚策展!');
            name_1.value = "";
            email_2.value = "";
            Company_1.value = "";
        }
    });

    // 點擊返回登入鈕，返回廠商登入頁
    let loginBtnBack = document.getElementsByClassName("login_btn_back")[0];
    loginBtnBack.addEventListener("click", function () {
        formForgetPassword.classList.remove("js-block");
        companySignInContainer.classList.remove("js-none");
        setTimeout(function () { });
    });

    // RWD 點擊註冊鈕，出現廠商登入頁
    let loginBtnSignupRwd = document.getElementById('login_btn_signup_rwd');
    let loginTabGuest = document.getElementsByClassName('login_tab_guest')[0];
    // console.log(loginTabGuest);
    loginBtnSignupRwd.addEventListener('click', function () {
        companySignInContainer.classList.add('js-none');
        companySignUpContainer.classList.add('js-block');
        loginTabGuest.classList.add('js-none');
        // console.log(guestSignInContainer);
        // console.log(loginBtnSignupRwd);
        // guestSignInContainer.
    })

    // RWD 於註冊頁面點擊返回登入鈕，返回廠商登入
    let loginBtnBack2 = document.getElementsByClassName('login_btn_back2')[0];
    loginBtnBack2.addEventListener('click', function () {
        companySignUpContainer.classList.remove('js-block');
        companySignInContainer.classList.remove('js-none');
        loginTabGuest.classList.remove('js-none');
    })

    // 判斷螢幕寬度 螢幕寬度大於880px時，頁籤消失
    window.addEventListener("resize", function () {
        let tabTitle = this.document.getElementsByClassName("tab-title")[0];
        if (window.innerWidth >= 880) {
            let $li = $("ul.tab-title");
            $($li).siblings(".guest-sign-in-container").show();
            // $('.guest-sign-in-container').toggle();
            companySignUpContainer.classList.remove('js-none');
        }

        if (window.innerWidth < 880) {
            // RWD JS
            let $li = $("ul.tab-title li");

            $($li.eq(0).addClass("-on").find("a").attr("href")).siblings(".tab-inner").hide();

            $li.click(function () {
                $($(this).find("a").attr("href")).show().siblings(".tab-inner").hide();
                $(this).addClass("active").siblings(".active").removeClass("active");
            });
        }
    });

    if (window.innerWidth < 880) {

        // RWD JS
        var $li = $("ul.tab-title li");

        $($li.eq(0).addClass("-on").find("a").attr("href")).siblings(".tab-inner").hide();

        $li.click(function () {
            $($(this).find("a").attr("href")).show().siblings(".tab-inner").hide();
            $(this).addClass("active").siblings(".active").removeClass("active");
        });

    }



    // 廠商登入驗證區塊
    let email_el = document.getElementById('email_1');
    let password_el = document.getElementById('password_1');
    companySignInContainer.addEventListener("submit", function (e) {
        let companySignIn_email = email_el.value.trim();
        let companySignIn_password = password_el.value.trim();
        let send_data = true;

        // 電子郵件欄位不得輸入中文
        // let strNOCn_1 = companySignIn_email.replace(/[^\u4E00-\u9FA5]/g, '');
        // companySignIn_email = strNOCn_1;    
        // email符合格式
        if (is.email(companySignIn_email)) {
            // console.log("1");
            email_el.classList.remove("login-error");
        } else {
            email_el.classList.add("login-error");
            send_data = false;
        }

        //密碼欄位輸入不得大於20碼或小於8碼
        if (password_el.value.length > 20) {
            alert('輸入密碼長度不得大於20碼');
            password_el.focus();
            password_el.classList.add("login-error");
            // password_el.value = "";
            send_data = false;
        } else if (password_el.value.length < 8) {
            alert('輸入密碼長度不得小於8碼');
            password_el.focus();
            password_el.classList.add("login-error");
            // password_el.value = "";
            send_data = false;
        } else {
            password_el.classList.remove("login-error");
        }

        // 電子郵件與密碼欄位皆為必填欄位
        if (companySignIn_email === "" && companySignIn_password === "") {
            send_data = false;
        } else if (companySignIn_password === "" || companySignIn_email === "") {
            send_data = false;
        } else {
            email_el.classList.remove("login-error");
            password_el.classList.remove("login-error");
        }

        // 登入成功與登入失敗
        if (!send_data) {
            alert('格式錯誤或是必填欄位未輸入!');
            e.preventDefault();
        } else {
            send_data = true;
            alert("登入成功");
            email_el.value = "";
            password_el.value = "";
        }

        // 輸入正確電郵地址及密碼，成功登入廠商後台
        if (companySignIn_email === "tfd105.group5@gmail.com" && companySignIn_password === 'Wed34!""') {
            e.preventDefault();
            document.location.href = "backstage_info1.html";
        }
    });


});
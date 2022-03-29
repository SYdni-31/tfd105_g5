document.addEventListener("DOMContentLoaded", function () {
    let login_page_icon = document.getElementById('login_page_icon');
    let login = document.getElementById('login');
    let btn_close = document.getElementById('BtnClose');
    login_page_icon.addEventListener('click', function () {
        login.classList.remove('js-none');
        login.classList.add('js-block');
        // document.body.style.overflow = 'hidden';
    });
    btn_close.addEventListener('click', function () {
        CloseLightBox();
    });
});

function CloseLightBox() {
    login.classList.remove('-login_page_icon');
    login.classList.remove('js-block');
    document.body.style.overflow = 'show';  
}

//點擊遮罩處可以關閉燈箱
$(document).on("click", "form.login", function(e) {
    if ($(e.target).is("form.login")) {
        CloseLightBox();
    }
});

//按Esc可以關閉燈箱
$(document).keyup(function(e) {
    if (e.which == '27') {
        CloseLightBox();
    }
});
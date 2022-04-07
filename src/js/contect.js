$(".contect_question").on("click", function (e) {
  $(this).closest("li").toggleClass("-on");
  $(this).closest("li").find("div.contect_answer").slideToggle();
  //展開符號180度選轉
  $(this).closest("li").find(".fa-chevron-down").toggleClass("-transform-180");
  //展開標題改顏色
  $(this).closest("li").find(".contect_question").toggleClass("-change-color");
  //展開符號改顏色
  $(this).closest("li").find(".fa-chevron-down").toggleClass("-change-color");
});



//驗證email 
//let regex = new RegExp(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)
//   var reg = /(\S)+[@]{1}(\S)+[.]{1}(\w)+/;

var the_form_el = document.getElementById("contect_form");
the_form_el.addEventListener("submit", function (e) {    //針對送出事建綁定  先驗證再送出 帳號email 卡號 必填符合格式
  //先抓欄位
  let name_el = document.getElementById("contect_name");
  let email_el = document.getElementById("contect_mail");
  let phone_el = document.getElementById("contect_phone");
  let message_el = document.getElementById("contect_message");
  let send_data = true;


  //input姓名  變紅框
  if (name_el.value === "") {
    name_el.classList.add("-error");
      send_data = false;
  } else {
    name_el.classList.remove("-error");
  }

  //驗證email
  if (is.email(email_el.value)) {
      // console.log("1");
      email_el.classList.remove("-error");
  } else {
      // console.log("2");
      email_el.classList.add("-error");
      send_data = false;
  }
 
  //驗證電話號碼
  if(is.number(phone_el.value) || !phone_el.value === "" || (phone_el.value.length >=9 && phone_el.value.length <=10) ){            //不是數字
    phone_el.classList.remove("-error")
  }else {
    phone_el.classList.add("-error");
    send_data = false;
  }

  //驗證訊息欄位
  if (message_el.value === "") {
    message_el.classList.add("-error");
    send_data = false;
  } else {
    message_el.classList.remove("-error");
  }

  if (!send_data) {            //if(send_data == false) 一樣
      e.preventDefault();
    swal("送出失敗", "格式錯誤或是必填欄位未輸入!", "error");
 
  }else{
    swal("送出成功", " ", "success");
  }
});

// aos
AOS.init();
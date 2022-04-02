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

// 跳出視窗
document.getElementById("submit").addEventListener("click", function (e) {
  // console.log('a')
  e.preventDefault();
  // 目前只判斷姓名
  let required = document.getElementsByClassName("required")[0];
  if (required.value !== "" && required.value !== null) {
    swal("送出成功", "此為學習、展示之用，無法幫忙製作網頁", "success");
  } else {
    swal("送出失敗，必填欄位未輸入", "此為學習、展示之用，無法幫忙製作網頁", "error");
  }
});

//驗證email 
//let regex = new RegExp(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)
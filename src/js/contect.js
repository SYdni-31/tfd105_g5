$(".contect_question").on("click", function(e){
    $(this).closest("li").toggleClass("-on");
    $(this).closest("li").find("div.contect_answer").slideToggle();
    //展開符號180度選轉
    $(this).closest("li").find(".fa-chevron-down").toggleClass("-transform-180");
    //展開標題改顏色
    $(this).closest("li").find(".contect_question").toggleClass("-change-color");
    //展開符號改顏色
    $(this).closest("li").find(".fa-chevron-down").toggleClass("-change-color");
  });


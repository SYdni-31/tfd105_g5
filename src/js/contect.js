$(".contect_btn").on("click", function(e){
    $(this).closest("li").toggleClass("-on");
    $(this).closest("li").find("div.contect_answer").slideToggle();
  });


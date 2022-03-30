// =================輪播=================  
var swiper = new Swiper(".mySwiper", {
    loop: true,
    spaceBetween: 20,
    slidesPerView: "auto",
    freeMode: true,
    watchSlidesProgress: true,
  });
  var swiper2 = new Swiper(".mySwiper2", {
    loop: true,
    spaceBetween: 10,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    thumbs: {
      swiper: swiper,
    },
  }); 
  // =================頁面切換=================  
  window.addEventListener('DOMContentLoaded', function(){
    let content_point= document.querySelectorAll('.content_point')
    let content_inner= document.querySelectorAll('.content_inner')
    content_point.forEach(function(item, index){
      item.addEventListener('click', function(){
        let others_point=this.parentElement.querySelectorAll('.content_point')
        let others_content=this.parentElement.querySelectorAll('.content_inner')
        for(let i = 0; i < others_content.length; i++){
          others_point[i].classList.remove("content_pointed");
          others_content[i].classList.add("-hide");
        }
        this.classList.add("content_pointed")
        content_inner[index].classList.remove("-hide")
      })
    })
  })
  // =================留言板啟動=================  
  let extend_chat_btn=document.querySelector('.extend_chat_btn') 
  
  $('.extend_chat_btn').on('click', function(e){
    e.preventDefault();
    $(this).next('.extend_chatbox').toggle(300)
  })
  $('.chatbox_close').on('click',function(){
    $(this).parents('.extend_chatbox').hide(300)
  }) 

// =================輪播=================  
var swiper = new Swiper(".mySwiper", {
    loop: true,
    autoHeight: false,
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
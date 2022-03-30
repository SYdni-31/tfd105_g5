// 輪播event coverflow
var swiper = new Swiper(".mySwiper", {
  loop: true,
  loopedSlides: 1,
  slidesPerView: "1",
  speed: 1000,
  autoplay: {
      delay: 3000,},
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 60,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: false,
  },
  pagination: {
    el: ".swiper-pagination",
  },
});

// 輪播event coverflow
var swiper = new Swiper(".mySwiper", {
  loop: true,
  // width: window.innerWidth,
  // width: 150,
  // loopedSlides: 1,
  // slidesPerView: 1,
  // speed: 1000,
  // autoplay: {
  //     delay: 3000,},
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 50,
    stretch: 15,
    depth: 200,
    modifier: 1,
    slideShadows: false,
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      // width: 300,
      // spaceBetween: 10,
      // depth: 200,
    },
    576: {
      slidesPerView: "auto",
      spaceBetween: 20,
    },
    // 768: {
    //   slidesPerView: 5,
    //   spaceBetween: 20,
    // },
    // 1024: {
    //   slidesPerView: 7,
    //   spaceBetween: 50,
    // },
  }
  // pagination: {
  //   el: ".swiper-pagination",
  // },
});



// parallax.js
// var scene = document.getElementById('scene');
// var parallaxInstance = new Parallax(scene, {
//   relativeInput: true
// });

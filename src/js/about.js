
var swiper = new Swiper(".mySwiper", {
  slidesPerView: 7, //一頁幾個
  spaceBetween: 50,  //照片間格
  loop: true,
  scrollbar: {
    el: ".swiper-scrollbar",
    hide: false,
    draggable: true,

  },
  breakpoints: {
    375: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
    480: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 5,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 7,
      spaceBetween: 50,
    },
  }
});

//講師介紹 點了翻面 再點翻回來
var speaker = document.querySelectorAll(".about_speaker_intro");
var speaker_ = document.querySelectorAll(".about_hoverText");
// console.log(speaker);
for (let i = 0; i < speaker.length; i++) {
  speaker[i].addEventListener("click", function () {
    console.log(speaker[i]);
    (speaker[i]).classList.add("-hide");
    // for (let i = 0; i < speaker_.length; i++) {
    (speaker_[i]).classList.add("-show");
    (speaker_[i]).classList.remove("-hide");
    // };

  });

}
for (let i = 0; i < speaker_.length; i++) {
  speaker_[i].addEventListener("click", function () {
    // for (let i = 0; i < speaker_.length; i++) {
      (speaker_[i]).classList.add("-hide");
      (speaker_[i]).classList.remove("-show");
    // };
    (speaker[i]).classList.add("-show");
    (speaker[i]).classList.remove("-hide");

  });
}





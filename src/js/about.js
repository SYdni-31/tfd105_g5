
// var swiper = new Swiper(".mySwiper", {
//   slidesPerView: 7, //一頁幾個
//   spaceBetween: 50,  //照片間格
//   loop: true,
//   scrollbar: {
//     el: ".swiper-scrollbar",
//     hide: false,
//     draggable: true,
//     dragSize: 10,

//   },
//   breakpoints: {
//     320: {
//       slidesPerView: 4,
//       spaceBetween: 20,
//     },
//     375: {
//       slidesPerView: 4,
//       spaceBetween: 20,
//     },
//     480: {
//       slidesPerView: 4,
//       spaceBetween: 20,
//     },
//     768: {
//       slidesPerView: 5,
//       spaceBetween: 20,
//     },
//     1024: {
//       slidesPerView: 7,
//       spaceBetween: 50,
//     },
//   }
// });

//講師介紹 點了翻面 再點翻回來
// var speaker = document.querySelectorAll(".about_speaker_intro");
// var speaker_ = document.querySelectorAll(".about_hoverText");
// // console.log(speaker);
// for (let i = 0; i < speaker.length; i++) {
//   speaker[i].addEventListener("click", function () {
//     console.log(speaker[i]);
//     (speaker[i]).classList.add("-hide");
//     (speaker_[i]).classList.add("-show");
//     (speaker_[i]).classList.remove("-hide");


//   });

// }
// for (let i = 0; i < speaker_.length; i++) {
//   speaker_[i].addEventListener("click", function () {
//     (speaker_[i]).classList.add("-hide");
//     (speaker_[i]).classList.remove("-show");
//     (speaker[i]).classList.add("-show");
//     (speaker[i]).classList.remove("-hide");

//   });
// }



// aos
// AOS.init();

const vm = new Vue({
    el: "#about_main",
    data: {
        schedules:[
            {time:'10:20-10:30',theme:'主持人介紹',},
            {time:'10:30-11:00',theme:'主講人:唐鳳-數位國家・創新經濟發展方案',},
            
        ]
    },

    })
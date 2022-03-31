
        var swiper = new Swiper(".mySwiper", {
            slidesPerView: 7, //一頁幾個
            spaceBetween: 50,  //照片間格
            loop:true,
            scrollbar: {
              el: ".swiper-scrollbar",
              hide: false,
              draggable:true,
        
            },
            breakpoints:{
              375:{
                slidesPerView: 4,
                spaceBetween: 20,
              },
              480:{
                slidesPerView: 4,
                spaceBetween: 20,
              },
              768:{
                slidesPerView: 5,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 7,
                spaceBetween: 50,
              },
            }
          });

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
        schedules:[],
        speakers:[],
        today:"2022-04-11",
        hideiamge:false,
        timestart:'',
        carousels:'',
        expos:'',

    },
    methods: {
        turn_back(index){
            // console.log(e.currentTarget);
            // e.currentTarget.classList.toggle('-hide')
            // this.hideiamge = !this.hideiamge
            document.getElementsByClassName('about_speaker_intro')[index].classList.toggle('-hide')
            document.getElementsByClassName('about_hoverText')[index].classList.toggle('-hide')

        },
        introduce(txt, e){

        }
    },
    mounted(){
        fetch("php/about_select_agenda.php",{
            method: 'POST', //傳到php
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Today: this.today,
                // Today:new Date(),
            })
        }).then(resp => resp.json())//接收
        .then(body => {
            // console.log(body);
            // console.log(body['agenda']);
            // console.log(body['carousel']);
            console.log(body['expo']);
            this.schedules=body['agenda'];
            this.carousels=body['carousel'];
            this.expos=body['expo'];
            
            // this.schedules=body;
            for(let i=0; i<body['agenda'].length; i++){
            // this.timestart=body[i].START_TIME.slice(0,-3);
                if(body['agenda'][i].PHOTO !=null &&body['agenda'][i].PHOTO !=""){
                    this.speakers.push(body['agenda'][i])
                }
            }
            // console.log(this.speakers)
            for(let j=0; j<this.speakers.length; j++){
              let txt=this.speakers[j].INTRODUCE.split('\n')
              this.speakers[j]['txts']=txt
              // let parser = new DOMParser();
              // let doc=parser.parseFromString(txt, "text/xml");
              // document.addEventListener('DOMContentLoaded',function(){
              // doc.document.getElementsByClassName('abour_txt')[j].innerHTML
              // })
            }
            
           
        })
        var swiper = new Swiper(".mySwiper", {
              slidesPerView: 7, //一頁幾個
              spaceBetween: 50,  //照片間格
              loop: true,
              scrollbar: {
                el: ".swiper-scrollbar",
                hide: false,
                draggable: true,
                dragSize: 10,
            
              },
              breakpoints: {
                320: {
                  slidesPerView: 4,
                  spaceBetween: 20,
                },
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


    },

})
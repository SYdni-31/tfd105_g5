const vm = new Vue({
  el:'#app',
  data:{
    rooms:"",
    little_page:"about",
    chatword:"",
    guest:null,
    company:null,
  },
  methods: {
    little(i){
      this.little_page=i
    },
    inlive(index){
      let nowday= new Date().toISOString().slice(0,10)
      let nowtime= new Date().toString().slice(16).slice(0,8)
      if(this.rooms[index].live){
        for(let i=0; i<this.rooms[index].live.length; i++){
          if(this.rooms[index].live[i].DATE=="2022-04-10"){
            if(this.rooms[index].live[i].START_TIME<"13:13:13" && this.rooms[index].live[i].END_TIME>"13:13:13"){
              let live=this.rooms[index].live[i].LINK
              return live
            }
          }
        }
      }
    },
    chat(e){
      $(e.currentTarget).next('.extend_chatbox').show(300)
      document.querySelector(".swiper-button-next").classList.add("-hide")
      document.querySelector(".swiper-button-prev").classList.add("-hide")
      if(sessionStorage.getItem("login_type")){
      }else{
        this.$swal({
          title: "尚未登入",
          icon: "error",
          text: "請登入後再進行留言",
        })
        $(e.currentTarget).next('.extend_chatbox').hide(300)
        document.querySelector(".swiper-button-next").classList.remove("-hide")
        document.querySelector(".swiper-button-prev").classList.remove("-hide")   
      }
    },
    chatoff(e){
      $(e.currentTarget).parents('.extend_chatbox').hide(300)
      document.querySelector(".swiper-button-next").classList.remove("-hide")
      document.querySelector(".swiper-button-prev").classList.remove("-hide")
    },
    talktime(time){
      return time.slice(5).slice(0,11).replace("-", "/")
    },
    subchat(id, e){
      // if(this.chatword !=""){
      //   fetch('php/extend_insert_company_board.php',{
      //     method: 'POST',
      //     headers:{
      //         'Content-Type': 'application/json'
      //     },
      //     body:JSON.stringify({
      //         guest:this.guest,
      //         company:this.company,
      //         message:this.chatword,
      //         BOARD_ID:id,
      //     })
      //   })  
        let time=new Date(+new Date() + 8 * 3600 * 1000).toISOString().slice(5).slice(0,11).replace("-", "/").replace("T", " ")
        e.currentTarget.closest('.extend_chatbox').querySelector('.chated').insertAdjacentHTML('beforeend',`<p v-for="talk in room.board" class="chat_content chat_content_me pall-5 mall-10 mt-30 ml-30">${this.chatword}<span>${time}</span></p>`)
        e.currentTarget.closest('.extend_chatbox').querySelector('.chated').scroll(0,e.currentTarget.closest('.extend_chatbox').querySelector('.chated').scrollHeight)
        this.chatword=""
      // }
    },
    techconract(NAME, e){
      e.currentTarget.closest(".extend_content").previousElementSibling.querySelector('.extend_chat_btn').click()
      e.currentTarget.closest(".extend_content").previousElementSibling.querySelector('input').value = `我想了解你們的${NAME}`
      window.scroll(0,200)
      e.currentTarget.closest(".extend_content").previousElementSibling.querySelector('.chated').scroll(0,e.currentTarget.closest(".extend_content").previousElementSibling.querySelector('.chated').scrollHeight)
    },
  },
  created(){
    let type=sessionStorage.getItem("login_type")
    let id=sessionStorage.getItem("login_id")
    if(type=="COMPANY"){
      this.company=id
    }else if(type=="GUEST"){
      this.guest=id
    }else{}
    fetch('php/extend_select_company_info.php',{
      method: 'POST',
      headers:{
          'Content-Type': 'application/json'
      },
      body:JSON.stringify({
          guest:this.guest,
          company:this.company,
      })
    })
    .then(resp => resp.json())
    .then(resp => {
      let rooms_data = resp['rooms']
      rooms_data= resp['rooms']
      for(let j=0; j<resp.rooms.length; j++){
       rooms_data[j]['live']=[]
       rooms_data[j]['tech']=[]
       rooms_data[j]['board']=[]
        for(let i=0; i<resp.live.length; i++){
          if(resp.live[i].CI_ID==resp.rooms[j].ID){
           rooms_data[j]['live'].push(resp.live[i])
          }
        }
        for(let h=0; h<resp.tech.length; h++){  
          if(resp.tech[h].CI_ID==resp.rooms[j].ID){
           rooms_data[j]['tech'].push(resp.tech[h])
          }
        }
        for(let k=0; k<resp.board.length; k++){  
          if(resp.board[k].COMPANY_INFO_ID==resp.rooms[j].ID){
           rooms_data[j]['board'].push(resp.board[k])
          }
        }
      }
      this.rooms = rooms_data

      this.$nextTick(()=>{
        // =================輪播=================  
        var galleryTop = new Swiper('.gallery-top', {
          spaceBetween: 10,
          loop: true,
          loopedSlides: 7,
          observer:true,//修改swiper自己或子元素時，自動初始化swiper
          observeParents:true,//修改swiper的父元素時，自動初始化swiper
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        });
        var galleryThumbs = new Swiper('.gallery-thumbs', {
          spaceBetween: 60,
          centeredSlides: true,
          slidesPerView: 'auto',
          touchRatio: 0.2,
          slideToClickedSlide: true,
          loop: true,
          loopedSlides: 7,
          effect:'coverflow',
          coverflowEffect: {
            rotate: 0,
        },
        observer:true,//修改swiper自己或子元素時，自動初始化swiper
        observeParents:true,//修改swiper的父元素時，自動初始化swiper
      });
      galleryTop.controller.control = galleryThumbs;
      galleryThumbs.controller.control = galleryTop;
      })
    })
  },
  
})

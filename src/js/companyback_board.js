const vm = new Vue({
  el:'#company_board',
  data:{
    guest_text:[],
    company_text:[],
    company_info:'',
    searchword:'',
    cname:'',
    gname:'',
    boxname:'',
    boxgid:'',
    boxcid:'',
    mainchat:[],
    chatword:'',
  },
  methods: {
    glastmsg(NAME){
      let last=''
      for(let i=0; i<this.guest_text.length; i++){
        if(this.guest_text[i].NAME==NAME){
          if(this.guest_text[i].C_MSG !=null){
            last=this.guest_text[i].C_MSG
          }else{
            last=this.guest_text[i].G_MSG
          }
        }
      }
      return last.slice(0,3)
    },
    clastmsg(NAME){
      let last=''
      for(let i=0; i<this.company_text.length; i++){
        if(this.company_text[i].NAME==NAME){
          if(this.company_text[i].C_MSG !=null){
            last=this.company_text[i].C_MSG
          }else{
            last=this.company_text[i].G_MSG
          }
        }
      }
      return last.slice(0,3)
    },
    glasttime(NAME){
      let last=''
      for(let i=0; i<this.guest_text.length; i++){
        if(this.guest_text[i].NAME==NAME){
          last=this.guest_text[i].MSGTIME
        }
      }
      return last.slice(5).slice(0,11).replace("-", "/")
    },
    clasttime(NAME){
      let last=''
      for(let i=0; i<this.company_text.length; i++){
        if(this.company_text[i].NAME==NAME){
          last=this.company_text[i].MSGTIME
        }
      }
      return last.slice(5).slice(0,11).replace("-", "/")
    },
    c_chatbox(name, id){
      this.boxname=name
      this.boxgid=null
      this.boxcid=id
      this.mainchat=[]
      console.log(document.getElementsByClassName('two')[0])
      for(let i=0; i<this.company_text.length; i++){
        if(this.company_text[i].NAME==this.boxname){
          this.mainchat.push(this.company_text[i])
        }
      }
      document.getElementsByClassName('two')[0].setAttribute("style", "display:block")
    },
    g_chatbox(name, id){
      this.boxname=name
      this.boxgid=id
      this.boxcid=null
      this.mainchat=[]
      for(let i=0; i<this.guest_text.length; i++){
        if(this.guest_text[i].NAME==this.boxname){
          this.mainchat.push(this.guest_text[i])
        }
      }
      document.getElementsByClassName('two')[0].setAttribute("style", "display:block")
    },
    talktime(time){
      return time.slice(5).slice(0,11).replace("-", "/")
    },
    subchat(e){
      if(this.chatword !=""){
        fetch('php/companyback_insert_company_board.php',{
          method: 'POST',
          headers:{
              'Content-Type': 'application/json'
          },
          body:JSON.stringify({
              guest:this.boxgid,
              company:this.boxcid,
              message:this.chatword,
              BOARD_ID:this.company_info,
          })
        })  
        let time=new Date(+new Date() + 8 * 3600 * 1000).toISOString().slice(5).slice(0,11).replace("-", "/").replace("T", " ")
        e.currentTarget.closest('.companyback_back_chatbox').querySelector('.companyback_chated').insertAdjacentHTML('beforeend',`<p v-for="talk in room.board" class="chat_content chat_content_you pall-5 mall-10 mt-30 ml-30">${this.chatword}<span>${time}</span></p>`)
        e.currentTarget.closest('.companyback_back_chatbox').querySelector('.companyback_chated').scroll(0,e.currentTarget.closest('.companyback_back_chatbox').querySelector('.companyback_chated').scrollHeight)
        this.chatword=""
      }
    },
    offbox(){
      document.getElementsByClassName('two')[0].setAttribute("style", "");
    },
    ajax(){
      fetch('php/companyback_select_company_board.php',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            id:this.company_info,
            searchword:this.searchword
        })
      })
      .then(resp => resp.json())
      .then(resp => {
          for(let i=0; i<resp['txt'].length; i++){
              if(resp['txt'][i].GUEST_ID !=null){
                  this.guest_text.push(resp['txt'][i])
              }else{
                  this.company_text.push(resp['txt'][i])    
              }
          }
          this.cname=resp['cname']
          this.gname=resp['gname']
      })
    },

    
    // chat(e){
    //   $(e.currentTarget).next('.extend_chatbox').show(300)
    //   document.querySelector(".swiper-button-next").classList.add("-hide")
    //   document.querySelector(".swiper-button-prev").classList.add("-hide")
    //   if(sessionStorage.getItem("login_type")){
    //   }else{
    //     this.$swal({
    //       title: "尚未登入",
    //       icon: "error",
    //       text: "請登入後再進行留言",
    //     })
    //     $(e.currentTarget).next('.extend_chatbox').hide(300)
    //     document.querySelector(".swiper-button-next").classList.remove("-hide")
    //     document.querySelector(".swiper-button-prev").classList.remove("-hide")   
    //   }
    // },
    // chatoff(e){
    //   $(e.currentTarget).parents('.extend_chatbox').hide(300)
    //   document.querySelector(".swiper-button-next").classList.remove("-hide")
    //   document.querySelector(".swiper-button-prev").classList.remove("-hide")
    // },

    
    // techconract(NAME, e){
    //   e.currentTarget.closest(".extend_content").previousElementSibling.querySelector('.extend_chat_btn').click()
    //   e.currentTarget.closest(".extend_content").previousElementSibling.querySelector('input').value = `我想了解你們的${NAME}`
    //   window.scroll(0,200)
    //   e.currentTarget.closest(".extend_content").previousElementSibling.querySelector('.chated').scroll(0,e.currentTarget.closest(".extend_content").previousElementSibling.querySelector('.chated').scrollHeight)
    // },
  },
  created(){
    let info=sessionStorage.getItem("login_info")
    if(info !=null){
      this.company_info=info
    }else{
      document.location.href='index.html'
    }
    fetch('php/companyback_select_company_board.php',{
      method: 'POST',
      headers:{
          'Content-Type': 'application/json'
      },
      body:JSON.stringify({
          id:this.company_info,
          searchword:this.searchword
      })
    })
    .then(resp => resp.json())
    .then(resp => {
        for(let i=0; i<resp['txt'].length; i++){
            if(resp['txt'][i].GUEST_ID !=null){
                this.guest_text.push(resp['txt'][i])
            }else{
                this.company_text.push(resp['txt'][i])    
            }
        }
        this.cname=resp['cname']
        this.gname=resp['gname']
        this.boxname=resp['cname'][0].NAME
        this.boxgid=null
        this.boxcid=resp['cname'][0].COMPANY_ID
        for(let i=0; i<this.company_text.length; i++){
          if(this.company_text[i].NAME==this.boxname){
            this.mainchat.push(this.company_text[i])
          }
        }
    })
  },
  
})

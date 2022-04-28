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
      // console.log(last);
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
      if(this.boxcid !="" || this.boxgid !=""){

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
      }else{
        this.$swal({
          title: "無法輸入",
          icon: "error",
          text: "請先到現正直播留言",
        })
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
        console.log(resp);
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
  },
  created(){
    let info=sessionStorage.getItem("login_info");
    if(info !=null){
      this.company_info=info
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
        let {fff} =resp
        if(fff){

        }else{
            for(let i=0; i<resp['txt'].length; i++){
              //如果你有GUEST_ID我就把你丟進guest_text
              //如果沒有GUEST_ID你就一定是跟廠商聯絡
                if(resp['txt'][i].GUEST_ID !=null){
                    this.guest_text.push(resp['txt'][i]);
                }else{
                    this.company_text.push(resp['txt'][i]);    
                }
            }
            //如果此帳戶有聯絡來賓，沒有聯絡company
            if(resp['gname'].length !== 0){
              //來賓名稱
              this.boxname=resp['gname'][0].NAME;
              this.gname=resp['gname'];
              if(resp['cname'].length === 0){
                this.boxgid=resp['gname'][0].GUEST_ID;
                this.boxcid=null;
                for(let i=0; i<this.guest_text.length; i++){
                  if(this.guest_text[i].NAME==this.boxname){
                    this.mainchat.push(this.guest_text[i])
                  }
                }
              }
            }   
            if(resp['cname'].length !== 0){
              this.boxname=resp['cname'][0].NAME;
              this.cname=resp['cname'];
              this.boxcid=resp['cname'][0].COMPANY_ID;
              this.boxgid=null;
              for(let i=0; i<this.company_text.length; i++){
                if(this.company_text[i].NAME==this.boxname){
                  this.mainchat.push(this.company_text[i])
                }
              }
            }
        }
      })
    }else{
      document.location.href='index.html'
    }
   
  },
  
})

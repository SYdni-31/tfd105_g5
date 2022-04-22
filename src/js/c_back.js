// "use strict";

// 開啟聊天室
let btnOpenChat = document.querySelectorAll('.variouscompany');
for(let i=0; i < btnOpenChat.length; i++){
    btnOpenChat[i].addEventListener('click', ()=>{
        document.getElementsByClassName('two')[0].setAttribute("style", "display:block");
    })
}

// 關閉聊天室彈窗
let btnCloseChat = document.getElementById('c_back_close');
btnCloseChat.addEventListener('click',()=>{
    closeChatbox();
    document.body.style.overflow = "";
})


// 函式
function closeChatbox () {
    document.getElementsByClassName('two')[0].setAttribute("style", "");
}

const view = new Vue({
    el:".companyback_dateform",
    data(){
        return{
            LINK:"",
            DATE:"",
            TIME:"",
        }
    },
    methods: {
        // ajax(){
        //     fetch('php/c_back_insert_AGENDA_TIME.php',{
        //         method: 'POST',
        //         body:JSON.stringify(
        //             link=this.LINK,
        //             date=this.DATE,
        //             time=this.TIME
        //         )
        //     }),then(resp=>resp.json())
        //     ,then(resp=>{
        //         console.log(resp);
        //     })
        // }  
     
    },
    mounted() {
        fetch()
    },
})
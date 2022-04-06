// "use strict";

// 開啟聊天室
let btnOpenChat = document.querySelectorAll('.variouscompany');
for(let i=0; i < btnOpenChat.length; i++){
    // console.log(btnOpenChat[i]);
    btnOpenChat[i].addEventListener('click', ()=>{
        document.getElementsByClassName('two')[0].setAttribute("style", "display:block");
    })
}

// 關閉聊天室彈窗
let btnCloseChat = document.getElementById('c_back_close');
btnCloseChat.addEventListener('click',()=>{
    // console.log(BtnClose);
    closeChatbox();
})

function closeChatbox () {
    document.getElementsByClassName('two')[0].setAttribute("style", "");
}
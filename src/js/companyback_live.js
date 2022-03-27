//刪除案紐
document.addEventListener("click",function(e){
    
    if(e.target.classList.contains("fa-trash-can")){
        i--;
      let form = e.target.closest("form");
      setTimeout(function clear() {
        form.remove();
      }, 500);
    }
})
//更新文字
document.addEventListener("click", function (e) {
    if (e.target.classList.contains("btn_update")) {
        
}
})













//新增按鈕
let add_btn = document.querySelector(".companyback_add");
add_btn.addEventListener("click", function () {
 add_form();
 let layout_num=document.querySelector(".companyback_layout");
 console.log(layout_num);
})

//這裡有問題
var i = 4;

function add_form() {
    let org_asideclass = "companyback_layout";
    if(i%3==0){
        org_asideclass="companyback_layout orange";
    }else if(i%3==2){
        org_asideclass="companyback_layout blue";
    }
    let str =     
    `       
    <form action="#" class="companyback_form">
    <!-- icon -->
    <aside class="${org_asideclass}">${i++}</aside>
    <ol class="companyback_icon">
    <li><a><i class="fa-regular fa-pen-to-square"></i></a></li>
    <li> <a><i class="fa-regular fa-trash-can"></i></a></li>
    </ol>
    <div class="field pt-45">
    <h2>技術名稱 :</h2>
    <input type="text" id="email" required autocomplete="off" class="" />
    <label for="email" title="Skill name" data-title="技術名稱"></label>
    </div>
    <div class="field pt-45">
    <h2>技術網址 :</h2>
    <input type="text" id="password" required autocomplete="off" />
    <label for="password" title="Skill address" data-title="技術網址"></label>
    </div>
    <a class="companyback_save btn_company_back">儲存</a>
    </form>
    `;
    let add_btn = document.querySelector(".companyback_add");
    add_btn.insertAdjacentHTML("beforebegin",str);
   
   
}
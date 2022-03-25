//刪除紐
document.addEventListener("click",function(e){
    if(e.target.classList.contains("trash-can")){
        console.log("ttt");
    }
})














//新增按鈕
let add_btn = document.querySelector(".companyback_add");
add_btn.addEventListener("click", function () {
 add_form();
})

for(var i = 4; i<=10; i++){
    // console.log(i);
}
// let i = 4;
function add_form() {
    let str =     
    `       
    <form action="#" class="companyback_form">
    <!-- icon -->
    <aside class="companyback_layout">${[i++]}</aside>
    <ol class="companyback_icon">
    <li><a href=""><i class="fa-regular fa-pen-to-square"></i></a></li>
    <li> <a href=""><i class="fa-regular fa-trash-can"></i></a></li>
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
    add_btn.insertAdjacentHTML("beforebegin",str)
}
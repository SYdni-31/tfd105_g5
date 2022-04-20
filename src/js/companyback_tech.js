//欲解決問題:刪除序列中的序號，要動態切合序號
//刪除按鈕
document.addEventListener("click",function(e){

    if(e.target.classList.contains("fa-trash-can")){
        // i--;
        // console.log(i);
        let form = e.target.closest("form");
        setTimeout(function clear() {
            form.remove();
            // 每次按刪除鈕序號重編
            rearrange();
        }, 500);
        
    }
})

// 重新安排表單順序
function rearrange (){
    // 抓取剩下的表格queryselectorall,先抓取表格元素，然後在刪除的時候aside tag的innertext改變來更改樣式，可以使用clg來步步進逼語法是否正確，接下來要把這個函數獨立在外面，並在點擊新增按鈕的時候，也觸發這個函數
    let companybackForm = document.querySelectorAll(".companyback_form");
    // console.log(companybackForm.length);
    for(i=0;i<companybackForm.length;i++){
        companybackForm[i].querySelector(".companyback_layout").innerText=i+1;

    }
}

// 重新安排顏色
// function recolor (){
//     let asideTag = document.querySelectorAll(".companyback_layout");
//     console.log(asideTag);

// }

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
    // console.log(layout_num);
    rearrange();
    // 重新安排顏色
    // let asideTag = document.querySelectorAll(".companyback_layout");
    // // console.log(asideTag);
    // for(i=0;i<asideTag.length;i++){
    // if(i%3===0){
    //     asideTag.classList.add("orange");
    // }else{
    //     asideTag.classList.add("blue");
    // }
    // }
})


// 新增form表單改變底色數字樣式與動態生成自動編號
let i = 0;

function add_form() {
    // let org_asideclass = "companyback_layout";
    // // console.log(org_asideclass);
    // if(i%3==0){
    //     org_asideclass="companyback_layout orange";
    // }else if(i%3==2){
    //     org_asideclass="companyback_layout blue";
    // }
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

// function updateForm(){

    
//     let companybackForm = document.querySelectorAll(".trash_can");
//     companybackForm.addEventListener("click", ()=>{
        
//     })
//     for(i=0;i<100;i++){
//         $(".fa-regular fa-trash-can").addEventListener('click',{
//             console.log("ttt");
//         })
//     }
// }

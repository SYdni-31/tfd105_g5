// AJAX vue
new Vue({
    el: '#tech_app',
    data:{
        techs:'',
        company_info_id:2,
        newtech:'',
        newlink:'',
    },
    methods:{
        // 把隱藏的新增表格顯現
        showInsert(){
            document.getElementsByClassName("insert_form")[0].classList.remove("-hide");
        },
        // 重新安排現有的表格數量，更新背景數字的順序與其顏色的順序
        rearrange (){
            // 抓取剩下的表格queryselectorall,先抓取表格元素，然後在刪除的時候aside tag的innertext改變來更改樣式，可以使用clg來步步進逼語法是否正確，接下來要把這個函數獨立在外面，並在點擊新增按鈕與刪除按鈕的時候，也觸發這個函數
            let companybackForm = document.querySelectorAll(".companyback_form");
            let asideTag = document.querySelectorAll(".companyback_layout");
            
            // console.log(asideTag);
            
            // console.log(companybackForm.length);
            for(i=0;i<companybackForm.length;i++){
                companybackForm[i].querySelector(".companyback_layout").innerText=i+1;
                // 先移除樣式，再裝上屬性
                // .class.orange
                // attribute
                // .remove
                for(j=0;j<asideTag.length;j++){
                    
                    asideTag[j].classList.remove("orange", "blue");
                    if(j%3===0){
                        asideTag[j].classList.add("orange");
                    }else if(j%3===1){
                        asideTag[j].classList.add("blue");
                    }else{
                        
                    }
                }
            }
        },
        // 更新表格中的內容
        update(id, name, link){
            // link要http or https 開頭
            // if(link)
            // console.log(id);
            // console.log(name);
            // console.log(link);
            fetch('php/companyback_update_tech.php',{
                method: 'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    ID: id,
                    NAME: name,
                    LINK: link,
                })
            })
            .then(resp=>resp.json())
            // .then(body=>{
            //     // let {successful} = body;
            //     // if(successful){
            //     //     this.$swal({
            //     //         title: "儲存成功",
            //     //         icon: "success",
            //     //         image: "",
            //     //     })
            //     // }else{
            //     //     this.$swal({
            //     //         title: "儲存失敗",
            //     //         icon: "error",
            //     //         text: "請檢查欄位",
            //     //     });
            //     // }
            // })
    
        },
        // 刪除表格的資料，UPDATE STATUS='D'
        del(id, status){
            fetch('php/companyback_update2_tech.php',{
                method: 'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    ID: id,
                    STATUS: status,
                })
            })
            .then(resp=>resp.json())
            // .then(body=>{
            //     let {successful} = body;
            //     if(successful){
            //         this.$swal({
            //             title: "儲存成功",
            //             icon: "success",
            //             image: "",
            //         })
            //     }else{
            //         this.$swal({
            //             title: "儲存失敗",
            //             icon: "error",
            //             text: "請檢查欄位",
            //         });
            //     }
            // })
        },
        insert(){
            fetch('php/companyback_insert_tech.php',{
                method: 'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    NAME: this.newtech,
                    LINK: this.newlink,
                    ID: this.company_info_id,
                })
            })
            .then(resp=>resp.json())

        },

    },
    mounted(){
        // const self = this;

        fetch('php/companyback_select_tech.php',{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                company_info_id: this.company_info_id,
            })
        })
        .then(resp=>resp.json())
        .then(resp=>{
            this.techs=resp
            this.$nextTick(()=>{
                this.rearrange();
            })
        })        
        
    },
})




// document.addEventListener('DOMContentLoaded', ()=>{
//     rearrange();
// })
//欲解決問題:刪除序號之後，顏色沒辦法同步rearrange()
//刪除按鈕
// document.addEventListener("click",function(e){

//     if(e.target.classList.contains("fa-trash-can")){
//         // i--;
//         // console.log(i);
//         let form = e.target.closest("form");
//         setTimeout(function clear() {
//             form.remove();
//             // 每次按刪除鈕序號與樣式重編
//             // let companybackForm = document.querySelectorAll(".companyback_form");

//             rearrange();
//             // console.log(companybackForm);
//         }, 500);
        
//     }
// })

// 重新安排表單順序與顏色
// function rearrange (){
//     // 抓取剩下的表格queryselectorall,先抓取表格元素，然後在刪除的時候aside tag的innertext改變來更改樣式，可以使用clg來步步進逼語法是否正確，接下來要把這個函數獨立在外面，並在點擊新增按鈕與刪除按鈕的時候，也觸發這個函數
//     let companybackForm = document.querySelectorAll(".companyback_form");
//     let asideTag = document.querySelectorAll(".companyback_layout");

//     // console.log(asideTag);

//     // console.log(companybackForm.length);
//     for(i=0;i<companybackForm.length;i++){
//         companybackForm[i].querySelector(".companyback_layout").innerText=i+1;
//         // 先移除樣式，再裝上屬性
//         // .class.orange
//         // attribute
//         // .remove
//         for(j=0;j<asideTag.length;j++){

//             asideTag[j].classList.remove("orange", "blue");
//             if(j%3===0){
//                 asideTag[j].classList.add("orange");
//             }else if(j%3===1){
//                 asideTag[j].classList.add("blue");
//             }else{

//             }
//         }
//     }
// }



//更新文字
// document.addEventListener("click", function (e) {
//     if (e.target.classList.contains("btn_update")) {
        
// }
// })

//新增按鈕
// let add_btn = document.querySelector(".companyback_add");
// add_btn.addEventListener("click", function () {
//     add_form();
//     let layout_num=document.querySelector(".companyback_layout");
//     // console.log(layout_num);
//     rearrange();
// })


// 新增form表單(按鈕)
// function add_form() {
//     let i = 0;
//     let org_asideclass = "companyback_layout";
//     // console.log(org_asideclass);
//     // if(i%3==0){
//         //     org_asideclass="companyback_layout orange";
//         // }else if(i%3==2){
//             //     org_asideclass="companyback_layout blue";
//     // }
//     let str =     
//     `       
//     <form action="#" class="companyback_form">
//     <!-- icon -->
//     <aside class="${org_asideclass}">${i++}</aside>
//     <ol class="companyback_icon">
//     <li><a><i class="fa-regular fa-pen-to-square"></i></a></li>
//     <li> <a><i class="fa-regular fa-trash-can"></i></a></li>
//     </ol>
//     <div class="field pt-45">
//     <h2>技術名稱 :</h2>
//     <input type="text" id="email" required autocomplete="off" class="" />
//     <label for="email" title="Skill name" data-title="技術名稱"></label>
//     </div>
//     <div class="field pt-45">
//     <h2>技術網址 :</h2>
//     <input type="text" id="password" required autocomplete="off" />
//     <label for="password" title="Skill address" data-title="技術網址"></label>
//     </div>
//     <a class="companyback_save btn_company_back">儲存</a>
//     </form>
//     `;
//     let add_btn = document.querySelector(".companyback_add");
//     add_btn.insertAdjacentHTML("beforebegin",str);
//     // rearrColor();
//     rearrange();
// }

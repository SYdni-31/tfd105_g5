// =====datdtable=====
$(document).ready( function () {
    Vue.component('datatable',{
        template:`
        <article class="-margin0auto pt-10 table_outer">
        <button class="backstage_add backstage_btn backstage_btn_add mb-15">新增</button>
        <h3 class="bg-color pall-15">講師介紹</h3>
        <table id="table" class="table"></table>
        </article>`,
        mounted: function () {
            $('#table').DataTable({
                "lengthMenu": [10, 20],
                "dom": `<'row'<'col-6'l><'col-6'f>>
                        <'row'<'col-12'tr>>
                        <'row'<'col-5'i><'col-7'p>>`,
                "language": {
                    "processing": "處理中...",
                    "loadingRecords": "載入中...",
                    "lengthMenu": "顯示 _MENU_ 項結果",
                    "zeroRecords": "沒有符合的結果",
                    "info": "顯示第 _START_ 至 _END_ 項結果，共 _TOTAL_ 項",
                    "infoEmpty": "顯示第 0 至 0 項結果，共 0 項",
                    "infoFiltered": "(從 _MAX_ 項結果中過濾)",
                    "infoPostFix": "",
                    "search": "搜尋欄位:",
                    "paginate": {
                        "first": "第一頁",
                        "previous": "上一頁",
                        "next": "下一頁",
                        "last": "最後一頁"
                    },
                    "aria": {
                        "sortAscending": ": 升冪排列",
                        "sortDescending": ": 降冪排列"
                    },   
                },
                "data":[
                    [
                        1,
                        "Tián lám 2022智慧全球科技聚策展",
                        "2022/03/17",
                        "進行中",
                        `<div class="backstage_btn_td"><button class="backstage_btn backstage_btn_short">修改</button><button class="backstage_btn backstage_btn_bad ml-4">刪除</button></div>`,
                        
                    ],
                    [
                        2,
                        "台北科技展",
                        "2022/03/18",
                        "已結束",
                        `<div class="backstage_btn_td"><button class="backstage_btn backstage_btn_short">修改</button><button class="backstage_btn backstage_btn_bad ml-4">刪除</button></div>`,
                        
                    ]],
                "columns": [
                  { title: "策展" },
                  { title: "策展名稱" },
                  { title: "活動開始" },
                  { title: "狀態" },
                  { title: "操作" },
                ]
            });
            // 拉動頁面時的
            $(window).on('resize', function(){
                location.reload()
            })
          }
    })
    
    new Vue({
        el:"#page",
        data() {
            return {
                aside_btn: false,
            };
          },
        methods: {
        aside_toggle() {
            this.aside_btn = !this.aside_btn
        }
        },
    })
    
//     var table= $('#table').DataTable({
//         "lengthMenu": [10, 20],
//         "dom": `<'row'<'col-6'l><'col-6'f>>
//                 <'row'<'col-12'tr>>
//                 <'row'<'col-5'i><'col-7'p>>`,
//         "language": {
//             "processing": "處理中...",
//             "loadingRecords": "載入中...",
//             "lengthMenu": "顯示 _MENU_ 項結果",
//             "zeroRecords": "沒有符合的結果",
//             "info": "顯示第 _START_ 至 _END_ 項結果，共 _TOTAL_ 項",
//             "infoEmpty": "顯示第 0 至 0 項結果，共 0 項",
//             "infoFiltered": "(從 _MAX_ 項結果中過濾)",
//             "infoPostFix": "",
//             "search": "搜尋欄位:",
//             "paginate": {
//                 "first": "第一頁",
//                 "previous": "上一頁",
//                 "next": "下一頁",
//                 "last": "最後一頁"
//             },
//             "aria": {
//                 "sortAscending": ": 升冪排列",
//                 "sortDescending": ": 降冪排列"
//             },   
//         },
//         "data": dataset,
//         "columns": [
//           { title: "策展" },
//           { title: "策展名稱" },
//           { title: "活動開始" },
//           { title: "狀態" },
//           { title: "操作" },
//         ]
//     });
//     // 拉動頁面時的
//     $(window).on('resize', function(){
//         location.reload()
//     })
});

// =====按鈕開關menu=====
// let backstage_aside_btn = document.getElementsByClassName("backstage_aside_btn")
// for(let i =0; i<backstage_aside_btn.length; i++){
//     backstage_aside_btn[i].addEventListener("click", function(){
//         let aside = document.getElementsByClassName("backstage_menu")[0];
//         aside.classList.toggle("-backstage_aside_on");
//     })
// }


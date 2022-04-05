// =====datdtable=====
$(document).ready( function () {
    var dataset = [
        [
            1,
            "台積電股份有限公司",
            "2022/03/17 13:00",
            "2022/03/17 13:00",
            `<div class="backstage_btn_td">
                <div class="custom-control custom-switch switch_flex">
                    不通過
                    <div class="custom-control custom-switch">   
                        <input type="checkbox" class="custom-control-input" id="customSwitch1">
                        <label class="custom-control-label" for="customSwitch1"></label>
                    </div>
                    通過
                </div> 
            </div>`,
            `<div class="backstage_btn_td"><button class="backstage_btn backstage_btn_short">修改</button><button class="backstage_btn backstage_btn_bad ml-4">刪除</button></div>`,
            
        ],
        [
            2,
            "台積電股份有限公司",
            "2022/03/17 13:00",
            "2022/03/17 13:00",
            `<div class="backstage_btn_td">
                <div class="custom-control custom-switch switch_flex">
                    不通過
                    <div class="custom-control custom-switch">   
                        <input type="checkbox" class="custom-control-input" id="customSwitch1">
                        <label class="custom-control-label" for="customSwitch1"></label>
                    </div>
                    通過
                </div> 
            </div>`,
            `<div class="backstage_btn_td"><button class="backstage_btn backstage_btn_short">修改</button><button class="backstage_btn backstage_btn_bad ml-4">刪除</button></div>`,
            
        ]
    ];
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
        "data": dataset,
        "columns": [
          { title: "直播ID" },
          { title: "廠商名稱" },
          { title: "開始時間" },
          { title: "申請時間" },
          { title: "狀態" },
          { title: "操作" },

        ]
    });
});

// =====按鈕開關menu=====
let backstage_aside_btn = document.getElementsByClassName("backstage_aside_btn")
for(let i =0; i<backstage_aside_btn.length; i++){
    backstage_aside_btn[i].addEventListener("click", function(){
        let aside = document.getElementsByClassName("backstage_menu")[0];
        aside.classList.toggle("-backstage_aside_on");
    })
}

// =====vue=====



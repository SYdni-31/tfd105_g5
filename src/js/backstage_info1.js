// =====datdtable=====

$(document).ready( function () {
    Vue.component('backstage_info1_edit',{
        props:['data'],
        data(){
            return{
                redio:this.data[3],
            }
        },
        methods: {
            f_save(){
                this.$swal({
                    title: "儲存成功",
                    icon: "success",
                    image: "",
                  }).then((willInsert) => {
                      this.$emit('close',null)
                    })
            },
            f_close(){
                this.$swal({
                    title: "尚未存檔，是否關閉?",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                  }).then((willInsert) => {
                      if(willInsert){
                        this.$emit('close',null)
                      }
                  })
            },
        },
        template:`
        <article class="backstage_box backstage_info1_edit">
                <h2>修改</h2>
                <div class="backstage_box-content pt-30">
                    <ul>
                        <li class="mb-16 input-short"><label for="name">策展ID</label>
                            <input type="text" name="name" id="name" :value="data[0]" disabled>
                        </li>
                        <li class="mb-16 input-short"><label for="introduce">展會名稱</label>
                            <input type="text" name="introduce" id="introduce" :value="data[1]">
                        </li>
                        <li class="mb-16 input-long"><label for="time">會議簡介</label>
                            <textarea name="time" id="time" cols="30" rows="10" :value="data[4]"></textarea>
                        <li class="mb-16 input-short"><label for="startdate">活動開始</label>
                            <input type="date" name="date" id="startdate"  :value="data[2]">
                        </li>
                        <li class="mb-16 input-short"><label for="enddate">活動結束</label>
                            <input type="date" name="date" id="enddate"  :value="data[5]">
                        </li>
                        <div class="mb-16 input-short"><label>進行狀態</label><br>
                            <label for="notwork"><input type="radio" name="date" id="notwork"  value="尚未開始" v-model="redio">尚未開始</label>
                            <label for="working"><input type="radio" name="date" id="working"  value="進行中" v-model="redio">進行中</label>
                            <label for="worked"><input type="radio" name="date" id="worked"  value="已結束" v-model="redio">已結束</label>
                        </div>
                    </ul>                   
                    <div class="back-insert-btn">
                        <button class="back-insert_save" @click="f_save">儲存</button>
                        <button class="back-insert_close" @click="f_close">關閉</button>
                    </div>
                </div>
            </article>`,
        
    })
    Vue.component('backstage_info1_add',{
        methods: {
            f_save(){
                this.$swal({
                    title: "儲存成功",
                    icon: "success",
                    image: "",
                }).then((willInsert) => {
                    this.$emit('close',null)
                })
            },
            f_close(){
                this.$swal({
                    title: "尚未存檔，是否關閉?",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                  }).then((willInsert) => {
                      if(willInsert){
                        this.$emit('close',null)
                      }
                  })
            },
        },
        template:`
        <article class="backstage_box backstage_info1_add">
                <h2>新增</h2>
                <div class="backstage_box-content pt-30">
                    <ul>
                        <li class="mb-16 input-short"><label for="name">策展ID</label>
                            <input type="text" name="name" id="name">
                        </li>
                        <li class="mb-16 input-short"><label for="introduce">展會名稱</label>
                            <input type="text" name="introduce" id="introduce">
                        </li>
                        <li class="mb-16 input-long"><label for="time">會議簡介</label>
                            <textarea name="time" id="time" cols="30" rows="10"></textarea>
                        <li class="mb-16 input-short"><label for="startdate">活動開始</label>
                            <input type="date" name="date" id="startdate">
                        </li>
                        <li class="mb-16 input-short"><label for="enddate">活動結束</label>
                            <input type="date" name="date" id="enddate">
                        </li>
                        <div class="mb-16 input-short"><label>進行狀態</label><br>
                            <label for="notwork"><input type="radio" name="date" id="notwork" value="尚未開始">尚未開始</label>
                            <label for="working"><input type="radio" name="date" id="working" value="進行中">進行中</label>
                            <label for="worked"><input type="radio" name="date" id="worked" value="已結束">已結束</label>
                        </div>
                    </ul>                   
                    <div class="back-insert-btn">
                        <button class="back-insert_save" @click="f_save">儲存</button>
                        <button class="back-insert_close" @click="f_close">關閉</button>
                    </div>
                </div>
            </article>`,
        
    })
    Vue.component('datatable',{
        data(){
            return{
                box_add:null,
                row_data:null,
            }
        },
        methods:{
            edit(data){
                this.row_data=data
                this.box_add="backstage_info1_edit"
            }
        },
        template:`
        <article class="-margin0auto pt-10 table_outer">
        <button @click="box_add='backstage_info1_add'" class="backstage_add backstage_btn backstage_btn_add mb-15">新增</button>
        <h3 class="bg-color pall-15">講師介紹</h3>
        <table id="table" class="table"></table>
        <component :is="box_add" @close="box_add=null" :data="row_data"></component>
        </article>`,
        mounted: function () {
            let vm = this
            let table=$('#table').DataTable({
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
                        "2022-03-17",
                        "進行中",
                        "會議簡介1",
                        "2022-03-20",
                        // `<div class="backstage_btn_td"><button class="backstage_btn backstage_btn_short">修改</button><button class="backstage_btn backstage_btn_bad ml-4">刪除</button></div>`,
                        
                    ],
                    [
                        2,
                        "想不出名字的展會",
                        "2022-03-19",
                        "進行中",
                        "會議簡介2",
                        "2022-03-20",
                        // `<div class="backstage_btn_td"><button class="backstage_btn backstage_btn_short">修改</button><button class="backstage_btn backstage_btn_bad ml-4">刪除</button></div>`,
                        
                    ],
                    [
                        3,
                        "台北科技展",
                        "2022-03-18",
                        "已結束",
                        "會議簡介3",
                        "2022-03-20",
                        // `<div class="backstage_btn_td"><button class="backstage_btn backstage_btn_short">修改</button><button class="backstage_btn backstage_btn_bad ml-4">刪除</button></div>`,
                        
                    ]],
                "columns": [
                    { title: "策展" },
                    { title: "策展名稱" },
                    { title: "活動開始" },
                    { title: "狀態" },
                    {title: "操作",
                        render: function (data, type, row) {
                            return (
                                `<div class="backstage_btn_td">
                                <button type="button" class="backstage_btn backstage_btn_short edt_btn">編輯</button>
                                <button type="button" class="backstage_btn backstage_btn_bad ml-4 del_btn">刪除</button>
                                </div`
                            );
                        },
                    },
                ]
            });
            // 拉動頁面時的
            $(window).on('resize', function(){
                location.reload()
            })
            // 修改
            $("#table tbody").on("click", ".edt_btn", function () {
                var data = table.row($(this).parents("tr")).data();
                // data[0]是第1筆以此類推
                vm.edit(data)
            });
            // 刪除
            $("#table tbody").on("click", ".del_btn", function () {
                swal({
                    title: "是否確定刪除?",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                })
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
            },
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


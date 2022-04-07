// ========info1_展覽場次_修改按鈕========
    Vue.component('backstage_info1_edit',{
        props:['row_data', 'row_index'],
        data(){
            return{
                newdata:'',
            }
        },
        methods: {
            f_save(){
                this.$swal({
                    title: "儲存成功",
                    icon: "success",
                    image: "",
                }).then((willInsert) => {
                    if(willInsert){
                        this.$emit('close', this.newdata, this.row_index)
                    }
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
                        this.$emit('close')
                    }
                })
            },
        },
        template:`
        <article class="backstage_box">
                <h2>修改</h2>
                <div class="backstage_box-content pt-30">
                    <ul>
                        <li class="mb-16 input-short"><label for="id">策展ID</label>
                            <input type="text" name="id" id="id" v-model="newdata[0]" disabled>
                        </li>
                        <li class="mb-16 input-short"><label for="name">展會名稱</label>
                            <input type="text" name="name" id="name" v-model="newdata[1]">
                        </li>
                        <li class="mb-16 input-long"><label for="introduce">會議簡介</label>
                            <textarea name="introduce" id="introduce" cols="30" rows="10" v-model="newdata[5]"></textarea>
                        </li>
                        <li class="mb-16 input-short"><label for="starttime">活動開始</label>
                            <input type="date" name="starttime" id="starttime" v-model="newdata[2]">
                        </li>
                        <li class="mb-16 input-short"><label for="endtime">活動結束</label>
                            <input type="date" name="endtime" id="endtime" v-model="newdata[3]">
                        </li>
                        <div class="mb-16"><label>進行狀態</label><br>
                            <label for="notwork"><input type="radio" name="open" id="notwork"  value="尚未開始" v-model="newdata[4]">尚未開始</label>
                            <label for="working"><input type="radio" name="open" id="working"  value="進行中" v-model="newdata[4]">進行中</label>
                            <label for="worked"><input type="radio" name="open" id="worked"  value="已結束" v-model="newdata[4]">已結束</label>
                        </div>
                    </ul>                  
                    <div class="back-insert-btn">
                        <button class="back-insert_save" @click="f_save">儲存</button>
                        <button class="back-insert_close" @click="f_close">關閉</button>
                    </div>
                </div>
            </article>`,
        created () {
            this.newdata = JSON.parse(JSON.stringify(this.row_data)) 
            },
    })
// ========info1_展覽場次_後台新增按鈕========
    Vue.component('backstage_info1_add',{
        data(){
            return{
                newdata:[],
            }
        },
        methods: {
            f_save(){
                this.$swal({
                    title: "儲存成功",
                    icon: "success",
                    image: "",
                }).then((willInsert) => {
                    this.$emit('close')
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
                        this.$emit('close')
                      }
                  })
            },
        },
        template:`
        <article class="backstage_box">
                <h2>新增</h2>
                <div class="backstage_box-content pt-30">
                    <ul>
                        <li class="mb-16 input-short"><label for="id">策展ID</label>
                            <input type="text" name="id" id="id">
                        </li>
                        <li class="mb-16 input-short"><label for="name">展會名稱</label>
                            <input type="text" name="name" id="name">
                        </li>
                        <li class="mb-16 input-long"><label for="introduce">會議簡介</label>
                            <textarea name="introduce" id="introduce" cols="30" rows="10"></textarea>
                        </li>
                        <li class="mb-16 input-short"><label for="starttime">活動開始</label>
                            <input type="date" name="starttime" id="starttime">
                        </li>
                        <li class="mb-16 input-short"><label for="endtime">活動結束</label>
                            <input type="date" name="endtime" id="endtime">
                        </li>
                        <div class="mb-16"><label>進行狀態</label><br>
                            <label for="notwork"><input type="radio" name="open" id="notwork" value="尚未開始">尚未開始</label>
                            <label for="working"><input type="radio" name="open" id="working" value="進行中">進行中</label>
                            <label for="worked"><input type="radio" name="open" id="worked" value="已結束">已結束</label>
                        </div>
                    </ul>                   
                    <div class="back-insert-btn">
                        <button class="back-insert_save" @click="f_save">儲存</button>
                        <button class="back-insert_close" @click="f_close">關閉</button>
                    </div>
                </div>
            </article>`,
        
    })
// ========info1_展覽場次_table========
    Vue.component('datatable',{
        data(){
            return{
                box:null,
                titles:["策展ID", "策展名稱", "活動開始", "狀態", "操作"],
                datas:[
                    [
                        1,
                        "Tián lám 2022智慧全球科技聚策展",
                        "2022-03-17",
                        "2022-03-20",
                        "進行中",
                        "會議簡介1",
                    ],
                    [
                        2,
                        "想不出名字的展會",
                        "2022-03-19",
                        "2022-03-20",
                        "進行中",
                        "會議簡介2",
                    ],
                    [
                        3,
                        "台北科技展",
                        "2022-03-18",
                        "2022-03-20",
                        "已結束",
                        "會議簡介3",
                    ]],
                row_data:null,
                row_index:null,
            }
        },
        methods:{
            edit(data, index){
                this.row_data=data
                this.row_index=index
                this.box='backstage_info1_edit'
            },
            del(index){
                swal({
                    title: "是否確定刪除?",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                }).then((willDelete) => {
                    if (willDelete) {
                        this.datas.splice(index, 1)
                        swal({
                            title: "刪除成功",
                            icon: "success",
                        });
                    }
                })
            },
            editclose(newdata, index){
                this.datas[index]=newdata
                this.box=null
            }
        },
        template:`
        <article class="-margin0auto pt-10 table_outer">
            <button @click="box='backstage_info1_add'" class=" backstage_btn backstage_btn_add mb-15">新增</button>
            <h3 class="bg-color pall-15">講師介紹</h3>
            <div class="pt-10 pb-10 bg-in-bgcolor">
                <ul class="bg-color -margin0auto backstage-grid title backstage-grid_info1">
                    <li class="bg-color bg-in-secondcolor" v-for="title in titles">{{title}}</li>
                </ul>
                <ul class="bg-color -margin0auto backstage-grid backstage-grid_info1" v-for="(data, index) in datas">
                    <li class="bg-color bg-in-secondcolor">{{data[0]}}</li>
                    <li class="bg-color bg-in-secondcolor">{{data[1]}}</li>
                    <li class="bg-color bg-in-secondcolor">{{data[2]}}</li>
                    <li class="bg-color bg-in-secondcolor">{{data[4]}}</li>
                    <li class="bg-color bg-in-secondcolor"><div class="backstage_btn_td"><button @click="edit(data, index)" class="backstage_btn backstage_btn_short">修改</button><button @click="del(index)" class="backstage_btn backstage_btn_bad ml-4">刪除</button></div></li>
                </ul>
            </div>
            <component :is="box" @close="editclose" :row_data="row_data" :row_index="row_index"></component>
        </article>`,
        mounted: function () {}        
    })

// ========頁面vue========
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
    


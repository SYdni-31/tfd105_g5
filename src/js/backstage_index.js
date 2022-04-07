    Vue.component('backstage_info1_edit',{
        props:['row_data'],
        data(){
            return{
                redio:this.row_data[3],
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
        <article class="backstage_box">
                <h2>修改</h2>
                <div class="backstage_box-content pt-30">
                    <ul>
                        <li class="mb-16 input-short"><label for="name">策展ID</label>
                            <input type="text" name="name" id="name" :value="row_data[0]" disabled>
                        </li>
                        <li class="mb-16 input-short"><label for="introduce">展會名稱</label>
                            <input type="text" name="introduce" id="introduce" :value="row_data[1]">
                        </li>
                        <li class="mb-16 input-long"><label for="time">會議簡介</label>
                            <textarea name="time" id="time" cols="30" rows="10" :value="row_data[4]"></textarea>
                        <li class="mb-16 input-short"><label for="startdate">活動開始</label>
                            <input type="date" name="date" id="startdate"  :value="row_data[2]">
                        </li>
                        <li class="mb-16 input-short"><label for="enddate">活動結束</label>
                            <input type="date" name="date" id="enddate"  :value="row_data[5]">
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
        <article class="backstage_box">
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
                            <input type="date" name="startdate" id="startdate">
                        </li>
                        <li class="mb-16 input-short"><label for="enddate">活動結束</label>
                            <input type="date" name="enddate" id="enddate">
                        </li>
                        <div class="mb-16 input-short"><label>進行狀態</label><br>
                            <label for="notwork"><input type="radio" name="work" id="notwork" value="尚未開始">尚未開始</label>
                            <label for="working"><input type="radio" name="work" id="working" value="進行中">進行中</label>
                            <label for="worked"><input type="radio" name="work" id="worked" value="已結束">已結束</label>
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
                box:null,
                titles:["策展ID", "策展名稱", "活動開始", "狀態", "操作"],
                datas:[
                    [
                        1,
                        "Tián lám 2022智慧全球科技聚策展",
                        "2022-03-17",
                        "進行中",
                        "會議簡介1",
                        "2022-03-20",
                    ],
                    [
                        2,
                        "想不出名字的展會",
                        "2022-03-19",
                        "進行中",
                        "會議簡介2",
                        "2022-03-20",
                    ],
                    [
                        3,
                        "台北科技展",
                        "2022-03-18",
                        "已結束",
                        "會議簡介3",
                        "2022-03-20",
                    ]],
                row_data:null,
            }
        },
        methods:{
            edit(data){
                console.log(data)
                this.row_data=data
                this.box='backstage_info1_edit'
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
                <ul class="bg-color -margin0auto backstage-grid backstage-grid_info1" v-for="data in datas">
                    <li class="bg-color bg-in-secondcolor">{{data[0]}}</li>
                    <li class="bg-color bg-in-secondcolor">{{data[1]}}</li>
                    <li class="bg-color bg-in-secondcolor">{{data[2]}}</li>
                    <li class="bg-color bg-in-secondcolor">{{data[3]}}</li>
                    <li class="bg-color bg-in-secondcolor"><div class="backstage_btn_td"><button @click="edit(data)" class="backstage_btn backstage_btn_short">修改</button><button class="backstage_btn backstage_btn_bad ml-4">刪除</button></div></li>
                </ul>
            </div>
            <component :is="box" @close="box=null" :row_data="row_data"></component>
        </article>`,
        mounted: function () {

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
    


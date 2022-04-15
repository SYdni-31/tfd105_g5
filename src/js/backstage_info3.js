// ========info3_展覽場次_修改按鈕========
Vue.component('backstage_info3_edit',{
    props:['row_data'],
    data(){
        return{
            newdata:'',
        }
    },
    methods: {
        f_save(){ //判定欄位是否空值有沒有存在自己改!!!
            if(this.newdata.NAME && this.newdata.NAME !=""
            && this.newdata.TITLE && this.newdata.TITLE !=""
            && this.newdata.END_TIME && this.newdata.END_TIME !=""
            && this.newdata.OPEN && this.newdata.OPEN !=""
            && this.newdata.INTRODUCE && this.newdata.INTRODUCE !=""){
            // 確認所有欄位是否都有值
                // 確認開始日期是否小於結束日期  我們應該不需要不用直接刪除
                let starttime= (this.newdata.TITLE).split('-').join('')
                let endtime= (this.newdata.END_TIME).split('-').join('')
                if(starttime<=endtime){
                    console.log(starttime, endtime)
                    fetch('php/backstage_info3_update_expo.php', { //一定要再fetch一次
                        method: 'POST',
                        headers:{
                            'Content-Type': 'application/json'
                        },
                        body:JSON.stringify({   //自己頁面傳出去
                            ID:this.newdata.ID,
                            NAME:this.newdata.NAME,
                            TITLE:this.newdata.TITLE,
                            END_TIME:this.newdata.END_TIME,
                            OPEN:this.newdata.OPEN,
                            INTRODUCE:this.newdata.INTRODUCE,
                        })
                    }).then(resp =>resp.json())
                    .then(body =>{
                        let {successful} =body
                        if(successful){
                            this.$swal({
                                title: "儲存成功",
                                icon: "success",
                                image: "",
                            }).then((willInsert) => {
                                this.$emit('addsave')
                            })
                        }else{
                            this.$swal({
                                title: "儲存失敗",
                                icon: "error",
                                text: "請檢查欄位",
                            });
                        } 
                    })
                }else{
                    this.$swal({
                        title: "儲存失敗",
                        icon: "error",
                        text: "請確認日期是否正確",
                    });
                }
            }else{
                this.$swal({
                    title: "儲存失敗",
                    icon: "error",
                    text: "所有欄位皆須填寫",
                });
            }
        },
        f_close(){
            this.$swal({
                title: "尚未存檔，是否關閉?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then((willInsert) => {
                if(willInsert){
                    this.$emit('editclose')
                }
            })
        },
    },
    template:`
    <article class="backstage_box">
        <h2>修改<i @click="f_close" class="fa-regular fa-circle-xmark backstage_close_icon"></i></h2>
        <div class="backstage_box-content pt-30"> 
            <ul>
                <li class="mb-16 input-short"><label for="ID">ID</label>
                    <input type="text" name="ID" id="ID" v-model="newdata.ID" disabled>
                </li>
                <li class="mb-16 input-short"><label for="NAME">展會名稱</label>
                    <input type="text" name="NAME" id="NAME" v-model="newdata.NAME">
                </li>
                <li class="mb-16 input-long"><label for="INTRODUCR">會議簡介</label>
                    <textarea name="INTRODUCR" id="INTRODUCR" cols="30" rows="10" v-model="newdata.INTRODUCR"></textarea>
                </li>
                <li class="mb-16 input-short"><label for="TITLE">活動開始</label>
                    <input type="date" name="TITLE" id="TITLE" v-model="newdata.TITLE">
                </li>
                <li class="mb-16 input-short"><label for="END_TIME">活動結束</label>
                    <input type="date" name="END_TIME" id="END_TIME" v-model="newdata.END_TIME">
                </li>
                <div class="mb-16"><label>進行狀態</label><br>
                    <label for="notwork"><input type="radio" name="OPEN" id="notwork"  value="尚未開始" v-model="newdata.OPEN">尚未開始</label>
                    <label for="working"><input type="radio" name="OPEN" id="working"  value="進行中" v-model="newdata.OPEN">進行中</label>
                    <label for="worked"><input type="radio" name="OPEN" id="worked"  value="已結束" v-model="newdata.OPEN">已結束</label>
                </div>
            </ul>                  
            <div class="backstage-insert-btn">
                <button class="backstage-insert_save" @click="f_save">儲存</button>
                <button class="backstage-insert_close" @click="f_close">關閉</button>
            </div>
        </div>
    </article>`,
    created () {
        this.newdata = JSON.parse(JSON.stringify(this.row_data)) 
    },
})
// ========info3_展覽場次_後台新增按鈕========
Vue.component('backstage_info3_add',{
    data(){
        return{
            newdata:{},
        }
    },
    methods: {
        f_save(){
            if(this.newdata.TITLE && this.newdata.TITLE !=""
            && this.newdata.CONTENT && this.newdata.CONTENT !=""
            && this.newdata.PHOTO && this.newdata.PHOTO !=""
            && this.newdata.LINK && this.newdata.LINK !=""
            && this.newdata.TIME && this.newdata.TIME !=""
            && this.newdata.STATUS && this.newdata.STATUS !=""){
            // 確認所有欄位是否都有值 
                // 確認開始日期是否小於結束日期
                let starttime= (this.newdata.TITLE).split('-').join('')
                let endtime= (this.newdata.END_TIME).split('-').join('')
                if(starttime<=endtime){
                    fetch('php/backstage_info3_insert_expo.php', {
                        method: 'POST',
                        headers:{
                            'Content-Type': 'application/json'
                        },
                        body:JSON.stringify({
                            NAME:this.newdata.NAME,
                            TITLE:this.newdata.TITLE,
                            END_TIME:this.newdata.END_TIME,
                            OPEN:this.newdata.OPEN,
                            INTRODUCE:this.newdata.INTRODUCE,
                        })
                    }).then(resp =>resp.json())
                    .then(body =>{
                        let {successful} =body
                        if(successful){
                            this.$swal({
                                title: "儲存成功",
                                icon: "success",
                                image: "",
                            }).then((willInsert) => {
                                this.$emit('addsave')
                            })
                        }else{
                            this.$swal({
                                title: "儲存失敗",
                                icon: "error",
                                text: "請檢查欄位",
                            });
                        } 
                    })
                }else{
                    this.$swal({
                        title: "儲存失敗",
                        icon: "error",
                        text: "請確認日期是否正確",
                    });
                }
            }else{
                this.$swal({
                    title: "儲存失敗",
                    icon: "error",
                    text: "所有欄位皆須填寫",
                });
            }
        },
        f_close(){
            this.$swal({
                title: "尚未存檔，是否關閉?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              }).then((willInsert) => {
                  if(willInsert){
                    this.$emit('addclose')
                  }
              })
        },
    },
    template:`
    <article class="backstage_box">
        <h2>新增<i @click="f_close" class="fa-regular fa-circle-xmark backstage_close_icon"></i></h2>
        <div class="backstage_box-content pt-30">
            <ul>
                <li class="mb-16 input-short"><label for="id">策展ID</label>
                    <input type="text" name="id" id="id" value="自動編號" disabled>
                </li>
                <li class="mb-16 input-short"><label for="TIME">新聞日期</label>
                    <input type="date" name="TIME" id="TIME" v-model.trim="newdata.TIME">
                </li>
                <li class="mb-16 input-long"><label for="CONTENT">新聞內容</label>
                    <textarea name="CONTENT" id="CONTENT" cols="30" rows="10" v-model.trim="newdata.CONTENT"></textarea>
                </li>
                <li class="mb-16 input-long"><label for="TITLE">新聞標題</label>
                    <input type="text" name="TITLE" id="TITLE" v-model="newdata.TITLE">
                </li>
                <li class="mb-16 input-long"><label for="LINK">新聞連結</label>
                    <input type="text" name="LINK" id="LINK" v-model="newdata.END_TIME">
                </li>
                <li class="mb-16 input-short"><label for="END_TIME">新聞照片</label>
                    <input type="date" name="END_TIME" id="END_TIME" v-model="newdata.END_TIME">
                </li>
                <div class="mb-16"><label>審核狀態</label><br>
                    <label for="notwork"><input type="radio" name="OPEN" id="notwork" value="尚未開始" v-model="newdata.OPEN">尚未開始</label>
                    <label for="working"><input type="radio" name="OPEN" id="working" value="進行中" v-model="newdata.OPEN">進行中</label>
                    <label for="worked"><input type="radio" name="OPEN" id="worked" value="已結束" v-model="newdata.OPEN">已結束</label>
                </div>
            </ul>                   
            <div class="backstage-insert-btn">
                <button class="backstage-insert_save" @click="f_save">儲存</button>
                <button class="backstage-insert_close" @click="f_close">關閉</button>
            </div>
        </div>
    </article>`,
    
})
// ========info3_新聞資訊_table========
Vue.component('backstage_info3',{
    props:['tablename'],
    data(){   // 變數放這裡! 
        return{ 
            box:null, //判斷要打開的彈窗
            titles:["ID", "新聞標題", "連結", "狀態", "操作"], //改自己頁面title 新聞標題
            datas:'', //每一頁的所有資料
            data_count:'', //資料庫的資料組數
            pages:1,//總共有的頁數，目前所在的頁數
            perpage:10, //每頁顯示幾筆
            inpage:1, //當前頁數
            centersize:5, // 過多頁數時顯示筆數
            row_data:null, //被選取那列的資料
            row_index:null, //被選取那列的序號
        }
    },
    methods:{   //函數方法大部分放這
        edit(data, index){
            this.row_data=data
            this.row_index=index
            this.box='backstage_info3_edit'
        },
        del(index){
            swal({
                title: "是否確定刪除?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then((willDelete) => {
                if (willDelete) {
                    fetch('php/backstage_info3_delete_expo.php', {
                        method: 'POST', //傳到php
                        headers:{
                            'Content-Type': 'application/json'
                        },
                        body:JSON.stringify({
                            ID:this.datas[index].ID,
                        })
                    }).then(resp =>resp.json())//接收
                    .then(body =>{
                        let {successful} =body
                        if(successful){
                            this.$swal({
                                title: "刪除成功",
                                icon: "success",
                                image: "",
                            }).then((willDelete) => {
                                fetch('php/backstage_info3_select_expo.php')//刪除成功強制再執行一次select.php
                                .then(resp =>resp.json())
                                .then(resp =>this.datas=resp)
                            })
                        }else{
                            this.$swal({
                                title: "刪除失敗",
                                icon: "error",
                                text: "請檢查欄位",
                            });
                        } 
                    })
                }
            })
        },
        editclose(){
            this.box=null
        },
        editsave(){
            this.box=null
            this.ajax(this.inpage)
        },
        addclose(){
            this.box=null
        },
        addsave(){
            this.box=null
            this.ajax(this.inpage)
        },
        changepage(page){
            this.ajax(page)
        },
        previouspage(){
            if(this.inpage>1){
                let inpage=this.inpage-1
                this.ajax(inpage)
            }
        },
        nextpage(){
            if(this.inpage<this.pages){
                let inpage=this.inpage+1
                this.ajax(inpage)
            }
            
        },
        ajax(inpage){  
            fetch('php/backstage_info3_select_expo.php', {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    inpage: inpage,
                    perpage: this.perpage,
                })
            })
            .then(resp =>resp.json())
            .then(resp => {
                this.datas=resp.data
                this.data_count=resp.data_count[0][0]
                this.pages=Math.ceil(this.data_count/this.perpage)
                this.inpage=inpage
            })
        }
    },
    computed:{ //函數方法也可以放這，但是放在這裡的函數不能傳參數  用寫小(),一定要有傳回值
        centerPages(){
            let centerPage=this.inpage;
            if(this.inpage>this.pages-3){
                centerPage=this.pages-3
            }
            if(this.inpage<4){
                centerPage=4
            }
            if(this.pages<=this.centersize+2){
                const centerArr=[]
                for(let i=2; i<this.pages; i++){
                    centerArr.push(i)
                }
                return centerArr
            }else{
                const centerArr=[]
                for(let i=centerPage-2; i<=centerPage+2; i++){
                    centerArr.push(i)
                }
                return centerArr
            }
        }
    },
    //以下要改
    template:`
    <article class="-margin0auto pt-10 pb-10 table_outer">
        <button @click="box='backstage_info3_add'" class=" backstage_btn backstage_btn_add mb-15">新增</button>
        <h3 class="bg-color pall-15">{{tablename}}</h3>
        <div class="pall-10 bg-in-bgcolor">
            <ul class="bg-color -margin0auto backstage-grid title backstage-grid_info3">
                <li class="bg-color bg-in-secondcolor" v-for="title in titles">{{title}}</li>
            </ul>
            <ul class="bg-color -margin0auto backstage-grid backstage-grid_info3" v-for="(data, index) in datas">
                <li class="bg-color bg-in-secondcolor">{{data.ID}}</li>
                <li class="bg-color bg-in-secondcolor">{{data.TITLE}}</li>
                <li class="bg-color bg-in-secondcolor">{{data.LINK}}</li>
                <li class="bg-color bg-in-secondcolor">{{data.STATUS}}</li>
                <li class="bg-color bg-in-secondcolor"><div class="backstage_btn_td"><button @click="edit(data, index)" class="backstage_btn backstage_btn_short">修改</button><button @click="del(index)" class="backstage_btn backstage_btn_bad ml-4">刪除</button></div></li>
            </ul>
            <div class='backstage_pages mt-10'>
                <button class='backstage_pages_btn_left mr-2'  @click.stop="previouspage">上一頁</button>
                <button @click.prevent='changepage(1)' class='backstage_pages_btn pr-2 pl-2' :class="{'action':inpage==1}">1</button>
                <button v-if="pages>centersize+2 && inpage-centersize/2-1>1" class='backstage_pages_btn pr-2 pl-2'>...</button>
                <button v-for='(page,index) in centerPages' @click.prevent='changepage(page)' class='backstage_pages_btn pr-2 pl-2' :class="{'action':inpage==page}" :key="index">{{page}}</button>
                <button v-if="pages>centersize+2 && inpage+centersize/2+1<pages" class='backstage_pages_btn pr-2 pl-2'>...</button>
                <button @click.prevent='changepage(pages)' class='backstage_pages_btn pr-2 pl-2' :class="{'action':inpage==pages}">{{pages}}</button>
                <button class='backstage_pages_btn_right ml-2' @click.stop="nextpage">下一頁</button>
            </div> 
        </div>
        <component :is="box" @editclose="editclose" @editsave="editsave" @addclose="addclose" @addsave="addsave" :row_data="row_data"></component>
    </article>`,
    mounted(){
        fetch('php/backstage_info3_select_expo.php', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                inpage: this.inpage,
                perpage: this.perpage,
            })
        })
        .then(resp =>resp.json())
        .then(resp => {
            this.datas=resp.data
            this.data_count=resp.data_count[0][0]
            this.pages=Math.ceil(this.data_count/this.perpage) 
        })
    },
})
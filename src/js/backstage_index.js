// ========info2_大會講師_修改按鈕========
    Vue.component('backstage_info2_edit',{
        props:['row_data'],
        data(){
            return{
                newdata:'',
                image: "",
                file_name: "",
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
                        this.$emit('editsave', this.newdata)
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
                        this.$emit('editclose')
                    }
                })
            },
            choosephoto(){
                let filechoose= document.querySelector(".filechoose")
                filechoose.click()
            },
            selectedFile(e) {
                let file = e.target.files[0];
                let readFiles = new FileReader();
                readFiles.readAsDataURL(file);
                readFiles.addEventListener("load", this.loadImage);
                this.file_name = file.name;
                this.newdata[9] = URL.createObjectURL(file)
            },
            loadImage(e) {
            this.image = e.target.result;
            },
        },
        template:`
        <article class="backstage_box">
                    <h2>修改<i @click="f_close" class="fa-regular fa-circle-xmark backstage_close_icon"></i></h2>
                    <div class="backstage_box-content pt-30">
                        <ul>
                            <li class="mb-16 input-short"><label for="id">議程ID</label>
                                <input type="text" name="id" id="id" v-model="newdata[0]" disabled>
                            </li>
                            <li class="mb-16 input-short"><label for="date">議程日期</label>
                                <input type="date" name="date" id="date" v-model="newdata[1]">
                            </li>
                            <li class="mb-16 input-short"><label for="starttime">開始時間</label>
                            <input type="time" name="starttime" id="starttime" v-model="newdata[2]">
                            </li>
                            <li class="mb-16 input-short"><label for="endtime">結束時間</label>
                                <input type="time" name="endtime" id="endtime" v-model="newdata[3]">
                            </li>
                            <li class="mb-16 input-short"><label for="theme">主題</label>
                            <input type="text" name="theme" id="theme" v-model="newdata[4]">
                            </li>
                            <li class="mb-16 input-short"><label for="name">講師名稱</label>
                            <input type="text" name="name" id="name" v-model="newdata[8]">
                            </li>
                            <li class="mb-16 input-long"><label for="link">直播連結</label>
                            <input type="text" name="link" id="link" v-model="newdata[5]">
                            </li>
                            <li class="mb-16 input-long"><label for="introduce">講師介紹</label>
                                <textarea name="introduce" id="introduce" cols="30" rows="10" v-model="newdata[10]"></textarea>
                            </li>
                        </ul> 
                        <div class="mb-16 input-file">
                            <label>講師照片</label>
                            <input type="file" class="filechoose -hide" name="filechoose" id="filechoose" @change="selectedFile">
                            <input type="text" class="filename" name="filename" id="filename" :value="file_name" disabled>
                            <button @click="choosephoto">上傳</button>
                            <div class="backstage_input-file-img">
                                <img id="img" class="img-update" :src="newdata[9]">
                            </div>
                        </div>                  
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
// ========info2_大會講師_後台新增按鈕========
    Vue.component('backstage_info2_add',{
        data(){
            return{
                newdata:[],
                // image: "",
                file_name: "",
            }
        },
        methods: {
            f_save(){
                this.$swal({
                    title: "儲存成功",
                    icon: "success",
                    image: "",
                }).then((willInsert) => {
                    this.$emit('addsave', this.newdata)
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
                        this.$emit('addclose')
                    }
                })
            },
            choosephoto(){
                let filechoose= document.querySelector(".filechoose")
                filechoose.click()
            },
            selectedFile(e) {
                let file = e.target.files[0];
                let readFiles = new FileReader();
                readFiles.readAsDataURL(file);
                readFiles.addEventListener("load", this.loadImage);
                this.file_name = file.name;
                document.querySelector(".backstage_input-file-img").classList.remove('-hide')
              },
              loadImage(e) {
                this.newdata[10] = e.target.result;
              },
        },
        template:`
        <article class="backstage_box">
                <h2>新增<i @click="f_close" class="fa-regular fa-circle-xmark backstage_close_icon"></i></h2>
                <div class="backstage_box-content pt-30">
                    <ul>
                        <li class="mb-16 input-short"><label for="id">議程ID</label>
                            <input type="text" name="id" id="id" v-model="newdata[0]" disabled>
                        </li>
                        <li class="mb-16 input-short"><label for="date">議程日期</label>
                            <input type="date" name="date" id="date" v-model="newdata[1]">
                        </li>
                        <li class="mb-16 input-short"><label for="starttime">開始時間</label>
                        <input type="time" name="starttime" id="starttime" v-model="newdata[2]">
                        </li>
                        <li class="mb-16 input-short"><label for="endtime">結束時間</label>
                            <input type="time" name="endtime" id="endtime" v-model="newdata[3]">
                        </li>
                        <li class="mb-16 input-short"><label for="theme">主題</label>
                        <input type="text" name="theme" id="theme" v-model="newdata[4]">
                        </li>
                        <li class="mb-16 input-short"><label for="name">講師名稱</label>
                        <input type="text" name="name" id="name" v-model="newdata[9]">
                        </li>
                        <li class="mb-16 input-long"><label for="link">直播連結</label>
                        <input type="text" name="link" id="link" v-model="newdata[5]">
                        </li>
                        <li class="mb-16 input-long"><label for="introduce">講師介紹</label>
                            <textarea name="introduce" id="introduce" cols="30" rows="10" v-model="newdata[10]"></textarea>
                        </li>
                    </ul> 
                    <div class="mb-16 input-file">
                        <label>講師照片</label>
                        <input type="file" class="filechoose -hide" name="filechoose" id="filechoose" @change="selectedFile">
                        <input type="text" class="filename" name="filename" id="filename" :value="file_name" disabled>
                        <button @click="choosephoto">上傳</button>
                        <div class="backstage_input-file-img -hide">
                            <img id="img" class="img-update" :src="newdata[9]">
                        </div>
                    </div>                  
                    <div class="backstage-insert-btn">
                        <button class="backstage-insert_save" @click="f_save">儲存</button>
                        <button class="backstage-insert_close" @click="f_close">關閉</button>
                    </div>
                </div>
            </article>`,
        
    })
// ========info2_大會講師_table========
    Vue.component('backstage_info2',{
        props:['tablename'],
        data(){
            return{
                box:null,
                titles:["議程ID", "主題", "議程日期", "講師", "開始時間", "結束時間", "操作"],
                datas:[
                    [
                        1,
                        "2022-04-01",
                        "10:00:00",
                        "11:00:00",
                        "5G智慧生活",
                        "https://www.youtube.com/watch?v=Rtq1ABThn9Y",
                        "I",
                        1,
                        "王大明",
                        "img/sample/speaker_sample.png",
                        "講師介紹1王大明王大明王大明王大明王大明王大明王大明王大明王大明王大明王大明王大明",
                        null,
                        1,
                        null,
                    ],
                    [
                        2,
                        "2022-04-02",
                        "15:00:00",
                        "16:00:00",
                        "科技改變世界",
                        "https://www.youtube.com/watch?v=OkIgQNFne0M",
                        "D",
                        1,
                        "王中明",
                        "img/sample/speaker_sample.png",
                        "講師介紹2王中明王中明王中明王中明王中明王中明王中明王中明王中明王中明王中明王中明王中明王中明",
                        null,
                        1,
                        null,
                    ],
                    [
                        3,
                        "2022-03-18",
                        "11:00:00",
                        "12:00:00",
                        "很長很長很長很長很長很長很長的標題",
                        "https://www.youtube.com/watch?v=OkIgQNFne0M",
                        "U",
                        1,
                        "王小明",
                        "img/sample/speaker_sample.png",
                        "講師介紹2王中明王中明王中明王中明王中明王中明王中明王中明王中明王中明王中明王中明王中明王中明",
                        null,
                        1,
                        null,
                    ]],
                row_data:null,
                row_index:null,
            }
        },
        methods:{
            edit(data, index){
                this.row_data=data
                this.row_index=index
                this.box='backstage_info2_edit'
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
            editclose(){
                this.box=null
            },
            editsave(newdata){
                this.datas[this.row_index]=newdata
                this.box=null
            },
            addclose(){
                this.box=null
            },
            addsave(newdata){
                this.datas.push(newdata)
                this.box=null
            },
        },
        template:`
        <article class="-margin0auto pt-10 table_outer">
            <button @click="box='backstage_info2_add'" class=" backstage_btn backstage_btn_add mb-15">新增</button>
            <h3 class="bg-color pall-15">{{tablename}}</h3>
            <div class="pt-10 pb-10 bg-in-bgcolor">
                <ul class="bg-color -margin0auto backstage-grid title backstage-grid_info2">
                    <li class="bg-color bg-in-secondcolor" v-for="title in titles">{{title}}</li>
                </ul>
                <ul class="bg-color -margin0auto backstage-grid backstage-grid_info2" v-for="(data, index) in datas">
                    <li class="bg-color bg-in-secondcolor">{{data[0]}}</li>
                    <li class="bg-color bg-in-secondcolor">{{data[4]}}</li>
                    <li class="bg-color bg-in-secondcolor">{{data[1]}}</li>
                    <li class="bg-color bg-in-secondcolor">{{data[8]}}</li>
                    <li class="bg-color bg-in-secondcolor">{{data[2].slice(0, 5)}}</li>
                    <li class="bg-color bg-in-secondcolor">{{data[3].slice(0, 5)}}</li>
                    <li class="bg-color bg-in-secondcolor"><div class="backstage_btn_td"><button @click="edit(data, index)" class="backstage_btn backstage_btn_short">修改</button><button @click="del(index)" class="backstage_btn backstage_btn_bad ml-2">刪除</button></div></li>
                </ul>
            </div>
            <component :is="box" @editclose="editclose" @editsave="editsave" @addclose="addclose" @addsave="addsave" :row_data="row_data"></component>
        </article>`,
        mounted: function () {}        
    })
// ========info1_展覽場次_修改按鈕========
    Vue.component('backstage_info1_edit',{
        props:['row_data'],
        data(){
            return{
                newdata:'',
            }
        },
        methods: {
            f_save(){
                if(this.newdata.NAME && this.newdata.NAME !=""
                && this.newdata.START_TIME && this.newdata.START_TIME !=""
                && this.newdata.END_TIME && this.newdata.END_TIME !=""
                && this.newdata.OPEN && this.newdata.OPEN !=""
                && this.newdata.INTRODUCE && this.newdata.INTRODUCE !=""){
                // 確認所有欄位是否都有值
                    // 確認開始日期是否小於結束日期
                    let starttime= (this.newdata.START_TIME).split('-').join('')
                    let endtime= (this.newdata.END_TIME).split('-').join('')
                    if(starttime<=endtime){
                        console.log(starttime, endtime)
                        fetch('php/backstage_info1_update_expo.php', {
                            method: 'POST',
                            headers:{
                                'Content-Type': 'application/json'
                            },
                            body:JSON.stringify({
                                ID:this.newdata.ID,
                                NAME:this.newdata.NAME,
                                START_TIME:this.newdata.START_TIME,
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
                    <li class="mb-16 input-short"><label for="ID">策展ID</label>
                        <input type="text" name="ID" id="ID" v-model="newdata.ID" disabled>
                    </li>
                    <li class="mb-16 input-short"><label for="NAME">展會名稱</label>
                        <input type="text" name="NAME" id="NAME" v-model="newdata.NAME">
                    </li>
                    <li class="mb-16 input-long"><label for="INTRODUCR">會議簡介</label>
                        <textarea name="INTRODUCR" id="INTRODUCR" cols="30" rows="10" v-model="newdata.INTRODUCR"></textarea>
                    </li>
                    <li class="mb-16 input-short"><label for="START_TIME">活動開始</label>
                        <input type="date" name="START_TIME" id="START_TIME" v-model="newdata.START_TIME">
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
// ========info1_展覽場次_後台新增按鈕========
    Vue.component('backstage_info1_add',{
        data(){
            return{
                newdata:{},
            }
        },
        methods: {
            f_save(){
                if(this.newdata.NAME && this.newdata.NAME !=""
                && this.newdata.START_TIME && this.newdata.START_TIME !=""
                && this.newdata.END_TIME && this.newdata.END_TIME !=""
                && this.newdata.OPEN && this.newdata.OPEN !=""
                && this.newdata.INTRODUCE && this.newdata.INTRODUCE !=""){
                // 確認所有欄位是否都有值
                    // 確認開始日期是否小於結束日期
                    let starttime= (this.newdata.START_TIME).split('-').join('')
                    let endtime= (this.newdata.END_TIME).split('-').join('')
                    if(starttime<=endtime){
                        fetch('php/backstage_info1_insert_expo.php', {
                            method: 'POST',
                            headers:{
                                'Content-Type': 'application/json'
                            },
                            body:JSON.stringify({
                                NAME:this.newdata.NAME,
                                START_TIME:this.newdata.START_TIME,
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
                    <li class="mb-16 input-short"><label for="NAME">展會名稱</label>
                        <input type="text" name="NAME" id="NAME" v-model.trim="newdata.NAME">
                    </li>
                    <li class="mb-16 input-long"><label for="INTRODUCE">會議簡介</label>
                        <textarea name="INTRODUCE" id="INTRODUCE" cols="30" rows="10" v-model.trim="newdata.INTRODUCE"></textarea>
                    </li>
                    <li class="mb-16 input-short"><label for="START_TIME">活動開始</label>
                        <input type="date" name="START_TIME" id="START_TIME" v-model="newdata.START_TIME">
                    </li>
                    <li class="mb-16 input-short"><label for="END_TIME">活動結束</label>
                        <input type="date" name="END_TIME" id="END_TIME" v-model="newdata.END_TIME">
                    </li>
                    <div class="mb-16"><label>進行狀態</label><br>
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
// ========info1_展覽場次_table========
    Vue.component('backstage_info1',{
        props:['tablename'],
        data(){
            return{
                box:null,
                titles:["策展ID", "策展名稱", "活動開始", "狀態", "操作"],
                datas:'',
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
                        fetch('php/backstage_info1_delete_expo.php', {
                            method: 'POST',
                            headers:{
                                'Content-Type': 'application/json'
                            },
                            body:JSON.stringify({
                                ID:this.datas[index].ID,
                            })
                        }).then(resp =>resp.json())
                        .then(body =>{
                            let {successful} =body
                            if(successful){
                                this.$swal({
                                    title: "刪除成功",
                                    icon: "success",
                                    image: "",
                                }).then((willDelete) => {
                                    fetch('php/backstage_info1_select_expo.php')
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
            editsave(newdata){
                this.box=null
                fetch('php/backstage_info1_select_expo.php')
                .then(resp =>resp.json())
                .then(resp =>this.datas=resp)
            },
            addclose(){
                this.box=null
            },
            addsave(){
                this.box=null
                fetch('php/backstage_info1_select_expo.php')
                .then(resp =>resp.json())
                .then(resp =>this.datas=resp)
            }
        },
        template:`
        <article class="-margin0auto pt-10 pb-10 table_outer">
            <button @click="box='backstage_info1_add'" class=" backstage_btn backstage_btn_add mb-15">新增</button>
            <h3 class="bg-color pall-15">{{tablename}}</h3>
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
            <component :is="box" @editclose="editclose" @editsave="editsave" @addclose="addclose" @addsave="addsave" :row_data="row_data"></component>
        </article>`,
        mounted(){
            fetch('php/backstage_info1_select_expo.php')
            .then(resp =>resp.json())
            .then(resp =>this.datas=resp)
        },
    })

// ========頁面vue========
    const vm=new Vue({
        el:"#page",
        data: {
            aside_btn: false,
            table:'backstage_info1',
            pages:[
                ["資訊管理",[
                {
                    pagename: "策展場次",
                    href:"backstage_info1",
                    onpage:true,
                },{
                    pagename: "大會講師",
                    href:"backstage_info2",
                    onpage:false,
                },{
                    pagename: "新聞資訊",
                    href:"backstage_info3",
                    onpage:false,
                },{
                    pagename: "聯絡我們",
                    href:"backstage_info3",
                    onpage:false,
                },],],
                ["會員管理",[
                    {
                        pagename: "來賓管理",
                        href:"backstage_member1",
                        onpage:false,
                    },{
                        pagename: "廠商管理",
                        href:"backstage_member2",
                        onpage:false,
                    },
                ],],["活動管理",[
                    {
                        pagename: "參展資料",
                        href:"backstage_expo1",
                        onpage:false,
                    },{
                        pagename: "直播時段",
                        href:"backstage_expo2",
                        onpage:false,
                    },{
                        pagename: "直播審核表",
                        href:"backstage_expo3",
                        onpage:false,
                    },{
                        pagename: "直播留言板",
                        href:"backstage_expo4",
                        onpage:false,
                    },
                ],],
            ],
            tablename:"策展場次",
          },
        methods: {
            aside_toggle() {
                this.aside_btn = !this.aside_btn
            },
            changepage(index, index2){
                for(let i=0; i<this.pages.length; i++){
                    for(let j=0; j<this.pages[i][1].length; j++){
                        this.pages[i][1][j].onpage=false
                    }
                }
                this.pages[index][1][index2].onpage=true
                this.table=this.pages[index][1][index2].href
                this.tablename=this.pages[index][1][index2].pagename
            },
        },
        
            
        
    })
    


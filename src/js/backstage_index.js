// ========expo1_參展廠商_查看按鈕========
Vue.component('backstage_expo1_look',{
    props:['row_data'],
    data(){
        return{
            newdata:'',
        }
    },
    methods: {
        f_close(){
            this.$emit('lookclose')
        },
    },
    template:`
    <article class="backstage_box">
        <h2>查看<i @click="f_close" class="fa-regular fa-circle-xmark backstage_close_icon"></i></h2>
        <div class="backstage_box-content pt-30">
            <ul>
                <li class="mb-16 input-short"><label for="ID">廠商ID</label>
                    <input type="text" name="ID" id="ID" v-model="newdata.ID" disabled>
                </li>
                <li class="mb-16 input-short"><label for="EXPO_NAME">展會名稱</label>
                    <input type="text" name="EXPO_NAME" id="EXPO_NAME" v-model.trim="newdata.EXPO_NAME" disabled>
                </li>
                <li class="mb-16 input-long"><label for="NAME">廠商名稱</label>
                    <input type="text" id="NAME" cols="30" rows="10" v-model.trim="newdata.NAME" disabled>
                </li>
                <li class="mb-16 input-long"><label for="VIDEO">影片連結</label>
                    <input type="text" name="VIDEO" id="VIDEO" v-model.trim="newdata.VIDEO" disabled>
                </li>
                <li class="mb-16 input-long"><label for="INTRODUCE">廠商介紹</label>
                    <textarea name="INTRODUCE" id="INTRODUCE" v-model="newdata.INTRODUCE"  disabled></textarea>
                </li>
                <li class="mb-16 backstage_extend">
                <div class='pall-5'><img :src="newdata.LOGO"><br>廠商LOGO</div>
                <div class='pall-5'><img :src="['img/extend/booth' + newdata.TYPE + '.png']"><br>攤位樣式</div>
                <div class='pall-5'><img :src="['img/extend/robot' + newdata.ROBOT + '.png']"><br>客服機器人</div>
                </li>
                <div class="mb-16"><label>狀態</label><br>
                    <label for="on"><input type="radio" name="ONBOARD" id="on"  value="1" v-model="newdata.ONBOARD" disabled>上架中</label>
                    <label for="off"><input type="radio" name="ONBOARD" id="off"  value="0" v-model="newdata.ONBOARD" disabled>下架中</label>
                </div>
            </ul>                  
            <div class="backstage-insert-btn">
                <button class="backstage-insert_close" @click="f_close">關閉</button>
            </div>
        </div>
    </article>`,
    created () {
        this.newdata = JSON.parse(JSON.stringify(this.row_data)) 
    },
})
// ========expo1_參展廠商_table========
Vue.component('backstage_expo1',{
    props:['tablename'],
    data(){
        return{
            box:null, //判斷要打開的彈窗
            titles:["廠商ID", "廠商名稱", "策展ID", "狀態", "操作"],
            datas:'', //每一頁的所有資料
            data_count:'', //資料庫的資料組數
            search_word:'',
            pages:1,//總共有的頁數，目前所在的頁數
            perpage:10, //每頁顯示幾筆
            inpage:1, //當前頁數
            centersize:5, // 過多頁數時顯示筆數
            row_data:null, //被選取那列的資料
            row_index:null, //被選取那列的序號
        }
    },
    methods:{
        search(){
            this.ajax(this.inpage)
        },
        switchbtn(index){
            this.update(index)
            if(this.datas[index].ONBOARD==true){
                this.datas[index].ONBOARD=1
            }else{
                this.datas[index].ONBOARD=0
            }
        },
        watch(data, index){
            this.row_data=data
            this.row_index=index
            this.box='backstage_expo1_look'
        },
        lookclose(){
            this.box=null
        },
        changepage(inpage){
            this.ajax(inpage)
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
            fetch('php/backstage_expo1_select_company_info.php', {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    inpage: inpage,
                    perpage: this.perpage,
                    search_word: this.search_word,
                })
            })
            .then(resp =>resp.json())
            .then(resp => {
                this.datas=resp.data
                this.data_count=resp.data_count[0][0]
                this.pages=Math.ceil(this.data_count/this.perpage)
                this.inpage=inpage
            })
        },
        update(index){
            fetch('php/backstage_expo1_update_company_info.php', {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    ID:this.datas[index].ID,
                    ONBOARD:this.datas[index].ONBOARD
                })
            }).then(resp =>resp.json())
            .then(body =>{ 
                let {successful} =body
                if(successful){
                    this.$swal({
                        title: "修改成功",
                        icon: "success",
                        image: "",
                    })
                }else{
                    this.$swal({
                        title: "修改失敗",
                        icon: "error",
                        text: "請檢查廠商資料",
                    });
                } 
            })
        },
    },
    computed:{
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
    template:`
    <article class="-margin0auto pt-40 pb-10 table_outer">
        <h3 class="bg-color pall-15">{{tablename}}</h3>
        <div class="pall-10 bg-in-bgcolor">
            <input type='text' name='search' id='search' class='mb-2 mr-2' v-model="search_word" @keyup="search"><label for='search'><i class="fa-solid fa-magnifying-glass"></i></label>
            <ul class="bg-color -margin0auto backstage-grid title backstage-grid_expo1">
                <li class="bg-color bg-in-secondcolor" v-for="title in titles">{{title}}</li>
            </ul>
            <ul class="bg-color -margin0auto backstage-grid backstage-grid_expo1" v-for="(data, index) in datas">
                <li class="bg-color bg-in-secondcolor">{{data.COMPANY_ID}}</li>
                <li class="bg-color bg-in-secondcolor">{{data.NAME}}</li>
                <li class="bg-color bg-in-secondcolor">{{data.EXPO_NAME}}</li>
                <li class="bg-color bg-in-secondcolor"><div class="backstage_btn_td switch_flex">
                    下架
                    <div class="custom-control custom-switch">   
                        <input type="checkbox" class="custom-control-input" :id="['customSwitch-' + data.ID]" v-model="data.ONBOARD" @change="switchbtn(index)">
                        <label class="custom-control-label" :for="['customSwitch-' + data.ID]"></label>
                    </div>
                    上架
                </div> </li>
                <li class="bg-color bg-in-secondcolor"><div class="backstage_btn_td"><button @click="watch(data, index)" class="backstage_btn backstage_btn_short">查看</button></div></li>
            </ul>
            <div class='backstage_pages mt-10'>
                <button class='backstage_pages_btn_left mr-2'  @click.stop="previouspage">上一頁</button>
                <button @click.prevent='changepage(1)' class='backstage_pages_btn pr-2 pl-2' :class="{'action':inpage==1}">1</button>
                <button v-if="pages>centersize+2 && inpage-centersize/2-1>1" class='backstage_pages_btn pr-2 pl-2'>...</button>
                <button v-for='(page,index) in centerPages' @click.prevent='changepage(page)' class='backstage_pages_btn pr-2 pl-2' :class="{'action':inpage==page}" :key="index">{{page}}</button>
                <button v-if="pages>centersize+2 && inpage+centersize/2+1<pages" class='backstage_pages_btn pr-2 pl-2'>...</button>
                <button v-if="pages!= 1" @click.prevent='changepage(pages)' class='backstage_pages_btn pr-2 pl-2' :class="{'action':inpage==pages}">{{pages}}</button>
                <button class='backstage_pages_btn_right ml-2' @click.stop="nextpage">下一頁</button>
            </div> 
        </div>
        <component :is="box" @lookclose="lookclose" :row_data="row_data"></component>
    </article>`,
    mounted(){
        fetch('php/backstage_expo1_select_company_info.php', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                inpage: this.inpage,
                perpage: this.perpage,
                search_word: this.search_word,
            })
        })
        .then(resp =>resp.json())
        .then(resp =>{
            this.datas=resp.data
            this.data_count=resp.data_count[0][0]
            this.pages=Math.ceil(this.data_count/this.perpage)
        })
    },
})
// ========info2_大會講師_修改按鈕========
Vue.component('backstage_info2_edit', {
    props: ['row_data'],
    data() {
        return {
            newdata: {},
            file_name: "",
            TIME_OPT:'',
            file:'',
        }
    },
    methods: {
        f_save() {
            if (this.newdata.NAME != ""&&
                this.newdata.AGENDA_TIME_ID != ""&&
                this.newdata.LINK != ""&&
                this.newdata.DATE != ""&&
                this.newdata.THEME != ""&&
                this.newdata.PHOTO != ""&&
                this.newdata.INTRODUCE != "") {
                form_data = new FormData();
                form_data.append('datas', JSON.stringify({
                    ID: this.newdata.ID,
                    NAME: this.newdata.NAME,
                    AGENDA_TIME_ID: this.newdata.AGENDA_TIME_ID,
                    LINK: this.newdata.LINK,
                    DATE: this.newdata.DATE,
                    THEME: this.newdata.THEME,
                    INTRODUCE: this.newdata.INTRODUCE,
                    }))
                form_data.append('file', this.file);
                fetch('php/backstage_info2_update_agenda.php', {
                    method: 'POST',
                    body: form_data,
                }).then(resp => resp.json())
                .then(body => {
                    let {successful} =body
                    if (successful) {
                        this.$swal({
                            title: "儲存成功",
                            icon: "success",
                            image: "",
                        }).then((willInsert) => {
                            this.$emit('addsave')
                        })
                    } else {
                        this.$swal({
                            title: "儲存失敗",
                            icon: "error",
                            text: "請檢查欄位",
                        });
                    }
                })

            } else {
                this.$swal({
                    title: "儲存失敗",
                    icon: "error",
                    text: "所有欄位皆須填寫",
                });
            }

        },
        f_close() {
            this.$swal({
                title: "尚未存檔，是否關閉?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then((willInsert) => {
                if (willInsert) {
                    this.$emit('addclose')
                }
            })
        },
        choosephoto() {
            let filechoose = document.querySelector(".filechoose")
            filechoose.click()
        },
        selectedFile(e) {
            let file = e.target.files[0];
            let readFiles = new FileReader();
            readFiles.readAsDataURL(file);
            readFiles.addEventListener("load", (e)=>{
                this.newdata.PHOTO = e.target.result;
            });
            this.file_name = file.name;
            this.file=e.target.files[0]
            document.querySelector(".icon_img").style.opacity = "0";
        },
        dropfile(e){
            if(e.dataTransfer.files.length>0){
                let reader= new FileReader()
                reader.readAsDataURL(e.dataTransfer.files[0])
                reader.addEventListener("load", () => {
                    this.newdata.PHOTO = reader.result;
                })
                this.file_name = e.dataTransfer.files[0].name;
                this.file=e.dataTransfer.files[0]
                document.querySelector(".icon_img").style.opacity = "0";
            }
        },
    },
    template: `
        <article class="backstage_box">
            <h2>修改<i @click="f_close" class="fa-regular fa-circle-xmark backstage_close_icon"></i></h2>
            <div class="backstage_box-content pt-30">
                <ul>
                    <li class="mb-16 input-short"><label for="ID">議程ID</label>
                        <input type="text" name="ID" id="ID" value="自動編號" disabled>
                    </li>
                    <li class="mb-16 input-short"><label for="DATE">議程日期</label>
                        <input type="DATE" name="DATE" id="DATE" v-model="newdata.DATE">
                    </li>
                    <li class="mb-16 input-long"><label for="START_TIME">時間</label>
                        <select  name="TIME" v-model="newdata.AGENDA_TIME_ID">
                            <option value="" selected>請選擇時間</option>
                            <option  v-for="TIME in TIME_OPT" :value="TIME.ID">{{TIME.START_TIME.slice(0, 5)}}-{{TIME.END_TIME.slice(0, 5)}}</option>
                        </select>
                    </li>
                    <li class="mb-16 input-short"><label for="THEME">主題</label>
                        <input type="text" name="THEME" id="THEME" v-model.trim="newdata.THEME">
                    </li>
                    <li class="mb-16 input-short"><label for="NAME">講師名稱</label>
                        <input type="text" name="NAME" id="NAME" v-model.trim="newdata.NAME">
                    </li>
                    <li class="mb-16 input-long"><label for="LINK">直播連結</label>
                        <input type="text" name="LINK" id="LINK" v-model.trim="newdata.LINK">
                    </li>
                    <li class="mb-16 input-long"><label for="INTRODUCE">講師介紹</label>
                        <textarea name="INTRODUCE" id="INTRODUCE" cols="30" rows="10" v-model="newdata.INTRODUCE"></textarea>
                    </li>
                </ul> 
                <div class="mb-16 input-file">
                    <label>講師照片</label>
                    <input type="file" class="filechoose -hide" name="filechoose" id="filechoose" @change="selectedFile">
                    <input type="text" class="filename" name="filename" id="filename" :value="file_name" disabled>
                    <button @click="choosephoto">上傳</button>
                    <div class="backstage_input-file-img"  @dragover.prevent="" @drop.prevent="dropfile">
                        <img id="PHOTO" class="img-update" :src="newdata.PHOTO">
                    </div>
                </div>                  
                <div class="backstage-insert-btn">
                    <button class="backstage-insert_save" @click="f_save">儲存</button>
                    <button class="backstage-insert_close" @click="f_close">關閉</button>
                </div>
            </div>
        </article>`,
        created() {
            this.newdata = JSON.parse(JSON.stringify(this.row_data))
        },
        mounted(){
            fetch('php/backstage_info2_select_agenda_time.php')
            .then(resp => resp.json())
            .then(resp => {
                this.TIME_OPT=resp
            })
        },
})
// ========info2_大會講師_後台新增按鈕========
Vue.component('backstage_info2_add', {
    data() {
        return {
            newdata: {
                PHOTO:'',
                DATE:'',
                THEME:'',
                NAME:'',
                LINK:'',
                INTRODUCE:'',
                AGENDA_TIME_ID:'',
            },
            file_name: "",
            TIME_OPT:'',
            file:'',
        }
    },
    methods: {
        f_save() {
            if (this.newdata.NAME != ""&&
                this.newdata.AGENDA_TIME_ID != ""&&
                this.newdata.LINK != ""&&
                this.newdata.DATE != ""&&
                this.newdata.THEME != ""&&
                this.newdata.PHOTO != ""&&
                this.newdata.INTRODUCE != "") {
                form_data = new FormData();
                form_data.append('datas', JSON.stringify({
                    NAME: this.newdata.NAME,
                    AGENDA_TIME_ID: this.newdata.AGENDA_TIME_ID,
                    LINK: this.newdata.LINK,
                    DATE: this.newdata.DATE,
                    THEME: this.newdata.THEME,
                    INTRODUCE: this.newdata.INTRODUCE,
                    }))
                form_data.append('file', this.file);
                fetch('php/backstage_info2_insert_agenda.php', {
                    method: 'POST',
                    body: form_data,
                }).then(resp => resp.json())
                .then(body => {
                    let {successful} =body
                    if (successful) {
                        this.$swal({
                            title: "儲存成功",
                            icon: "success",
                            image: "",
                        }).then((willInsert) => {
                            this.$emit('addsave')
                        })
                    } else {
                        this.$swal({
                            title: "儲存失敗",
                            icon: "error",
                            text: "請檢查欄位",
                        });
                    }
                })

            } else {
                this.$swal({
                    title: "儲存失敗",
                    icon: "error",
                    text: "所有欄位皆須填寫",
                });
            }

        },
        f_close() {
            this.$swal({
                title: "尚未存檔，是否關閉?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then((willInsert) => {
                if (willInsert) {
                    this.$emit('addclose')
                }
            })
        },
        choosephoto() {
            let filechoose = document.querySelector(".filechoose")
            filechoose.click()
        },
        selectedFile(e) {
            let file = e.target.files[0];
            let readFiles = new FileReader();
            readFiles.readAsDataURL(file);
            readFiles.addEventListener("load", (e)=>{
                this.newdata.PHOTO = e.target.result;
            });
            this.file_name = file.name;
            this.file=e.target.files[0]
            document.querySelector(".icon_img").style.opacity = "0";
        },
        dropfile(e){
            if(e.dataTransfer.files.length>0){
                let reader= new FileReader()
                reader.readAsDataURL(e.dataTransfer.files[0])
                reader.addEventListener("load", () => {
                    this.newdata.PHOTO = reader.result;
                })
                this.file_name = e.dataTransfer.files[0].name;
                this.file=e.dataTransfer.files[0]
                document.querySelector(".icon_img").style.opacity = "0";
            }
        },
    },
    template: `
        <article class="backstage_box">
            <h2>新增<i @click="f_close" class="fa-regular fa-circle-xmark backstage_close_icon"></i></h2>
            <div class="backstage_box-content pt-30">
                <ul>
                    <li class="mb-16 input-short"><label for="ID">議程ID</label>
                        <input type="text" name="ID" id="ID" value="自動編號" disabled>
                    </li>
                    <li class="mb-16 input-short"><label for="DATE">議程日期</label>
                        <input type="DATE" name="DATE" id="DATE" v-model="newdata.DATE">
                    </li>
                    <li class="mb-16 input-long"><label for="START_TIME">時間</label>
                        <select  name="TIME" v-model="newdata.AGENDA_TIME_ID">
                            <option value="" selected>請選擇時間</option>
                            <option  v-for="TIME in TIME_OPT" :value="TIME.ID">{{TIME.START_TIME.slice(0, 5)}}-{{TIME.END_TIME.slice(0, 5)}}</option>
                        </select>
                    </li>
                    <li class="mb-16 input-short"><label for="THEME">主題</label>
                        <input type="text" name="THEME" id="THEME" v-model.trim="newdata.THEME">
                    </li>
                    <li class="mb-16 input-short"><label for="NAME">講師名稱</label>
                        <input type="text" name="NAME" id="NAME" v-model.trim="newdata.NAME">
                    </li>
                    <li class="mb-16 input-long"><label for="LINK">直播連結</label>
                        <input type="text" name="LINK" id="LINK" v-model.trim="newdata.LINK">
                    </li>
                    <li class="mb-16 input-long"><label for="INTRODUCE">講師介紹</label>
                        <textarea name="INTRODUCE" id="INTRODUCE" cols="30" rows="10" v-model="newdata.INTRODUCE"></textarea>
                    </li>
                </ul> 
                <div class="mb-16 input-file">
                    <label>講師照片</label>
                    <input type="file" class="filechoose -hide" name="filechoose" id="filechoose" @change="selectedFile">
                    <input type="text" class="filename" name="filename" id="filename" :value="file_name" disabled>
                    <button @click="choosephoto">上傳</button>
                    <div class="backstage_input-file-img"  @dragover.prevent="" @drop.prevent="dropfile">
                        <i class="fa-solid fa-image icon_img"></i>
                        <img id="PHOTO" class="img-update" :src="newdata.PHOTO">
                    </div>
                </div>                  
                <div class="backstage-insert-btn">
                    <button class="backstage-insert_save" @click="f_save">儲存</button>
                    <button class="backstage-insert_close" @click="f_close">關閉</button>
                </div>
            </div>
        </article>`,
        mounted(){
            fetch('php/backstage_info2_select_agenda_time.php')
            .then(resp => resp.json())
            .then(resp => {
                this.TIME_OPT=resp
            })
        },

})
// ========info2_大會講師_table========
Vue.component('backstage_info2', {
    props:['tablename'],
    data(){
        return{
            box:null, //判斷要打開的彈窗
            titles:["議程ID", "主題", "議程日期", "開始時間", "結束時間", "操作"],
            datas:'', //每一頁的所有資料
            data_count:'', //資料庫的資料組數
            search_word:'',
            pages:1,//總共有的頁數，目前所在的頁數
            perpage:10, //每頁顯示幾筆
            inpage:1, //當前頁數
            centersize:5, // 過多頁數時顯示筆數
            row_data:null, //被選取那列的資料
            row_index:null, //被選取那列的序號
        }
    },
    methods:{
        search(){
            this.ajax(this.inpage)
        },
        edit(data, index){
            this.row_data=data
            this.row_index=index
            this.box='backstage_info2_edit'
        },
        del(index){
            this.$swal({
                title: "是否確定刪除?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then((willDelete) => {
                if (willDelete) {
                    fetch('php/backstage_info2_delete_agenda.php', {
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
                                this.ajax(this.inpage)
                            })
                        } else {
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
        changepage(inpage){
            this.ajax(inpage)
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
            fetch('php/backstage_info2_select_agenda.php', {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    inpage: inpage,
                    perpage: this.perpage,
                    search_word: this.search_word,
                })
            })
            .then(resp => resp.json())
            .then(resp => {
                this.datas = resp.data
                this.data_count = resp.data_count[0][0]
                this.pages = Math.ceil(this.data_count / this.perpage)
                this.inpage = inpage
            })
    }
},
computed: {
    centerPages() {
        let centerPage = this.inpage;
        if (this.inpage > this.pages - 3) {
            centerPage = this.pages - 3
        }
        if (this.inpage < 4) {
            centerPage = 4
        }
        if (this.pages <= this.centersize + 2) {
            const centerArr = []
            for (let i = 2; i < this.pages; i++) {
                centerArr.push(i)
            }
            return centerArr
        } else {
            const centerArr = []
            for (let i = centerPage - 2; i <= centerPage + 2; i++) {
                centerArr.push(i)
            }
            return centerArr
        }
    }
},
template: `
    <article class="-margin0auto pt-10 pb-10 table_outer">
        <button @click="box='backstage_info2_add'" class=" backstage_btn backstage_btn_add mb-15">新增</button>
        <h3 class="bg-color pall-15">{{tablename}}</h3>
        <div class="pall-10 bg-in-bgcolor">
            <input type='text' name='search' id='search' class='mb-2 mr-2' v-model="search_word" @keyup="search"><label for='search'><i class="fa-solid fa-magnifying-glass"></i></label>
            <ul class="bg-color -margin0auto backstage-grid title backstage-grid_info2">
                <li class="bg-color bg-in-secondcolor" v-for="title in titles">{{title}}</li>
            </ul>
            <ul class="bg-color -margin0auto backstage-grid backstage-grid_info2" v-for="(data, index) in datas">
                <li class="bg-color bg-in-secondcolor">{{data.ID}}</li>
                <li class="bg-color bg-in-secondcolor">{{data.THEME}}</li>
                <li class="bg-color bg-in-secondcolor">{{data.DATE}}</li>
                <li class="bg-color bg-in-secondcolor">{{data.START_TIME.slice(0, 5)}}</li>
                <li class="bg-color bg-in-secondcolor">{{data.END_TIME.slice(0, 5)}}</li>
                <li class="bg-color bg-in-secondcolor"><div class="backstage_btn_td"><button @click="edit(data, index)" class="backstage_btn backstage_btn_short">修改</button><button @click="del(index)" class="backstage_btn backstage_btn_bad ml-4">刪除</button></div></li>
            </ul>
            <div class='backstage_pages mt-10'>
                <button class='backstage_pages_btn_left mr-2'  @click.stop="previouspage">上一頁</button>
                <button @click.prevent='changepage(1)' class='backstage_pages_btn pr-2 pl-2' :class="{'action':inpage==1}">1</button>
                <button v-if="pages>centersize+2 && inpage-centersize/2-1>1" class='backstage_pages_btn pr-2 pl-2'>...</button>
                <button v-for='(page,index) in centerPages' @click.prevent='changepage(page)' class='backstage_pages_btn pr-2 pl-2' :class="{'action':inpage==page}" :key="index">{{page}}</button>
                <button v-if="pages>centersize+2 && inpage+centersize/2+1<pages" class='backstage_pages_btn pr-2 pl-2'>...</button>
                <button v-if="pages!= 1" @click.prevent='changepage(pages)' class='backstage_pages_btn pr-2 pl-2' :class="{'action':inpage==pages}">{{pages}}</button>
                <button class='backstage_pages_btn_right ml-2' @click.stop="nextpage">下一頁</button>
            </div> 
        </div>
        <component :is="box" @editclose="editclose" @editsave="editsave" @addclose="addclose" @addsave="addsave" :row_data="row_data"></component>
    </article>`,
    mounted(){
        fetch('php/backstage_info2_select_agenda.php', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                inpage: this.inpage,
                perpage: this.perpage,
                search_word: this.search_word,
            })
        })
        .then(resp => resp.json())
        .then(resp => {
            this.datas = resp.data
            this.data_count = resp.data_count[0][0]
            this.pages = Math.ceil(this.data_count / this.perpage)
        })
    },
})
// ========info1_展覽場次_修改按鈕========
Vue.component('backstage_info1_edit', {
    props: ['row_data'],
    data() {
        return {
            newdata: '',
        }
    },
    methods: {
        f_save() {
            if (this.newdata.NAME && this.newdata.NAME != ""
                && this.newdata.START_TIME && this.newdata.START_TIME != ""
                && this.newdata.END_TIME && this.newdata.END_TIME != ""
                && this.newdata.OPEN && this.newdata.OPEN != ""
                && this.newdata.INTRODUCE && this.newdata.INTRODUCE != "") {
                // 確認所有欄位是否都有值
                // 確認開始日期是否小於結束日期
                let starttime = (this.newdata.START_TIME).split('-').join('')
                let endtime = (this.newdata.END_TIME).split('-').join('')
                if (starttime <= endtime) {
                    console.log(starttime, endtime)
                    fetch('php/backstage_info1_update_expo.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            ID: this.newdata.ID,
                            NAME: this.newdata.NAME,
                            START_TIME: this.newdata.START_TIME,
                            END_TIME: this.newdata.END_TIME,
                            OPEN: this.newdata.OPEN,
                            INTRODUCE: this.newdata.INTRODUCE,
                        })
                    }).then(resp => resp.json())
                        .then(body => {
                            let { successful } = body
                            if (successful) {
                                this.$swal({
                                    title: "儲存成功",
                                    icon: "success",
                                    image: "",
                                }).then((willInsert) => {
                                    this.$emit('addsave')
                                })
                            } else {
                                this.$swal({
                                    title: "儲存失敗",
                                    icon: "error",
                                    text: "請檢查欄位",
                                });
                            }
                        })
                } else {
                    this.$swal({
                        title: "儲存失敗",
                        icon: "error",
                        text: "請確認日期是否正確",
                    });
                }
            } else {
                this.$swal({
                    title: "儲存失敗",
                    icon: "error",
                    text: "所有欄位皆須填寫",
                });
            }
        },
        f_close() {
            this.$swal({
                title: "尚未存檔，是否關閉?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then((willInsert) => {
                if (willInsert) {
                    this.$emit('editclose')
                }
            })
        },
    },
    template: `
        <article class="backstage_box">
            <h2>修改<i @click="f_close" class="fa-regular fa-circle-xmark backstage_close_icon"></i></h2>
            <div class="backstage_box-content pt-30">
                <ul>
                    <li class="mb-16 input-short"><label for="ID">策展ID</label>
                        <input type="text" name="ID" id="ID" v-model="newdata.ID" disabled>
                    </li>
                    <li class="mb-16 input-short"><label for="NAME">展會名稱</label>
                        <input type="text" name="NAME" id="NAME" v-model.trim="newdata.NAME">
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
    created() {
        this.newdata = JSON.parse(JSON.stringify(this.row_data))
    },
})
// ========info1_展覽場次_後台新增按鈕========
Vue.component('backstage_info1_add', {
    data() {
        return {
            newdata: {},
        }
    },
    methods: {
        f_save() {
            if (this.newdata.NAME && this.newdata.NAME != ""
                && this.newdata.START_TIME && this.newdata.START_TIME != ""
                && this.newdata.END_TIME && this.newdata.END_TIME != ""
                && this.newdata.OPEN && this.newdata.OPEN != ""
                && this.newdata.INTRODUCE && this.newdata.INTRODUCE != "") {
                // 確認所有欄位是否都有值
                // 確認開始日期是否小於結束日期
                let starttime = (this.newdata.START_TIME).split('-').join('')
                let endtime = (this.newdata.END_TIME).split('-').join('')
                if (starttime <= endtime) {
                    fetch('php/backstage_info1_insert_expo.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            NAME: this.newdata.NAME,
                            START_TIME: this.newdata.START_TIME,
                            END_TIME: this.newdata.END_TIME,
                            OPEN: this.newdata.OPEN,
                            INTRODUCE: this.newdata.INTRODUCE,
                        })
                    }).then(resp => resp.json())
                        .then(body => {
                            let { successful } = body
                            if (successful) {
                                this.$swal({
                                    title: "儲存成功",
                                    icon: "success",
                                    image: "",
                                }).then((willInsert) => {
                                    this.$emit('addsave')
                                })
                            } else {
                                this.$swal({
                                    title: "儲存失敗",
                                    icon: "error",
                                    text: "請檢查欄位",
                                });
                            }
                        })
                } else {
                    this.$swal({
                        title: "儲存失敗",
                        icon: "error",
                        text: "請確認日期是否正確",
                    });
                }
            } else {
                this.$swal({
                    title: "儲存失敗",
                    icon: "error",
                    text: "所有欄位皆須填寫",
                });
            }
        },
        f_close() {
            this.$swal({
                title: "尚未存檔，是否關閉?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then((willInsert) => {
                if (willInsert) {
                    this.$emit('addclose')
                }
            })
        },
    },
    template: `
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
            box:null, //判斷要打開的彈窗
            titles:["策展ID", "策展名稱", "活動開始", "狀態", "操作"],
            datas:'', //每一頁的所有資料
            data_count:'', //資料庫的資料組數
            search_word:'',
            pages:1,//總共有的頁數，目前所在的頁數
            perpage:10, //每頁顯示幾筆
            inpage:1, //當前頁數
            centersize:5, // 過多頁數時顯示筆數
            row_data:null, //被選取那列的資料
            row_index:null, //被選取那列的序號
        }
    },
    methods:{
        search(){
            this.ajax(this.inpage)
        },
        edit(data, index){
            this.row_data=data
            this.row_index=index
            this.box='backstage_info1_edit'
        },
        del(index){
            this.$swal({
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
                                this.ajax(this.inpage)
                            })
                        } else {
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
        changepage(inpage){
            this.ajax(inpage)
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
            fetch('php/backstage_info1_select_expo.php', {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    inpage: inpage,
                    perpage: this.perpage,
                    search_word: this.search_word,
                })
            })
            .then(resp => resp.json())
            .then(resp => {
                this.datas = resp.data
                this.data_count = resp.data_count[0][0]
                this.pages = Math.ceil(this.data_count / this.perpage)
                this.inpage = inpage
            })
    }
},
computed: {
    centerPages() {
        let centerPage = this.inpage;
        if (this.inpage > this.pages - 3) {
            centerPage = this.pages - 3
        }
        if (this.inpage < 4) {
            centerPage = 4
        }
        if (this.pages <= this.centersize + 2) {
            const centerArr = []
            for (let i = 2; i < this.pages; i++) {
                centerArr.push(i)
            }
            return centerArr
        } else {
            const centerArr = []
            for (let i = centerPage - 2; i <= centerPage + 2; i++) {
                centerArr.push(i)
            }
            return centerArr
        }
    }
},
template: `
    <article class="-margin0auto pt-10 pb-10 table_outer">
        <button @click="box='backstage_info1_add'" class=" backstage_btn backstage_btn_add mb-15">新增</button>
        <h3 class="bg-color pall-15">{{tablename}}</h3>
        <div class="pall-10 bg-in-bgcolor">
            <input type='text' name='search' id='search' class='mb-2 mr-2' v-model="search_word" @keyup="search"><label for='search'><i class="fa-solid fa-magnifying-glass"></i></label>
            <ul class="bg-color -margin0auto backstage-grid title backstage-grid_info1">
                <li class="bg-color bg-in-secondcolor" v-for="title in titles">{{title}}</li>
            </ul>
            <ul class="bg-color -margin0auto backstage-grid backstage-grid_info1" v-for="(data, index) in datas">
                <li class="bg-color bg-in-secondcolor">{{data.ID}}</li>
                <li class="bg-color bg-in-secondcolor">{{data.NAME}}</li>
                <li class="bg-color bg-in-secondcolor">{{data.START_TIME}}</li>
                <li class="bg-color bg-in-secondcolor">{{data.OPEN}}</li>
                <li class="bg-color bg-in-secondcolor"><div class="backstage_btn_td"><button @click="edit(data, index)" class="backstage_btn backstage_btn_short">修改</button><button @click="del(index)" class="backstage_btn backstage_btn_bad ml-4">刪除</button></div></li>
            </ul>
            <div class='backstage_pages mt-10'>
                <button class='backstage_pages_btn_left mr-2'  @click.stop="previouspage">上一頁</button>
                <button @click.prevent='changepage(1)' class='backstage_pages_btn pr-2 pl-2' :class="{'action':inpage==1}">1</button>
                <button v-if="pages>centersize+2 && inpage-centersize/2-1>1" class='backstage_pages_btn pr-2 pl-2'>...</button>
                <button v-for='(page,index) in centerPages' @click.prevent='changepage(page)' class='backstage_pages_btn pr-2 pl-2' :class="{'action':inpage==page}" :key="index">{{page}}</button>
                <button v-if="pages>centersize+2 && inpage+centersize/2+1<pages" class='backstage_pages_btn pr-2 pl-2'>...</button>
                <button v-if="pages!= 1" @click.prevent='changepage(pages)' class='backstage_pages_btn pr-2 pl-2' :class="{'action':inpage==pages}">{{pages}}</button>
                <button class='backstage_pages_btn_right ml-2' @click.stop="nextpage">下一頁</button>
            </div> 
        </div>
        <component :is="box" @editclose="editclose" @editsave="editsave" @addclose="addclose" @addsave="addsave" :row_data="row_data"></component>
    </article>`,
    mounted(){
        fetch('php/backstage_info1_select_expo.php', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                inpage: this.inpage,
                perpage: this.perpage,
                search_word: this.search_word,
            })
        })
        .then(resp => resp.json())
        .then(resp => {
            this.datas = resp.data
            this.data_count = resp.data_count[0][0]
            this.pages = Math.ceil(this.data_count / this.perpage)
        })
},
})
// ========頁面vue========
const vm = new Vue({
el: "#page",
data: {
    aside_btn: false,
    table: 'backstage_info1',
    pages: [
        ["資訊管理", [
            {
                pagename: "策展場次",
                href: "backstage_info1",
                onpage: true,
            }, {
                pagename: "大會講師",
                href: "backstage_info2",
                onpage: false,
            }, {
                pagename: "新聞資訊",
                href: "backstage_info3",
                onpage: false,
            }, {
                pagename: "聯絡我們",
                href:"backstage_info4",
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
                    pagename: "參展廠商",
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
            }//綠色全拿掉 下面再接回綠色
            this.pages[index][1][index2].onpage=true
            this.table=this.pages[index][1][index2].href
            this.tablename=this.pages[index][1][index2].pagename
        },
    
    changepage(index, index2) {
        for (let i = 0; i < this.pages.length; i++) {
            for (let j = 0; j < this.pages[i][1].length; j++) {
                this.pages[i][1][j].onpage = false
            }
        }
        this.pages[index][1][index2].onpage = true
        this.table = this.pages[index][1][index2].href
        this.tablename = this.pages[index][1][index2].pagename
    },
},
})



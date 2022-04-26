// ========expo4_直播留言板_table========
Vue.component('backstage_expo4',{
    props:['tablename'],
    data(){
        return{
            box:null, //判斷要打開的彈窗
            titles:["ID", "議程主題", "留言者", "留言內容", "操作"],
            datas:'', //每一頁的所有資料
            data_count:'', //資料庫的資料組數
            search_word:'', // 搜尋字串
            pages:1,//總共有的頁數，目前所在的頁數
            perpage:10, //每頁顯示幾筆
            inpage:1, //當前頁數
            centersize:5, // 過多頁數時顯示筆數
            row_data:null, //被選取那列的資料
            row_index:null, //被選取那列的序號
        }
    },
    methods:{
        del(index) {
            swal({
                title: "是否確定刪除?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then((willDelete) => {
                if (willDelete) {
                    fetch('php/backstage_expo4_delete_live_board.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            ID: this.datas[index].ID,
                        })
                    }).then(resp => resp.json())
                        .then(body => {
                            let { successful } = body
                            if (successful) {
                                this.$swal({
                                    title: "刪除成功",
                                    icon: "success",
                                    image: "",
                                }).then((willDelete) => {
                                    fetch('php/backstage_expo4_select_live_board.php', {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify({
                                            inpage: this.inpage,
                                            perpage: this.perpage,
                                            search_word: this.search_word,
                                        })
                                    })
                                        .then(resp => resp.json())
                                        .then(resp => {
                                            // 先看resp是什麼用c
                                            // console.log(resp);
                                            this.datas = resp.data
                                            // 塞在裡面的裡面
                                            this.data_count = resp.data_count[0][0]
                                            // pages是分幾頁，math無條件進位 11/10 =1.1 無條件進位 = 2
                                            this.pages = Math.ceil(this.data_count / this.perpage)
                                        })
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
        search(){
            this.ajax(this.inpage)
        },
        // switchbtn(index){
        //     this.update(index)
        //     if(this.datas[index].ONBOARD==true){
        //         this.datas[index].ONBOARD=1
        //     }else{
        //         this.datas[index].ONBOARD=0
        //     }
        // },
        // watch(data, index){
        //     this.row_data=data
        //     this.row_index=index
        //     this.box='backstage_expo4_look'
        // },
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
            fetch('php/backstage_expo4_select_live_board.php', {
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
        // update(index){
        //     fetch('php/backstage_expo4_update_live_board.php', {
        //         method: 'POST',
        //         headers:{
        //             'Content-Type': 'application/json'
        //         },
        //         body:JSON.stringify({
        //             ID:this.datas[index].ID,
        //             ONBOARD:this.datas[index].ONBOARD
        //         })
        //     }).then(resp =>resp.json())
        //     .then(body =>{ 
        //         let {successful} =body
        //         if(successful){
        //             this.$swal({
        //                 title: "修改成功",
        //                 icon: "success",
        //                 image: "",
        //             })
        //         }else{
        //             this.$swal({
        //                 title: "修改失敗",
        //                 icon: "error",
        //                 text: "請檢查廠商資料",
        //             });
        //         } 
        //     })
        // },
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
            <ul class="bg-color -margin0auto backstage-grid title backstage-grid_expo4">
                <li class="bg-color bg-in-secondcolor" v-for="title in titles">{{title}}</li>
            </ul>
            <ul class="bg-color -margin0auto backstage-grid backstage-grid_expo4" v-for="(data, index) in datas">
                <li class="bg-color bg-in-secondcolor">{{data['ID']}}</li>
                <li class="bg-color bg-in-secondcolor">{{data['THEME']}}</li>
                <li class="bg-color bg-in-secondcolor">{{data['NAME']}}</li>
                <li class="bg-color bg-in-secondcolor">{{data['CONTENT']}}</li>
                <li class="bg-color bg-in-secondcolor">
                    <div class="backstage_btn_td">
                        <button @click="del(index)" class="backstage_btn backstage_btn_bad ml-2">刪除</button>
                    </div>
                </li>
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
        fetch('php/backstage_expo4_select_live_board.php', {
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
// ========expo3_直播審核表_table========
Vue.component('backstage_expo3',{
    props:['tablename'],
    data() {
        return {
            box:null,
            titles:["直播ID","廠商名稱","開始時間","結束時間","申請時間","審查狀態","操作"],
            datas: '', //每一頁的所有資料
            data_count: '', //資料庫的資料組數
            pages: 1,//總共有的頁數，目前所在的頁數
            perpage: 10, //每頁顯示幾筆
            inpage: 1, //當前頁數
            centersize: 5, // 過多頁數時顯示筆數
            row_data: null, //被選取那列的資料
            row_index: null, //被選取那列的序號
            search_word: '',//使用者搜尋內容
        }
    },
    methods: {
        search(){
            this.ajax(this.inpage);
        },
        edit(data, index) {
            this.row_data = data;
            this.row_index = index;
            this.box = 'backstage_expo3_edit';
        },
         //以下單向操作的function
        editclose() {
            this.box = null
        },
        editsave(){
            this.box = null
            this.ajax(this.inpage)
        },
        changepage(page) {
            this.ajax(page)
        },
        previouspage() {
            if (this.inpage > 1) {
                let inpage = this.inpage - 1
                this.ajax(inpage)
            }
        },
        nextpage() {
            if (this.inpage < this.pages) {
                let inpage = this.inpage + 1
                this.ajax(inpage)
            }

        },
        ajax(inpage) {
            fetch('php/backstage_expo3_select_live_agenda.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    inpage: inpage,
                    perpage: this.perpage,
                    search_word: this.search_word,
                })
            })
                .then(resp => resp.json())
                .then(resp => {
                    console.log(resp);
                    this.datas = resp.data;
                    this.data_count = resp.data_count[0][0];
                    this.pages = Math.ceil(this.data_count / this.perpage);
                    this.inpage = inpage;
                    for (let i = 0; i < this.datas.length; i++) {
                        if (this.datas[i].OPEN == 0) {
                            this.datas[i].OPEN_1 = false
                        } else {
                            this.datas[i].OPEN_1 = true
                        }
                    }
                })
            // this.$forceupdate()
        },
        //可以測試v-if
        //只針對switch button
        switchbtn(index) {
            this.update(index)
            console.log("open" + this.datas[index].OPEN);
            if (this.datas[index].OPEN_1 == true) {
                this.datas[index].OPEN = 1;
            } else {
                this.datas[index].OPEN = 0;
            }
        },
        update(index) {
            fetch('php/backstage_expo3_update_live_agenda.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ID: this.datas[index].ID,
                    OPEN: this.datas[index].OPEN_1
                })
            }).then(resp => resp.json())
                .then(body => {
                    let { successful } = body
                    if (successful) {
                        this.$swal({
                            title: "修改成功",
                            icon: "success",
                            image: "",
                        })
                    } else {
                        this.$swal({
                            title: "修改失敗",
                            icon: "error",
                            text: "請檢查資料",
                        });
                    }
                })
        },
    },
    computed:{
        centerPages(){
            let centerPage = this.inpage;
            if(this.inpage > this.pages - 3){
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
        <h3 class="bg-color pall-15">{{tablename}}</h3>
        <div class="pall-10 bg-in-bgcolor">
            <input type='text' name='search' id='search' class='mb-2 mr-2' v-model="search_word" @keyup="search"><label for='search'><i class="fa-solid fa-magnifying-glass"></i></label>
            <ul class="bg-color -margin0auto backstage-grid title backstage-grid_expo3">
                <li class="bg-color bg-in-secondcolor" v-for="title in titles">{{title}}</li>
            </ul>
            <ul class="bg-color -margin0auto backstage-grid backstage-grid_expo3" v-for="(data, index) in datas">
                <li class="bg-color bg-in-secondcolor">{{data.ID}}</li>
                <li class="bg-color bg-in-secondcolor">{{data.NAME}}</li>
                <li class="bg-color bg-in-secondcolor">{{data.START}}</li>
                <li class="bg-color bg-in-secondcolor">{{data.END}}</li>
                <li class="bg-color bg-in-secondcolor">{{data.APPLY_TIME}}</li>
                <li class="bg-color bg-in-secondcolor"><div class="backstage_btn_td switch_flex">
                不通過
                <div class="custom-control custom-switch">   
                    <input type="checkbox" class="custom-control-input" :id="['customSwitch-' + data.ID]" v-model="data.OPEN_1" @change="switchbtn(index)">
                    <label class="custom-control-label" :for="['customSwitch-' + data.ID]"></label>
                </div>
                通過
            </div> </li>
                <li class="bg-color bg-in-secondcolor"><div class="backstage_btn_td"><button @click="edit(data, index)" class="backstage_btn backstage_btn_short">修改</button></div></li>
            </ul>
            <div class='backstage_pages mt-10'>
                <button class='backstage_pages_btn_left mr-2'  @click.stop="previouspage">上一頁</button>
                <button @click.prevent='changepage(1)' class='backstage_pages_btn pr-2 pl-2' :class="{'action':inpage==1}">1</button>
                <button v-if="pages>centersize+2 && inpage-centersize/2-1>1" class='backstage_pages_btn pr-2 pl-2'>...</button>
                <button v-for='(page,index) in centerPages' @click.prevent='changepage(page)' class='backstage_pages_btn pr-2 pl-2' :class="{'action':inpage==page}" :key="index">{{page}}</button>
                <button v-if="pages>centersize+2 && inpage+centersize/2+1<pages" class='backstage_pages_btn pr-2 pl-2'>...</button>
                <button v-if="pages!= 1"@click.prevent='changepage(pages)' class='backstage_pages_btn pr-2 pl-2' :class="{'action':inpage==pages}">{{pages}}</button>
                <button class='backstage_pages_btn_right ml-2' @click.stop="nextpage">下一頁</button>
            </div> 
        </div>
        <component :is="box" @editclose="editclose" @editsave="editsave" :row_data="row_data"></component>
    </article>`,
    mounted() {
        fetch('php/backstage_expo3_select_live_agenda.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                inpage: this.inpage,
                perpage: this.perpage,
                search_word: this.search_word,
            })
        })
            .then(resp => resp.json())
            .then(resp => {
                console.log(resp.data);
                this.datas = resp.data
                this.data_count = resp.data_count[0][0]
                this.pages = Math.ceil(this.data_count / this.perpage);
                for (let i = 0; i < this.datas.length; i++) {
                    if (this.datas[i].OPEN == 0) {
                        this.datas[i].OPEN_1 = false
                    } else {
                        this.datas[i].OPEN_1 = true
                    }
                }
            })
    },
})
// ========expo3_直播審核表_修改按鈕========
Vue.component('backstage_expo3_edit', {
    props: ['row_data'],
    data() {
        return {
            newdata: '',
        }
    },
    methods: {
        f_save() {
            if ( this.newdata.OPEN != undefined && this.newdata.OPEN != null
            ) {
                console.log(this.newdata);
                // 確認所有欄位是否都有值
                // 確認開始日期是否小於結束日期
                // let starttime = (this.newdata.START_TIME).split('-').join('') '2020-01-01' [2020,01,01] '20200101'
                // let endtime = (this.newdata.END_TIME).split('-').join('') 20200410
                // if (starttime <= endtime) {
                //     console.log(starttime, endtime)
                fetch('php/backstage_expo3_update_live_agenda.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    //newdata.(大寫)
                    body: JSON.stringify({
                        OPEN: this.newdata.OPEN,
                        ID: this.newdata.ID,
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
                                this.$emit('editsave')
                            })
                        } else {
                            this.$swal({
                                title: "儲存失敗",
                                icon: "error",
                                text: "請檢查欄位",
                            });
                        }
                    })
                // } else {
                //     this.$swal({
                //         title: "儲存失敗",
                //         icon: "error",
                //         text: "請確認日期是否正確",
                //     });
                // }
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
    //這裡是彈窗
    template: `
    <article class="backstage_box">
        <h2>修改<i @click="f_close" class="fa-regular fa-circle-xmark backstage_close_icon"></i></h2>
        <div class="backstage_box-content pt-30">
            <ul>
                <li class="mb-16 input-short"><label for="ID">ID</label>
                    <input type="text" name="ID" id="ID" v-model="newdata.ID" disabled>
                </li>
                <li class="mb-16 input-short"><label for="NAME">姓名</label>
                    <input type="text" name="NAME" id="NAME" v-model="newdata.NAME" disabled>
                </li>
                <li class="mb-16 input-long"><label for="APPLY_TIME">申請時間</label>
                    <textarea name="APPLY_TIME" id="APPLY_TIME" cols="30" rows="10" v-model="newdata.APPLY_TIME" disabled></textarea>
                </li>
                <li class="mb-16 input-long"><label for="START_TIME">開始時間</label>
                    <textarea name="START_TIME" id="START_TIME" cols="30" rows="10" v-model="newdata.START_TIME" disabled></textarea>
                </li>
                <li class="mb-16 input-long"><label for="END_TIME">結束時間</label>
                    <input type="text" name="END_TIME" id="END_TIME" v-model="newdata.END_TIME"disabled>
                </li>
                <li class="mb-16 input-long"><label for="LINK">影片網址</label>
                    <input type="text" name="LINK" id="LINK" v-model="newdata.LINK"disabled>
                </li>
                <div class="mb-16"><label>處理狀態</label><br>
                    <label for="finish"><input type="radio" name="OPEN" id="finish"  value=1 v-model="newdata.OPEN">已通過</label>
                    <label for="notfinish"><input type="radio" name="OPEN" id="notfinish"  value=0 v-model="newdata.OPEN">尚未通過</label>
                </div>
            </ul>                  
            <div class="backstage-insert-btn">
                <button class="backstage-insert_save" @click="f_save">儲存</button>
                <button class="backstage-insert_close" @click="f_close">關閉</button>
            </div>
        </div>
    </article>`,
    created() {
        //傳到上面props
        this.newdata = JSON.parse(JSON.stringify(this.row_data))
    },
})
// ========expo2_大會時段_修改按鈕========
Vue.component('backstage_expo2_edit', {
    props: ['row_data'],
    data() {
        return {
            newdata: '',
        }
    },
    methods: {
        f_save() {
            // console.log("this.newdata.OPEN" + this.newdata.OPEN);
            if (this.newdata.START_TIME && this.newdata.START_TIME != ""
                && this.newdata.END_TIME && this.newdata.END_TIME != ""
                && this.newdata.STATUS && this.newdata.STATUS != ""
                && this.newdata.OPEN != null && this.newdata.OPEN != undefined
            ) {
                // 確認所有欄位是否都有值
                // 確認開始時間是否小於結束時間
                let starttime = (this.newdata.START_TIME).split(':').join('');
                let endtime = (this.newdata.END_TIME).split(':').join('');
                if (starttime.length == '6') {
                    starttime = starttime.substr(0, 4);
                }
                if (endtime.length == '6') {
                    endtime = endtime.substr(0, 4);
                }
                if (starttime <= endtime) {
                    let start_value = this.newdata.START_TIME;
                    let end_value = this.newdata.END_TIME;
                    if (start_value.length == '5') {
                        start_value = start_value + ':00';
                    }
                    if (end_value.length == '5') {
                        end_value = end_value + ':00';
                    }
                    fetch('php/backstage_expo2_update_agenda_time.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            ID: this.newdata.ID,
                            START_TIME: this.newdata.START_TIME,
                            END_TIME: this.newdata.END_TIME,
                            STATUS: "U",
                            OPEN: this.newdata.OPEN,
                        })
                    }).then(resp => resp.json())
                        .then(body => {
                            let { successful } = body;
                            if (successful) {
                                this.$swal({
                                    title: "儲存成功",
                                    icon: "success",
                                    image: "",
                                }).then((willInsert) => {
                                    this.$emit('addsave');
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
                // console.log("this.newdata.OPEN" + this.newdata.OPEN);
                this.$swal({
                    title: "儲存失敗",
                    icon: "error",
                    text: "所有欄位皆須填寫",
                });
                let starttime = (this.newdata.START_TIME).split(':').join('');
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
                    this.$emit('editclose');
                }
            })
        },
    },
    // name id v-model 都大寫，照著欄位名稱
    template: `
    <article class="backstage_box">
        <h2>修改<i @click="f_close" class="fa-regular fa-circle-xmark backstage_close_icon"></i></h2>
        <div class="backstage_box-content pt-30">
            <ul>
                <li class="mb-16 input-short"><label for="ID">時段ID</label>
                    <input type="text" name="ID" id="ID" v-model="newdata.ID" disabled>
                </li>
                <div class="mb-16 input-short"><label>直播狀態</label><br>
                    <label for="working"><input type="radio" name="OPEN" id="working"  value="1" v-model="newdata.OPEN">啟用</label>
                    <label for="notwork"><input type="radio" name="OPEN" id="notwork"  value="0" v-model="newdata.OPEN">不啟用</label>
                </div>
                <li class="mb-16 input-short"><label for="START_TIME">開始時間</label>
                    <input type="time" name="START_TIME" id="START_TIME" v-model="newdata.START_TIME">
                </li>
                <li class="mb-16 input-short"><label for="END_TIME">結束時間</label>
                    <input type="time" name="END_TIME" id="END_TIME" v-model="newdata.END_TIME">
                </li>
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
// ========expo2_大會時段_後台新增按鈕========
Vue.component('backstage_expo2_add', {
    data() {
        return {
            newdata: {},
        }
    },
    methods: {
        f_save() {
            // console.log("this.newdata.OPEN" + this.newdata.OPEN);
            if (this.newdata.START_TIME && this.newdata.START_TIME != ""
                && this.newdata.END_TIME && this.newdata.END_TIME != ""
                && this.newdata.OPEN != null && this.newdata.OPEN != undefined
            ) {
                // 確認所有欄位是否都有值
                // 確認開始日期是否小於結束日期
                let starttime = (this.newdata.START_TIME).split(':').join('');
                let endtime = (this.newdata.END_TIME).split(':').join('');
                if (starttime <= endtime) {
                    fetch('php/backstage_expo2_insert_agenda_time.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            START_TIME: this.newdata.START_TIME,
                            END_TIME: this.newdata.END_TIME,
                            STATUS: "I",
                            OPEN: this.newdata.OPEN,
                        })
                    }).then(resp => resp.json())
                        .then(body => {
                            let { successful } = body;
                            if (successful) {
                                this.$swal({
                                    title: "儲存成功",
                                    icon: "success",
                                    image: "",
                                }).then((willInsert) => {
                                    this.$emit('addsave');
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
                    this.$emit('addclose');
                }
            })
        },
    },
    template: `
    <article class="backstage_box">
        <h2>新增<i @click="f_close" class="fa-regular fa-circle-xmark backstage_close_icon"></i></h2>
        <div class="backstage_box-content pt-30">
            <ul>
                <li class="mb-16 input-short"><label for="id">時段ID</label>
                    <input type="text" name="id" id="id" value="自動編號" disabled>
                </li>
                <div class="mb-16 input-short"><label>直播狀態</label><br>
                    <label for="working"><input type="radio" name="OPEN" id="working" value="1" v-model="newdata.OPEN">啟用</label>
                    <label for="notwork"><input type="radio" name="OPEN" id="notwork" value="0" v-model="newdata.OPEN">不啟用</label>
                </div>
                <li class="mb-16 input-short"><label for="START_TIME">活動開始</label>
                    <input type="time" name="START_TIME" id="START_TIME" v-model="newdata.START_TIME">
                </li>
                <li class="mb-16 input-short"><label for="END_TIME">活動結束</label>
                    <input type="time" name="END_TIME" id="END_TIME" v-model="newdata.END_TIME">
                </li>
            </ul>                   
            <div class="backstage-insert-btn">
                <button class="backstage-insert_save" @click="f_save">儲存</button>
                <button class="backstage-insert_close" @click="f_close">關閉</button>
            </div>
        </div>
    </article>`,

})
// ========expo2_大會時段_table========
Vue.component('backstage_expo2', {
    props: ['tablename'],
    data() {
        return {
            box: null, //判斷要打開的彈窗
            titles: ["時段ID", "開始時間", "結束時間", "狀態", "操作"],
            datas: '', //每一頁的所有資料
            data_count: '', //資料庫的資料組數
            pages: 1,//總共有的頁數，目前所在的頁數
            perpage: 10, //每頁顯示幾筆
            inpage: 1, //當前頁數
            centersize: 5, // 過多頁數時顯示筆數
            row_data: null, //被選取那列的資料
            row_index: null, //被選取那列的序號
            search_word: '',
        }
    },
    methods: {
        search() {
            this.ajax(this.inpage)
        },
        switchbtn(index) {
            this.update(index)
            if (this.datas[index].OPEN_1 == true) {
                this.datas[index].OPEN = 1;
            } else {
                this.datas[index].OPEN = 0;
            }
        },
        edit(data, index) {
            this.row_data = data;
            this.row_index = index;
            this.box = 'backstage_expo2_edit';
        },
        del(index) {
            swal({
                title: "是否確定刪除?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then((willDelete) => {
                if (willDelete) {
                    fetch('php/backstage_expo2_delete_agenda_time.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            ID: this.datas[index].ID,
                        })
                    }).then(resp => resp.json())
                        .then(body => {
                            let { successful } = body;
                            if (successful) {
                                this.$swal({
                                    title: "刪除成功",
                                    icon: "success",
                                    image: "",
                                }).then((willDelete) => {
                                    this.ajax(this.inpage);
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
        editclose() {
            this.box = null
        },
        editsave() {
            this.box = null
            this.ajax(this.inpage)
        },
        addclose() {
            this.box = null
        },
        addsave() {
            this.box = null
            this.ajax(this.inpage)
        },
        changepage(page) {
            this.ajax(page)
        },
        previouspage() {
            if (this.inpage > 1) {
                let inpage = this.inpage - 1
                this.ajax(inpage)
            }
        },
        nextpage() {
            if (this.inpage < this.pages) {
                let inpage = this.inpage + 1
                this.ajax(inpage)
            }

        },
        ajax(inpage) {
            fetch('php/backstage_expo2_select_agenda_time.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    inpage: inpage,
                    perpage: this.perpage,
                    search_word: this.search_word,
                })
            })
                .then(resp => resp.json())
                .then(resp => {
                    // 先看resp是什麼用c
                    // console.log(resp);
                    this.datas = resp.data
                    // 塞在裡面的裡面
                    this.data_count = resp.data_count[0][0]
                    // pages是分幾頁，math無條件進位 11/10 =1.1 無條件進位 = 2
                    this.pages = Math.ceil(this.data_count / this.perpage)
                    this.inpage=inpage
                    for (let i = 0; i < this.datas.length; i++) {
                        if (this.datas[i].OPEN == 0) {
                            this.datas[i].OPEN_1 = false
                        } else {
                            this.datas[i].OPEN_1 = true
                        }
                    }
                })
        },
        update(index) {
            fetch('php/backstage_expo2_update_open.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ID: this.datas[index].ID,
                    OPEN: this.datas[index].OPEN_1,
                })
            }).then(resp => resp.json())
                .then(body => {
                    let { successful } = body
                    if (successful) {
                        this.$swal({
                            title: "修改成功",
                            icon: "success",
                            image: "",
                        })
                    } else {
                        this.$swal({
                            title: "修改失敗",
                            icon: "error",
                            text: "請檢查資料",
                        });
                    }
                })
        },

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
        <button @click="box='backstage_expo2_add'" class=" backstage_btn backstage_btn_add mb-15">新增</button>
        <h3 class="bg-color pall-15">{{tablename}}</h3>
        <div class="pall-10 bg-in-bgcolor">
            <input type='text' name='search' id='search' class='mb-2 mr-2' v-model="search_word" @keyup="search"><label for='search'><i class="fa-solid fa-magnifying-glass"></i></label>
            <ul class="bg-color -margin0auto backstage-grid title backstage-grid_expo2">
                <li class="bg-color bg-in-secondcolor" v-for="title in titles">{{title}}</li>
            </ul>
            <ul class="bg-color -margin0auto backstage-grid backstage-grid_expo2" v-for="(data, index) in datas">
                <li class="bg-color bg-in-secondcolor">{{data[0]}}</li>
                <li class="bg-color bg-in-secondcolor">{{data[1]}}</li>
                <li class="bg-color bg-in-secondcolor">{{data[2]}}</li>
                <li class="bg-color bg-in-secondcolor"><div class="backstage_btn_td switch_flex">
                    不啟用
                    <div class="custom-control custom-switch">   
                        <input type="checkbox" class="custom-control-input" :id="['customSwitch-' + data.ID]" v-model="data.OPEN_1" @change="switchbtn(index)">
                        <label class="custom-control-label" :for="['customSwitch-' + data.ID]"></label>
                    </div>
                    啟用
                </div> </li>
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
    mounted() {
        fetch('php/backstage_expo2_select_agenda_time.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                inpage: this.inpage,
                perpage: this.perpage,
                search_word: this.search_word,
            })
        })
            .then(resp => resp.json())
            .then(resp => {
                // 先看resp是什麼用c
                // console.log(resp);
                this.datas = resp.data
                // 塞在裡面的裡面
                this.data_count = resp.data_count[0][0]
                // pages是分幾頁，math無條件進位 11/10 =1.1 無條件進位 = 2
                this.pages = Math.ceil(this.data_count / this.perpage)
                for (let i = 0; i < this.datas.length; i++) {
                    if (this.datas[i].OPEN == 0) {
                        this.datas[i].OPEN_1 = false
                    } else {
                        this.datas[i].OPEN_1 = true
                    }
                }
            })
    },
})
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
                for (let i = 0; i < this.datas.length; i++) {
                    if (this.datas[i].ONBOARD == 0) {
                        this.datas[i].OPEN_1 = false
                    } else {
                        this.datas[i].OPEN_1 = true
                    }
                }
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
                    ONBOARD:this.datas[index].OPEN_1
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
                        <input type="checkbox" class="custom-control-input" :id="['customSwitch-' + data.ID]" v-model="data.OPEN_1" @change="switchbtn(index)">
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
            for (let i = 0; i < this.datas.length; i++) {
                if (this.datas[i].ONBOARD == 0) {
                    this.datas[i].OPEN_1 = false
                } else {
                    this.datas[i].OPEN_1 = true
                }
            }
        })
    },
})
// ========member2_展覽場次_修改按鈕========
Vue.component('backstage_member2_edit', {
    props: ['row_data'],
    data() {
        return {
            newdata: '',
        }
    },
    methods: {
        f_save() {
            if (this.newdata.NAME && this.newdata.NAME != ""
                && this.newdata.LASTNAME && this.newdata.LASTNAME != ""
                && this.newdata.EMAIL && this.newdata.EMAIL != ""
                && this.newdata.OPEN != null && this.newdata.OPEN != undefined) {
                // 確認所有欄位是否都有值
                
                console.log("hi");
                fetch('php/backstage_member2_update_company.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        ID: this.newdata.ID,
                        LASTNAME: this.newdata.LASTNAME,
                        NAME: this.newdata.NAME,
                        EMAIL: this.newdata.EMAIL,
                        STATUS: "U",
                        OPEN: this.newdata.OPEN,
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
                <li class="mb-16 input-short"><label for="ID">廠商ID</label>
                    <input type="text" name="ID" id="ID" v-model="newdata.ID" disabled>
                </li>
                <li class="mb-16 input-short"><label for="LASTNAME">廠商姓名</label>
                    <input type="text" name="LASTNAME" id="LASTNAME" v-model.trim="newdata.LASTNAME">
                </li>
                <li class="mb-16 input-long"><label for="NAME">廠商名稱</label>
                    <input type="text" name="NAME" id="NAME" cols="30" rows="10" v-model.trim="newdata.NAME"></input>
                </li>
                <li class="mb-16 input-long"><label for="EMAIL">電子郵件</label>
                    <input type="text" name="EMAIL" id="EMAIL" v-model.trim="newdata.EMAIL">
                </li>
                <li class="mb-16 input-long"><label for="LOGINTIME">登入日期</label>
                    <input type="text" name="LOGINTIME" id="LOGINTIME" v-model="newdata.LOGINTIME" disabled>
                </li>

                <div class="mb-16"><label>審核狀態</label><br>
                    <label for="notwork"><input type="radio" name="OPEN" id="notwork" value="0" v-model="newdata.OPEN">未審核</label>
                    <label for="working"><input type="radio" name="OPEN" id="working" value="1" v-model="newdata.OPEN">正常</label>
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
// ========member2_廠商管理_table========
Vue.component('backstage_member2', {
    props: ['tablename'],
    data() {
        return {
            box: null, //判斷要打開的彈窗
            titles: ["廠商ID", "廠商姓名", "廠商名稱", "電子郵件", "審核狀態", "操作"],     //寫自己要頁面的名稱 廠商管理 figma看
            datas: '', //每一頁的所有資料
            data_count: '', //資料庫的資料組數
            pages: 1,//總共有的頁數，目前所在的頁數
            perpage: 10, //每頁顯示幾筆
            inpage: 1, //當前頁數
            centersize: 5, // 過多頁數時顯示筆數
            row_data: null, //被選取那列的資料
            row_index: null, //被選取那列的序號
            search_word:'',
        }
    },
    methods: {
        search(){
            this.ajax(this.inpage)
        },
        edit(data, index) {
            this.row_data = data
            this.row_index = index
            this.box = 'backstage_member2_edit'
        },
        del(index) {
            swal({
                title: "是否確定刪除?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then((willDelete) => {
                if (willDelete) {
                    fetch('php/backstage_member2_delete_company.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            ID: this.datas[index].ID,
                        })
                    }).then(resp => resp.json())
                        .then(body => {
                            let { successful } = body
                            if (successful) {
                                this.$swal({
                                    title: "刪除成功",
                                    icon: "success",
                                    image: "",
                                }).then((willDelete) => {
                                    this.ajax(this.inpage);
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
        editclose() {
            this.box = null
        },
        editsave() {
            this.box = null
            this.ajax(this.inpage)
        },
        addclose() {
            this.box = null
        },
        addsave() {
            this.box = null
            this.ajax(this.inpage)
        },
        changepage(page) {
            this.ajax(page)
        },
        previouspage() {
            if (this.inpage > 1) {
                let inpage = this.inpage - 1
                this.ajax(inpage)
            }
        },
        nextpage() {
            if (this.inpage < this.pages) {
                let inpage = this.inpage + 1
                this.ajax(inpage)
            }

        },
        ajax(inpage) {
            fetch('php/backstage_member2_select_company.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
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
                    for(let i = 0; i < this.datas.length; i++){
                        if(this.datas[i].OPEN == 1){
                            this.datas[i].OPEN_1 = "正常"
                        }else{
                            this.datas[i].OPEN_1 = "未審核"
                        }
                    }
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
        <h3 class="bg-color pall-15">{{tablename}}</h3>
        <div class="pall-10 bg-in-bgcolor">
            <input type='text' name='search' id='search' class='mb-2 mr-2' v-model="search_word" @keyup="search"><label for='search'><i class="fa-solid fa-magnifying-glass"></i></label>
            <ul class="bg-color -margin0auto backstage-grid title backstage-grid_member2">
                <li class="bg-color bg-in-secondcolor" v-for="title in titles">{{title}}</li>
            </ul>
            <ul class="bg-color -margin0auto backstage-grid backstage-grid_member2" v-for="(data, index) in datas">
                <li class="bg-color bg-in-secondcolor">{{data.ID}}</li>
                <li class="bg-color bg-in-secondcolor">{{data.LASTNAME}}</li>
                <li class="bg-color bg-in-secondcolor">{{data.NAME}}</li>
                <li class="bg-color bg-in-secondcolor">{{data.EMAIL}}</li>
                <li class="bg-color bg-in-secondcolor">{{data.OPEN_1}}</li>
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
    mounted() {
        fetch('php/backstage_member2_select_company.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
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
                for(let i = 0; i < this.datas.length; i++){
                    if(this.datas[i].OPEN == 1){
                        this.datas[i].OPEN_1 = "正常"
                    }else{
                        this.datas[i].OPEN_1 = "未審核"
                    }
                }
            })
    },
})
// ========member1_來賓管理_修改按鈕========
// $swal為套件sweet alert
Vue.component('backstage_member1_edit',{
    props:['row_data'],
    data(){
        return{
            newdata:'',
        }
    },
    methods: {
        f_save(){
            if(this.newdata.NAME && this.newdata.NAME !=""
            && this.newdata.UNIT && this.newdata.UNIT !=""
            && this.newdata.EMAIL && this.newdata.EMAIL !=""){
            // 確認所有欄位是否都有值
                // 確認開始日期是否小於結束日期
               
                    fetch('php/backstage_member1_update_guest.php', {
                        method: 'POST',
                        headers:{
                            'Content-Type': 'application/json'
                        },
                        body:JSON.stringify({
                            ID:this.newdata.ID,
                            NAME:this.newdata.NAME,
                            UNIT:this.newdata.UNIT,
                            EMAIL:this.newdata.EMAIL,
                            // LOGINTIME:this.newdata.,
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
                    text: "所有欄位不得為空",
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
    // 要改成自己的版本 (li) label for/name/id ->ID  要大寫而且要一樣
    template:`
        <article class="backstage_box">
            <h2>修改<i @click="f_close" class="fa-regular fa-circle-xmark backstage_close_icon"></i></h2>
            <div class="backstage_box-content pt-30">
                <ul>
                    <li class="mb-16 input-short"><label for="ID">來賓ID</label>
                        <input type="text" name="ID" id="ID" v-model="newdata.ID" disabled>
                    </li>
                    <li class="mb-16 input-short"><label for="NAME">來賓名稱</label>
                        <input type="text" name="NAME" id="NAME" v-model.trim="newdata.NAME">
                    </li>
                    <li class="mb-16 input-long"><label for="UNIT">單位</label>
                        <textarea name="UNIT" id="UNIT" cols="30" rows="10" v-model.trim="newdata.UNIT"></textarea>
                    </li>
                    <li class="mb-16 input-short"><label for="EMAIL">電子郵件</label>
                        <input type="text" name="EMAIL" id="EMAIL" v-model.trim="newdata.EMAIL">
                    </li>
                    <li class="mb-16 input-short"><label for="LOGINTIME">登入日期</label>
                        <input type="date" name="LOGINTIME" id="LOGINTIME" v-model="newdata['LOGINTIME'].slice(0,10)" disabled>
                    </li>
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
// ========member1_來賓管理_table========
Vue.component('backstage_member1',{
    props:['tablename'],
    data(){
        return{
            box:null, //判斷要打開的彈窗
            titles:["來賓ID", "來賓名稱", "單位", "電子郵件", "登入日期", "操作"],  // 對照figma，來賓名稱etc.
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
            this.box='backstage_member1_edit'
        },
        // del(index){
        //     swal({
        //         title: "是否確定刪除?",
        //         icon: "warning",
        //         buttons: true,
        //         dangerMode: true,
        //     }).then((willDelete) => {
        //         if (willDelete) {
        //             fetch('php/backstage_member1_delete_guest.php', {
        //                 method: 'POST',
        //                 headers:{
        //                     'Content-Type': 'application/json'
        //                 },
        //                 body:JSON.stringify({
        //                     ID:this.datas[index].ID,
        //                 })
        //             }).then(resp =>resp.json())
        //             .then(body =>{
        //                 let {successful} =body
        //                 if(successful){
        //                     this.$swal({
        //                         title: "刪除成功",
        //                         icon: "success",
        //                         image: "",
        //                     }).then((willDelete) => {
        //                         fetch('php/backstage_member1_select_guest.php')
        //                         .then(resp =>resp.json())
        //                         .then(resp =>this.datas=resp)
        //                     })
        //                 }else{
        //                     this.$swal({
        //                         title: "刪除失敗",
        //                         icon: "error",
        //                         text: "請檢查欄位",
        //                     });
        //                 } 
        //             })
        //         }
        //     })
        // },
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
            fetch('php/backstage_member1_select_guest.php', {
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
        }
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
    <article class="-margin0auto pt-10 pb-10 table_outer">
        <h3 class="bg-color pall-15">{{tablename}}</h3>
        <div class="pall-10 bg-in-bgcolor">
            <input type='text' name='search' id='search' class='mb-2 mr-2' v-model="search_word" @keyup="search"><label for='search'><i class="fa-solid fa-magnifying-glass"></i></label>
            <ul class="bg-color -margin0auto backstage-grid title backstage-grid_member1">
                <li class="bg-color bg-in-secondcolor" v-for="title in titles">{{title}}</li>
            </ul>
            <ul class="bg-color -margin0auto backstage-grid backstage-grid_member1" v-for="(data, index) in datas">
                <li class="bg-color bg-in-secondcolor">{{data['ID']}}</li>
                <li class="bg-color bg-in-secondcolor">{{data['NAME']}}</li>
                <li class="bg-color bg-in-secondcolor">{{data['UNIT']}}</li>
                <li class="bg-color bg-in-secondcolor -word_break">{{data['EMAIL']}}</li>
                <li class="bg-color bg-in-secondcolor">{{data['LOGINTIME'].slice(0,10)}}</li>
                <li class="bg-color bg-in-secondcolor">
                    <div class="backstage_btn_td">
                        <button @click="edit(data, index)" class="backstage_btn backstage_btn_short">修改</button>
                    </div>
                </li>
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
    // function email
    mounted(){
        fetch('php/backstage_member1_select_guest.php', {
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
        .then(resp => {
            this.datas=resp.data
            this.data_count=resp.data_count[0][0]
            this.pages=Math.ceil(this.data_count/this.perpage)
        })
    },
})
// ========info4_聯絡我們_修改按鈕========
Vue.component('backstage_info4_edit', {
    props: ['row_data'],
    data() {
        return {
            newdata: '',
        }
    },
    methods: {
        f_save() {
            if (this.newdata.REPLY_CNT && this.newdata.REPLY_CNT != ""
                && this.newdata.STATUS != undefined && this.newdata.STATUS != null
            ) {
                console.log(this.newdata);
                // 確認所有欄位是否都有值
                // 確認開始日期是否小於結束日期
                // let starttime = (this.newdata.START_TIME).split('-').join('') '2020-01-01' [2020,01,01] '20200101'
                // let endtime = (this.newdata.END_TIME).split('-').join('') 20200410
                // if (starttime <= endtime) {
                //     console.log(starttime, endtime)
                fetch('php/backstage_info4_update_contact.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    //newdata.(大寫)
                    body: JSON.stringify({
                        REPLY_CNT: this.newdata.REPLY_CNT,
                        STATUS: this.newdata.STATUS,
                        ID: this.newdata.ID,
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
                                this.$emit('editsave')
                            })
                        } else {
                            this.$swal({
                                title: "儲存失敗",
                                icon: "error",
                                text: "請檢查欄位",
                            });
                        }
                    })
                // } else {
                //     this.$swal({
                //         title: "儲存失敗",
                //         icon: "error",
                //         text: "請確認日期是否正確",
                //     });
                // }
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
    //這裡是彈窗
    template: `
    <article class="backstage_box">
        <h2>修改<i @click="f_close" class="fa-regular fa-circle-xmark backstage_close_icon"></i></h2>
        <div class="backstage_box-content pt-30">
            <ul>
                <li class="mb-16 input-short"><label for="ID">ID</label>
                    <input type="text" name="ID" id="ID" v-model="newdata.ID" disabled>
                </li>
                <li class="mb-16 input-short"><label for="NAME">姓名</label>
                    <input type="text" name="NAME" id="NAME" v-model="newdata.NAME" disabled>
                </li>
                <li class="mb-16 input-long"><label for="CONTENT">訊息內容</label>
                    <textarea name="CONTENT" id="CONTENT" cols="30" rows="10" v-model="newdata.CONTENT" disabled></textarea>
                </li>
                <li class="mb-16 input-long"><label for="REPLY_CNT">回覆內容</label>
                    <textarea name="REPLY_CNT" id="REPLY_CNT" cols="30" rows="10" v-model="newdata.REPLY_CNT"></textarea>
                </li>
                <li class="mb-16 input-long"><label for="EMAIL">電子郵件</label>
                    <input type="text" name="EMAIL" id="EMAIL" v-model="newdata.EMAIL"disabled>
                </li>
                <li class="mb-16 input-long"><label for="PHONE">聯絡電話</label>
                    <input type="text" name="PHONE" id="PHONE" v-model="newdata.PHONE"disabled>
                </li>
                <li class="mb-16 input-long"><label for="COMPANY">公司名稱</label>
                    <input type="text" name="COMPANY" id="COMPANY" v-model="newdata.COMPANY"disabled>
                </li>
                <li class="mb-16 input-long"><label for="TYPE">展覽類型</label>
                    <input type="text" name="TYPE" id="TYPE" v-model="newdata.TYPE"disabled>
                </li>
                <li class="mb-16 input-long"><label for="TIME">留言時間</label>
                    <input type="text" name="TIME" id="TIME" v-model="newdata.TIME"disabled>
                </li>
                <div class="mb-16"><label>處理狀態</label><br>
                    <label for="finish"><input type="radio" name="STATUS" id="finish"  value=1 v-model="newdata.STATUS">已回覆</label>
                    <label for="notfinish"><input type="radio" name="STATUS" id="notfinish"  value=0 v-model="newdata.STATUS">尚未回覆</label>
                </div>
            </ul>                  
            <div class="backstage-insert-btn">
                <button class="backstage-insert_save" @click="f_save">儲存</button>
                <button class="backstage-insert_close" @click="f_close">關閉</button>
            </div>
        </div>
    </article>`,
    created() {
        //傳到上面props
        this.newdata = JSON.parse(JSON.stringify(this.row_data))
    },
})
// ========info4_聯絡我們_table========
Vue.component('backstage_info4', {
    props: ['tablename'],
    data() {
        return {
            box: null, //判斷要打開的彈窗
            titles: ["ID", "姓名", "電話", "電子郵件", "留言時間", "處理狀態", "操作"],
            datas: '', //每一頁的所有資料
            data_count: '', //資料庫的資料組數
            pages: 1,//總共有的頁數，目前所在的頁數
            perpage: 10, //每頁顯示幾筆
            inpage: 1, //當前頁數
            centersize: 5, // 過多頁數時顯示筆數
            row_data: null, //被選取那列的資料
            row_index: null, //被選取那列的序號
            search_word: '',//使用者搜尋內容
        }
    },
    methods: {
        search() {
            this.ajax(this.inpage)
        },
        edit(data, index) {
            this.row_data = data
            this.row_index = index
            this.box = 'backstage_info4_edit'
        },
        //刪除按鈕
        del(index) {
            swal({
                title: "是否確定刪除?",
                icon: "warning",
                buttons: true,
                dangerMode: true, //這個不知道
            }).then((willDelete) => {
                if (willDelete) {
                    fetch('php/backstage_info4_delete_contact.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            ID: this.datas[index].ID,
                        })
                    }).then(resp => resp.json())
                        .then(body => {
                            //這是ES6的解法
                            let { successful } = body
                            //let {successful:successful} = {successful:ture}
                            //當object的key和value一樣時可以簡寫為{key/value名稱}
                            //body是來自於上方resp
                            //let{ }

                            if (successful) {
                                this.$swal({
                                    title: "刪除成功",
                                    icon: "success",
                                    image: "",
                                    //在抓一次
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
        //以下單向操作的function
        editclose() {
            this.box = null
        },
        editsave() {
            this.box = null
            this.ajax(this.inpage)
        },
        changepage(page) {
            this.ajax(page)
        },
        previouspage() {
            if (this.inpage > 1) {
                let inpage = this.inpage - 1
                this.ajax(inpage)
            }
        },
        nextpage() {
            if (this.inpage < this.pages) {
                let inpage = this.inpage + 1
                this.ajax(inpage)
            }

        },
        ajax(inpage) {
            fetch('php/backstage_info4_select_contact.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    inpage: inpage,
                    perpage: this.perpage,
                    search_word: this.search_word,
                })
            })
                .then(resp => resp.json())
                .then(resp => {
                    console.log(resp);
                    this.datas = resp.data;
                    this.data_count = resp.data_count[0][0];
                    this.pages = Math.ceil(this.data_count / this.perpage);
                    this.inpage = inpage;
                    for (let i = 0; i < this.datas.length; i++) {
                        if (this.datas[i].STATUS == 1) {
                            this.datas[i].STATUSWORD = "已回覆"
                        } else {
                            this.datas[i].STATUSWORD = "尚未回覆"
                        }
                    }

                })
            // this.$forceupdate()
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
        <h3 class="bg-color pall-15">{{tablename}}</h3>
        <div class="pall-10 bg-in-bgcolor">
            <input type='text' name='search' id='search' class='mb-2 mr-2' v-model="search_word" @keyup="search"><label for='search'><i class="fa-solid fa-magnifying-glass"></i></label>
            <ul class="bg-color -margin0auto backstage-grid title backstage-grid_info4">
                <li class="bg-color bg-in-secondcolor" v-for="title in titles">{{title}}</li>
            </ul>
            <ul class="bg-color -margin0auto backstage-grid backstage-grid_info4" v-for="(data, index) in datas">
                <li class="bg-color bg-in-secondcolor">{{data.ID}}</li>
                <li class="bg-color bg-in-secondcolor">{{data.NAME}}</li>
                <li class="bg-color bg-in-secondcolor">{{data.PHONE}}</li>
                <li class="bg-color bg-in-secondcolor">{{data.EMAIL}}</li>
                <li class="bg-color bg-in-secondcolor">{{data.TIME}}</li>
                <li class="bg-color bg-in-secondcolor ">{{data.STATUSWORD}}</li>
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
        <component :is="box" @editclose="editclose" @editsave="editsave" :row_data="row_data"></component>
    </article>`,
    //mounted接收到php的資料
    mounted() {
        fetch('php/backstage_info4_select_contact.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                inpage: this.inpage,
                perpage: this.perpage,
                search_word: this.search_word,
            })
        })
            .then(resp => resp.json())
            .then(resp => {
                console.log(resp.data);
                this.datas = resp.data
                this.data_count = resp.data_count[0][0]
                this.pages = Math.ceil(this.data_count / this.perpage);
                for (let i = 0; i < this.datas.length; i++) {
                    if (this.datas[i].STATUS == 1) {
                        this.datas[i].STATUSWORD = "已回覆"
                    } else {
                        this.datas[i].STATUSWORD = "尚未回覆"
                    }
                }
            })
    },
})
// ========info3_新聞資訊_修改按鈕========
Vue.component('backstage_info3_edit', {
    props: ['row_data'],
    data() {
        return {
            newdata: '',
            image: '',
            file_name: '',
        }
    },
    methods: {
        f_save() { //判定欄位是否空值有沒有存在自己改!!!
            if (this.newdata.TIME && this.newdata.TIME != ""
                && this.newdata.CONTENT && this.newdata.CONTENT != ""
                && this.newdata.TITLE && this.newdata.TITLE != ""
                && this.newdata.LINK && this.newdata.LINK != ""
                && this.newdata.PHOTO && this.newdata.PHOTO != ""
                && this.newdata.STATUS && this.newdata.STATUS != ""
                && this.newdata.OPEN != null && this.newdata.OPEN != undefined) {
                // 確認所有欄位是否都有值
                let form_data = new FormData();
                form_data.append('datas', JSON.stringify({
                    ID: this.newdata.ID,
                    TIME: this.newdata.TIME, //前面TIME 傳給PHP PHP裡
                    CONTENT: this.newdata.CONTENT,
                    TITLE: this.newdata.TITLE,
                    LINK: this.newdata.LINK,
                    // PHOTO: this.newdata.PHOTO,
                    STATUS: "U",
                    OPEN: this.newdata.OPEN,
                }))
                form_data.append('file', this.file);
                fetch('php/backstage_info3_update_news.php', { //一定要再fetch一次
                    method: 'POST',
                    body: form_data,
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
        choosephoto() {
            let filechoose = document.querySelector(".filechoose")
            filechoose.click()
        },
        // selectedFile(e) {
        //     let file = e.target.files[0];
        //     let readFiles = new FileReader();
        //     readFiles.readAsDataURL(file);
        //     readFiles.addEventListener("load", this.loadImage);
        //     this.file_name = file.name;
        //     this.newdata[4] = URL.createObjectURL(file)
        // },
        // loadImage(e) {
        //     this.image = e.target.result;
        // },
        selectedFile(e) {
            let file = e.target.files[0];
            let readFiles = new FileReader();
            readFiles.readAsDataURL(file);
            readFiles.addEventListener("load", (e) => {
                this.newdata.PHOTO = e.target.result;
            });
            this.file_name = file.name;
            this.file = e.target.files[0]
            document.querySelector(".icon_img").style.opacity = "0";
        },
        dropfile(e) {
            if (e.dataTransfer.files.length > 0) {
                let reader = new FileReader()
                reader.readAsDataURL(e.dataTransfer.files[0])
                reader.addEventListener("load", () => {
                    this.newdata.PHOTO = reader.result;
                })
                this.file_name = e.dataTransfer.files[0].name;
                this.file = e.dataTransfer.files[0]
                document.querySelector(".icon_img").style.opacity = "0";
            }
        },
    },
    template: `
    <article class="backstage_box">
        <h2>修改<i @click="f_close" class="fa-regular fa-circle-xmark backstage_close_icon"></i></h2>
        <div class="backstage_box-content pt-30">
            <ul>
                <li class="mb-16 input-short"><label for="id">策展ID</label>
                    <input type="text" name="id" id="id" v-model="newdata.ID" disabled>
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
                    <input type="text" name="LINK" id="LINK" v-model="newdata.LINK">
                </li>
                <div class="mb-16 input-long input-file">
                <label for="PHOTO">新聞照片</label>
                <input type="file" class="filechoose -hide" name="filechoose" id="filechoose" @change="selectedFile">
                <input type="text" class="filename" name="filename" id="filename" :value="file_name" disabled>
                <button @click="choosephoto">上傳</button>
                <div class="backstage_input-file-img"  @dragover.prevent="" @drop.prevent="dropfile">
                <i class="fa-solid fa-image icon_img"></i>
                <img id="PHOTO" class="img-update" :src="newdata.PHOTO"><!--雙向綁定到base64為了讓圖片顯示在頁面上-->
            </div>
                </div>
                <div class="mb-16"><label>審核狀態</label><br>
                    <label for="show"><input type="radio" name="OPEN" id="notwork" value="1" v-model="newdata.OPEN">顯示</label>
                    <label for="notshow"><input type="radio" name="OPEN" id="working" value="0" v-model="newdata.OPEN">不顯示</label>
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
// ========info3_新聞資訊_後台新增按鈕========
Vue.component('backstage_info3_add', {
    data() {
        return {
            newdata: {
                TIME: '',
                CONTENT: '',
                TITLE: '',
                LINK: '',
                PHOTO: '',
                STATUS: '',
                OPEN: '',
            },
            file_name: '',
            file: '',
        }
    },
    methods: {
        f_save() {
            if (this.newdata.TIME != "" &&
                this.newdata.CONTENT != "" &&
                this.newdata.TITLE != "" &&
                this.newdata.LINK != "" &&
                this.newdata.PHOTO != "" &&
                this.newdata.OPEN != "") {
                // 確認所有欄位是否都有值 
                form_data = new FormData();
                form_data.append('datas', JSON.stringify({
                    TIME: this.newdata.TIME, //前面TIME 傳給PHP PHP裡
                    CONTENT: this.newdata.CONTENT,
                    TITLE: this.newdata.TITLE,
                    LINK: this.newdata.LINK,
                    PHOTO: this.newdata.PHOTO,
                    STATUS: "I",
                    OPEN: this.newdata.OPEN,
                }))
                form_data.append('file', this.file);
                fetch('php/backstage_info3_insert_news.php', {
                    method: 'POST',
                    body: form_data,
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
            readFiles.addEventListener("load", (e) => {
                this.newdata.PHOTO = e.target.result;
            });
            this.file_name = file.name;
            this.file = e.target.files[0]
            document.querySelector(".icon_img").style.opacity = "0";
        },
        dropfile(e) {
            if (e.dataTransfer.files.length > 0) {
                let reader = new FileReader()
                reader.readAsDataURL(e.dataTransfer.files[0])
                reader.addEventListener("load", () => {
                    this.newdata.PHOTO = reader.result;
                })
                this.file_name = e.dataTransfer.files[0].name;
                this.file = e.dataTransfer.files[0]
                document.querySelector(".icon_img").style.opacity = "0";
            }
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
                    <input type="text" name="LINK" id="LINK" v-model="newdata.LINK">
                </li>
                <div class="mb-16 input-long input-file">
                <label for="PHOTO">新聞照片</label>
                <input type="file" class="filechoose -hide" name="filechoose" id="filechoose" @change="selectedFile">
                <input type="text" class="filename" name="filename" id="filename" :value="file_name" disabled>
                <button @click="choosephoto">上傳</button>
                <div class="backstage_input-file-img"  @dragover.prevent="" @drop.prevent="dropfile">
                <i class="fa-solid fa-image icon_img"></i>
                <img id="PHOTO" class="img-update" :src="newdata.PHOTO"><!--雙向綁定到base64為了讓圖片顯示在頁面上-->
            </div>
                </div>
                <div class="mb-16"><label>審核狀態</label><br>
                    <label for="show"><input type="radio" name="OPEN" id="notwork" value="1" v-model="newdata.OPEN">顯示</label>
                    <label for="notshow"><input type="radio" name="OPEN" id="working" value="0" v-model="newdata.OPEN">不顯示</label>
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
Vue.component('backstage_info3', {
    props: ['tablename'], //上傳下 最外圍page>component
    data() {   // 變數放這裡! 
        return {
            box: null, //判斷要打開的彈窗
            titles: ["ID", "新聞標題", "連結", "狀態", "操作"], //改自己頁面title 新聞標題
            datas: '', //每一頁的所有資料
            data_count: '', //資料庫的資料組數
            pages: 1,//總共有的頁數，目前所在的頁數
            perpage: 10, //每頁顯示幾筆
            inpage: 1, //當前頁數
            centersize: 5, // 過多頁數時顯示筆數
            row_data: null, //被選取那列的資料
            row_index: null, //被選取那列的序號
            search_word: '',
        }
    },
    methods: {   //函數方法大部分放這
        search(){
            this.ajax(this.inpage)
        }, //搜尋功能
        switchbtn(index) {
            this.update(index)
            // console.log("open" + this.datas[index].OPEN);
            if (this.datas[index].OPEN_1 == true) {
                this.datas[index].OPEN = 1
            } else {
                this.datas[index].OPEN = 0
            } //為了後面操作頁面修改讀的到
        },
        edit(data, index) {
            this.row_data = data
            this.row_index = index
            this.box = 'backstage_info3_edit'
        },
        del(index) {
            swal({
                title: "是否確定刪除?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then((willDelete) => {
                if (willDelete) {
                    fetch('php/backstage_info3_delete_news.php', {
                        method: 'POST', //傳到php
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            ID: this.datas[index].ID,
                        })
                    }).then(resp => resp.json())//接收
                        .then(body => {
                            let { successful } = body
                            if (successful) {
                                this.$swal({
                                    title: "刪除成功",
                                    icon: "success",
                                    image: "",
                                }).then((willDelete) => {
                                   this.ajax(this.inpage);
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
        editclose() {
            this.box = null
        },
        editsave() {
            this.box = null
            this.ajax(this.inpage)
        },
        addclose() {
            this.box = null
        },
        addsave() {
            this.box = null
            this.ajax(this.inpage)
        },
        changepage(page) {
            this.ajax(page)
        },
        previouspage() {
            if (this.inpage > 1) {
                let inpage = this.inpage - 1
                this.ajax(inpage)
            }
        },
        nextpage() {
            if (this.inpage < this.pages) {
                let inpage = this.inpage + 1
                this.ajax(inpage)
            }

        },
        ajax(inpage) {
            fetch('php/backstage_info3_select_news.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    inpage: inpage,
                    perpage: this.perpage,
                    search_word: this.search_word,
                })
            })
                .then(resp => resp.json())
                .then(resp => {
                      // 先看resp是什麼用c
                    // console.log(resp);
                    this.datas = resp.data
                      // 塞在裡面的裡面
                    this.data_count = resp.data_count[0][0]
                     // pages是分幾頁，math無條件進位 11/10 =1.1 無條件進位 = 2
                    this.pages = Math.ceil(this.data_count / this.perpage)
                    this.inpage = inpage
                    for (let i = 0; i < this.datas.length; i++) {
                        if (this.datas[i].OPEN == 0) {
                            this.datas[i].OPEN_1 = false
                        } else {
                            this.datas[i].OPEN_1 = true
                        }
                    }
                })
        },
        update(index) {
            fetch('php/backstage_info3_update_open.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ID: this.datas[index].ID,
                    OPEN: this.datas[index].OPEN_1//傳true false
                })
            }).then(resp => resp.json())
                .then(body => {
                    let { successful } = body
                    if (successful) {
                        this.$swal({
                            title: "修改成功",
                            icon: "success",
                            image: "",
                        })
                    } else {
                        this.$swal({
                            title: "修改失敗",
                            icon: "error",
                            text: "請檢查資料",
                        });
                    }
                })
        },
    },
    computed: { //函數方法也可以放這，但是放在這裡的函數不能傳參數  用寫小(),一定要有傳回值
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
    //以下要改
    template: `
    <article class="-margin0auto pt-10 pb-10 table_outer">
        <button @click="box='backstage_info3_add'" class=" backstage_btn backstage_btn_add mb-15">新增</button>
        <h3 class="bg-color pall-15">{{tablename}}</h3>
        <div class="pall-10 bg-in-bgcolor">
        <input type='text' name='search' id='search' class='mb-2 mr-2' v-model="search_word" @keyup="search"><label for='search'><i class="fa-solid fa-magnifying-glass"></i></label>    
        <ul class="bg-color -margin0auto backstage-grid title backstage-grid_info3">
                <li class="bg-color bg-in-secondcolor" v-for="title in titles">{{title}}</li>
            </ul>
            <ul class="bg-color -margin0auto backstage-grid backstage-grid_info3" v-for="(data, index) in datas">
                <li class="bg-color bg-in-secondcolor">{{data.ID}}</li>
                <li class="bg-color bg-in-secondcolor">{{data.TITLE}}</li>
                <li class="bg-color bg-in-secondcolor -word_break">{{data.LINK}}</li>
                <!--<li class="bg-color bg-in-secondcolor">{{data.STATUS}}</li>-->
                <li class="bg-color bg-in-secondcolor"><div class="backstage_btn_td switch_flex">
                不顯示
                <div class="custom-control custom-switch">   
                    <input type="checkbox" class="custom-control-input" :id="['customSwitch-' + data.ID]" v-model="data.OPEN_1" @change="switchbtn(index)">
                    <label class="custom-control-label" :for="['customSwitch-' + data.ID]"></label>
                </div>
                顯示
            </div> </li>
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
    mounted() {
        fetch('php/backstage_info3_select_news.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
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
                for (let i = 0; i < this.datas.length; i++) {
                    if (this.datas[i].OPEN == 0) {
                        this.datas[i].OPEN_1 = false
                    } else {
                        this.datas[i].OPEN_1 = true
                    }
                }
            
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
                        <textarea name="INTRODUCR" id="INTRODUCR" cols="30" rows="10" v-model="newdata.INTRODUCE"></textarea>
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
        table: '',
        pages: [
            ["資訊管理", [
            {
                pagename: "策展場次",
                href: "backstage_info1",
            }, {
                pagename: "大會講師",
                href: "backstage_info2",
            }, {
                pagename: "新聞資訊",
                href: "backstage_info3",
            }, {
                pagename: "聯絡我們",
                href:"backstage_info4",
                onpage:false,
                },],],
            ["會員管理",[
                {
                    pagename: "來賓管理",
                    href:"backstage_member1",
                },{
                    pagename: "廠商管理",
                    href:"backstage_member2",
                },],],
            ["活動管理",[
                {
                    pagename: "參展廠商",
                    href:"backstage_expo1",
                },{
                    pagename: "直播時段",
                    href:"backstage_expo2",
                },{
                    pagename: "直播審核表",
                    href:"backstage_expo3",
                },{
                    pagename: "直播留言板",
                    href:"backstage_expo4",
                },],],
        ],
        tablename:"",
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
            sessionStorage.setItem('user_tname', this.tablename)
            sessionStorage.setItem('user_page', this.table)
        },
    },
    created(){
        
        let type=sessionStorage.getItem("login_type")
        if(type !="USER"){
            document.location.href='index.html'
        }
        let staypage=sessionStorage.getItem("user_page")
        let tname=sessionStorage.getItem("user_tname")
        if(staypage){
            this.table=staypage
            this.tablename=tname
        }else{
            this.table="backstage_info1"
            this.tablename="策展場次"
            sessionStorage.setItem('user_page', this.table)
            sessionStorage.setItem('user_tname', this.tablename)
        }
    }
})

let logout=document.querySelector('.backstage_logout')
logout.addEventListener('click', function(){
    sessionStorage.clear();
    document.location.href='index.html'
})


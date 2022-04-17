// ========expo3_直播審核表_table========
Vue.component('backstage_expo3',{
    prompt:['tablename'],
    data() {
        return {
            box:null,
            titles:["直播ID","廠商名稱","開始時間","結束時間","申請時間","狀態","操作"],
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
                })
            // this.$forceupdate()
        }
    },
    computed:{
        centerpage(){
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
                <li class="bg-color bg-in-secondcolor">{{data.START_TIME}}</li>
                <li class="bg-color bg-in-secondcolor">{{data.APPLY_TIME}}</li>
                <li class="bg-color bg-in-secondcolor">{{data.OPEN}}</li>
                <li class="bg-color bg-in-secondcolor"><div class="backstage_btn_td"><button @click="edit(data, index)" class="backstage_btn backstage_btn_short">修改</button></div></li>
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
            })
    },
})
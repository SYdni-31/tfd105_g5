// ========expo4_直播留言板_table========
Vue.component('backstage_expo4',{
    props:['tablename'],
    data(){
        return{
            box:null, //判斷要打開的彈窗
            titles:["ID", "直播ID", "留言者", "留言內容", "操作"],
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
                <li class="bg-color bg-in-secondcolor">{{data['LIVE_LIST_ID']}}</li>
                <li class="bg-color bg-in-secondcolor">{{data['NAME']}}</li>  <!--COMPANY_ID/ GUEST_ID條件顯示用 ||測試OK-->
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

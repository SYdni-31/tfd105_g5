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
            pages:1,//總共有的頁數，目前所在的頁數
            perpage:10, //每頁顯示幾筆
            inpage:1, //當前頁數
            centersize:5, // 過多頁數時顯示筆數
            row_data:null, //被選取那列的資料
            row_index:null, //被選取那列的序號
        }
    },
    methods:{
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
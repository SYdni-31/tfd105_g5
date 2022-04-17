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
                <button @click.prevent='changepage(pages)' class='backstage_pages_btn pr-2 pl-2' :class="{'action':inpage==pages}">{{pages}}</button>
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
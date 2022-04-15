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
                    if (this.newdata.START_TIME)
                        fetch('php/backstage_expo2_update_expo.php', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            // 欄位全部大寫
                            body: JSON.stringify({
                                ID: this.newdata.ID,
                                START_TIME: this.newdata.START_TIME,
                                END_TIME: this.newdata.END_TIME,
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
                    this.$emit('editclose')
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
                    fetch('php/backstage_expo2_insert_expo.php', {
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
                <li class="mb-16 input-short"><label for="id">時段ID</label>
                    <input type="text" name="id" id="id" value="自動編號" disabled>
                </li>
                <div class="mb-16 input-short"><label>直播狀態</label><br>
                    <label for="working"><input type="radio" name="OPEN" id="working" value="0" v-model="newdata.OPEN">啟用</label>
                    <label for="notwork"><input type="radio" name="OPEN" id="notwork" value="1" v-model="newdata.OPEN">不啟用</label>
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
        }
    },
    methods: {
        edit(data, index) {
            this.row_data = data
            this.row_index = index
            this.box = 'backstage_expo2_edit'
        },
        del(index) {
            swal({
                title: "是否確定刪除?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then((willDelete) => {
                if (willDelete) {
                    fetch('php/backstage_expo2_delete_expo.php', {
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
                                    fetch('php/backstage_expo2_select_expo.php')
                                        .then(resp => resp.json())
                                        .then(resp => this.datas = resp)
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
            fetch('php/backstage_expo2_select_expo.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    inpage: inpage,
                    perpage: this.perpage,
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
        <button @click="box='backstage_expo2_add'" class=" backstage_btn backstage_btn_add mb-15">新增</button>
        <h3 class="bg-color pall-15">{{tablename}}</h3>
        <div class="pall-10 bg-in-bgcolor">
            <ul class="bg-color -margin0auto backstage-grid title backstage-grid_expo2">
                <li class="bg-color bg-in-secondcolor" v-for="title in titles">{{title}}</li>
            </ul>
            <ul class="bg-color -margin0auto backstage-grid backstage-grid_expo2" v-for="(data, index) in datas">
                <li class="bg-color bg-in-secondcolor">{{data[0]}}</li>
                <li class="bg-color bg-in-secondcolor">{{data[1]}}</li>
                <li class="bg-color bg-in-secondcolor">{{data[2]}}</li>
                <li class="bg-color bg-in-secondcolor">{{data[4]}}</li>
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
    mounted() {
        fetch('php/backstage_expo2_select_expo.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                inpage: this.inpage,
                perpage: this.perpage,
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
    },
})
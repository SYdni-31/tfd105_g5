// ========info3_展覽場次_修改按鈕========
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
// ========info3_展覽場次_後台新增按鈕========
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
const view = new Vue({
    el:"#companyback_info",
    data(){
        return{
        datas: '',
        who_id:'',
        img_data:'',
        picture:'',
        }
    },
    methods: {
        chooselogo(){
            let logo_file = document.querySelector(".logo_file");
            logo_file.click();
        },
        change(e){
        //   let chang_img = document.querySelector(".logo_file")
        //   console.log(chang_img.files[0]);
        //   this.img_data=chang_img.files[0];
        // //   this.load(chang_img.files[0]);
        // // },
        // // load(img) {
        //     const filereader = new FileReader();
        //     filereader.readAsDataURL(chang_img.files[0]);
        //     filereader.addEventListener('load', function () {
        //         let img_block = document.getElementById('preview');
        //         // img_block.setAttribute("src",`${filereader.result}`);
        //         this.LOGO = filereader.result;
        //         // img_block.src = this.picture ;
        //     })
            let file = e.target.files[0];
            console.log(file)
            let readFiles = new FileReader();
            readFiles.readAsDataURL(file);
            readFiles.addEventListener("load", (e)=>{
                this.datas.LOGO = e.target.result;
            });
            this.img_data=file
        },
        //更新新資料
        formData(){
            const fromData = new FormData();
            youtubeRule =/^https\:\/\/www\.youtube\.com\//;
            //fromData分成圖片和一般資料
            fromData.append(
                "updated_data", JSON.stringify({
                EXPO_NAME:this.datas.EXPO_NAME,
                NAME:this.datas.NAME,
                VIDEO:this.datas.VIDEO,
                INTRODUCE:this.datas.INTRODUCE,
                ROBOT:this.datas.ROBOT,
                TYPE:this.datas.TYPE,
                ID:this.datas.ID,
                }),
            );
            fromData.append("file",this.img_data)
            // console.log(fromData);
            if(this.datas.ROBOT !== null && this.datas.TYPE!== null && this.datas.INTRODUCE !=="" &&this.datas.LOGO !==null
                ){
                    if(youtubeRule.test(this.datas.VIDEO)){
                        fetch('php/companyback_info_update_company_info.php',{
                            method:'POST',
                            body: fromData,
                        })
                        .then(resp=>resp.json())
                        .then(resp=>{
                        let successful = resp.successful
                                if(successful){
                                    this.$swal({
                                        title:"儲存成功",
                                        icon:"success",
                                        image: "",
                                        }).then(resp=>
                                            {
                                                location.href = "././companyback_tech.html";
                                            }
                                        )         
                                }else{
                                    this.$swal({
                                        title:"儲存失敗",
                                        icon:"error",
                                        image:"",
                                    })
                                }
                            }
                                
                        )
                    }else{
                        this.$swal({
                            title:"輸入失敗",
                            text:"請輸入youtube網址",
                            icon:"error",
                            image:"",
                        })
                    }
                }
                else {
                    this.$swal({
                        title:"儲存失敗",
                        text:"請填寫完整欄位",
                        icon:"error",
                        image:"",
                    })
                }
        }
    },


    created() {
        let info = sessionStorage.getItem("login_info");
        if(info!=null){
            this.who_id = sessionStorage['login_id'];
            // this.company_info = info;
        }else{
            document.location.href="index.html";
        }
    },
    mounted() {
        fetch('php/companyback_info_select_company_info.php',{
            method: 'POST',
            body: JSON.stringify({
                ID:this.who_id,
            })
        })
        .then(response =>response.json())
        .then(response=>
        {
            this.datas = response[0];
            this.LOGO=response[0].LOGO
        }
        )
    },
})




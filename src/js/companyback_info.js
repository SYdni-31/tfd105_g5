const view = new Vue({
    el:"#companyback_info",
    data(){
        return{
        datas: '',
        who_id:'',
        img_data:'',
        }
    },
    methods: {
        chooselogo(){
            let logo_file = document.querySelector(".logo_file");
            logo_file.click();
        },
        change(){
          let chang_img = document.querySelector(".logo_file")
          console.log(chang_img.files[0]);
          this.img_data=chang_img.files[0];
          this.load(chang_img.files[0]);
        },
        load(img) {
            const filereader = new FileReader();
            filereader.readAsDataURL(img);
            filereader.addEventListener('load', function (e) {
            let img_block = document.getElementById('preview');
            img_block.src = filereader.result ;
        })
        },
        //更新新資料
        formData(){
            const fromData = new FormData();
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
        }
    },
    created() {
        this.who_id = sessionStorage['login_id'];
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
            console.log(response[0]);
            this.datas = response[0];
        }
        )
    },
})

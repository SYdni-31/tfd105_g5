const vm = new Vue({
    el:'#cblook',
    data:{
      looks:'',
      techs:'',
      little_page:"about",
      info_id:'',
      txts:'',
    },
    methods:{
        little(i){
            this.little_page=i
        },
        onboard(){
            fetch('php/companyback_look_update_company_info.php',{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    ID:this.info_id,
                })
            }).then(resp => resp.json())
            .then(resp => {
                let {successful} =resp
                if(successful){
                    this.$swal({
                        title: "上架成功",
                        icon: "success",
                        image: "",
                    }).then((willDelete) => {
                        document.location.href='companyback.html'
                    })

                } else {
                    this.$swal({
                        title: "上架失敗",
                        icon: "error",
                        text: "請重新確認資料是否正確",
                    });
                }
            })
        },
    },
    created(){
        let info=sessionStorage.getItem("login_info")
        if(info !=null){
            this.info_id=info
        }else{
            document.location.href='index.html'
        }
        fetch('php/companyback_look_select_company_info.php',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                id:this.info_id
            })
        }).then(resp => resp.json())
        .then(resp => {
            this.looks=resp.rooms
            this.techs=resp.tech
            console.log(resp)
            let txt=resp.rooms[0].INTRODUCE.split('\n');
            this.txts=txt;
        })

    }
})
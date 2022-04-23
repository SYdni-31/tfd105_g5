const vm = new Vue({
    el:'#cblook',
    data:{
      looks:'',
      techs:'',
      little_page:"about",
      info_id:1,
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
        })

    }
})
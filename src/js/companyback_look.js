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
            this.looks=resp.rooms[0]
            this.techs=resp.tech
        })

    }
})
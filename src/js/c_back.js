// "use strict";


const view = new Vue({
    el:".companyback_dateform",
    data(){
        return{
            LINK:"",
            DATE:"",
            TIME:[],
            chose_time:"",
            TIME_ID:"",
            date_obj:"",
            company_info:"",
        }
    },
    methods: {
        insertsql(){
            emailRule =/^https\:\/\/www\.youtube\.com\//;
            let email = document.querySelector(".c_link").value;
            if(emailRule.test(email)){
                // alert("true");
                fetch('php/c_back_insert_agenda_time.php',{
                    method:'POST',
                    body:JSON.stringify({
                        DATE:this.DATE,
                        LINK:this.LINK,
                        ID:this.TIME_ID,        
                    })
                }).then(go_data=>go_data.json())
                .then(go_data=>{
                    console.log(go_data);
                    let {successful} = go_data;
                    if(successful){
                        this.$swal({
                            title:"新增成功",
                            icon:"success",
                            image: "",
                            });        
                    }else{
                        this.$swal({
                            title:"新增失敗",
                            text:"格式錯誤或是必填欄位未輸入!",
                            icon:"error",
                            image:"",
                        });
                    }
                })
            }else{
                this.$swal({
                    title:"輸入失敗",
                    text:"請輸入youtube網址",
                    icon:"error",
                    image:"",
                });
            };
            document.querySelector(".companyback_dateform").reset();
            this.LINK="";
            this.DATE="";
            this.TIME=[];
            this.TIME_ID="";
            this.date_obj.clear();
        }
    },
    watch:{
        DATE:{
            handler(newValue, oldValue){
                // console.log(newValue)
                fetch('php/c_back_select2_agenda_time.php',{
                method: 'POST',
                body:JSON.stringify({
                    DATE:newValue,
                })
                    }).then(resp=>resp.json())
                .then(resp=>{ 
                    for(let values of resp){
                        delete values[0];
                        delete values[1];
                        // console.log(values);
                        this.TIME.push(values);       
                        // this.timeandid.time=values[0];
                        // this.timeandid.id=values[1];
                        // this.TIME.push(values[0]);
                        // this.TIME.push(values[1]);
                        // eval("this.timeandid.time"+values[0]+"="+values[1]);
                    }
                })
                this.TIME = []
            },
        },
    },
    created(){
        let info = sessionStorage.getItem("login_info");
        if(info!=null){
            this.company_info = info;
        }else{
            document.location.href="index.html";
        }
    },
    mounted() {
        let date_time =[];
        fetch(
            'php/c_back_select1_agenda_time.php',{
                method:'POST',
                body:JSON.stringify({
                })
                //為甚麼then第一層一定要用json()不能加大誇號也不能加引號
                //json() = json格式的字串轉乘javascript的物件
        }).then(
            resp=>{
                return resp.json();
            }
        ).then(resp=>{
            for(let values of resp){
                // console.log(values[0])
                date_time.push(values[0]);
            }
            // for(let i = 0;i<resp.length;i++){
            //     console.log(resp[i]);
            //     date_time.push(resp[i][0]);
            // }
           this.$nextTick(()=>
           {
            this.date_obj = flatpickr("input[type=datetime-local]", {
            // mode: "range",
            minDate: "today", 
            dateFormat: "Y-m-d",
            inline: true,
            disable: date_time
          })
        //   flatpickr(".timepicker", {
        //     enableTime: true,
        //     noCalendar: true,
        //     dateFormat: "H:i-K",
        //     // mode: "range",
        //     minTime: "13:00",
        //     maxTime: "16:00",
        //   })
        })      
    })
},
})

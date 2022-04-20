// 輸入的訊息內容
Vue.component('todo-item', {
  props: ['name', 'message'],
  template: `
  <ul class="search-list">
    <li class="search-li">
    <div class="search-li-icon">
        <i class="fa-solid fa-user"></i>
    </div>
    <div>
      <div class="item-name">
      {{name}}
      </div>
      <div class="item-block">
        <div class="title-block">{{message}}</div>

      </div>
      </div>
    </li>
  </ul>
  `,
});

// 控制全部
new Vue({
  el: '#live_container', //在這講是給誰執行
  data() {
    return {
      rwdOpen: false, //rwd的收合
      pcOpen: false,  //pc的收合
      task: '',  //輸入留言的欄位
      tasks: [   //留言顯示的內容與姓名
      ],
      AGENDA_ID: '',
      C_NAME:'',
      C_EMAIL:'',
      LINK:'',
    };
  },
  mounted: function () {
    this.$nextTick(function () {
      fetch('php/live_select_text.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(resp => resp.json())
        .then(resp => {
          // 把所有留言顯示
          // console.log("resp:" + resp);
          // console.log("resp:" + resp.data);
          for (i = 0; i < resp.data.length; i++) {
            this.tasks.push({
              name: resp.data[i].NAME,
              message: resp.data[i].CONTENT,
            });
          }
          this.AGENDA_ID = resp.data[0].AGENDA_ID;
          // 把留言全部用到最底下
          $(".result-block").animate({ scrollTop: $('.result-block')[0].scrollHeight });
          $(".result-block-rwd").animate({ scrollTop: $('.result-block')[0].scrollHeight });
        });

      fetch('php/live_select_agenda.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(resp => resp.json())
        .then(resp => {
          // 把所有留言顯示
          console.log("resp:" + resp);
          console.log("resp:" + resp.data);
          this.C_NAME = resp.data[0].NAME;
          this.C_EMAIL = resp.data[0].EMAIL;
          this.LINK = resp.data[0].LINK;
          // 把留言全部用到最底下
          $(".result-block").animate({ scrollTop: $('.result-block')[0].scrollHeight });
          $(".result-block-rwd").animate({ scrollTop: $('.result-block')[0].scrollHeight });
        });
    })
  },
  methods: {
    // 控制pc版收合
    toggle() {
      this.pcOpen = !this.pcOpen;
    },
    // 控制rwd版收合
    toggle_rwd() {
      this.rwdOpen = !this.rwdOpen
    },
    // pc版點擊送出
    text_save() {
      const input_text = $(".live-text-input").val().trim();
      if (input_text != '') {
        this.tasks.push({
          name: "王大明",
          message: input_text,
        });
        fetch('php/live_insert_text.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            CONTENT: input_text,
            STATUS: "I",
            COMPANY_ID: "1",
            GUEST_ID: null,
          })
        }).then(resp => resp.json())
          .then(body => {
            let { successful } = body;
            if (successful) {

              console.log("成功");
            } else {
              console.log("失敗");
            }
          })
        // 重點1：以下方式取得 section.result-block(藍框) 的可捲動區域高度(不含邊框)
        //console.log( $('section.result-block').prop("scrollHeight") );

        // 重點2：透過 animate 使用 scrollTop 指定要滑動到離上方指定位置
        $(".result-block").animate({ scrollTop: $('.result-block')[0].scrollHeight });
        $(".result-block-rwd").animate({ scrollTop: $('.result-block')[0].scrollHeight });


        // 欄位清空
        this.task = "";

      } else {
        alert("請輸入資料");
      }
    },
    // rwd版點擊送出
    text_save_rwd() {
      const input_text = $(".live-text-input-rwd").val().trim();
      if (input_text != '') {
        this.tasks.push({
          name: "王大明",
          message: input_text,
        });
        fetch('php/live_insert_text.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            CONTENT: input_text,
            STATUS: "I",
            COMPANY_ID: "1",
            GUEST_ID: null,
            AGENDA_ID: "1",
          })
        }).then(resp => resp.json())
          .then(body => {
            let { successful } = body;
            if (successful) {

              console.log("成功");
            } else {
              console.log("失敗");
            }
          })
        // 重點1：以下方式取得 section.result-block(藍框) 的可捲動區域高度(不含邊框)
        //console.log( $('section.result-block').prop("scrollHeight") );

        // 重點2：透過 animate 使用 scrollTop 指定要滑動到離上方指定位置
        $(".result-block").animate({ scrollTop: $('.result-block-rwd')[0].scrollHeight }, 10);
        $(".result-block-rwd").animate({ scrollTop: $('.result-block-rwd')[0].scrollHeight }, 10);

        // 欄位清空
        this.task = "";

      } else {
        alert("請輸入資料");
      }
    },

  },
}); //給初值，在裡面描述屬性跟方法，包在物件{}裡

// aos 動畫
AOS.init();

$(function () {
  // 影片判斷
  if ($(".live-viedo").attr("src") == "") {
    // alert("無直播");

  } else {
    // alert("有直播");
  }

  // PC訊息輸入完畢，enter送出
  $(".live-text-input").on("keydown", function (e) {
    // console.log(e.which);
    if (e.which == 13) {
      $(".live-submit").click();
    }
  });
  // RWD訊息輸入完畢，enter送出
  $(".live-text-input-rwd").on("keydown", function (e) {
    // console.log(e.which);
    if (e.which == 13) {
      $(".live-submit-rwd").click();
    }
  });


});
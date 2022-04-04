$(function () {
  // 影片判斷
  if ($(".live-viedo").attr("src") == "") {
    // alert("無直播");

  } else {
    // alert("有直播");
  }
  // 點擊收合留言板
  // $("#live-icon-img").on("click", function () {
  //   $("#live-icon-img").toggleClass("-transform-180");
  //   $(".live-board-container").toggleClass("-live-on");
  //   // 要關閉，快點消失
  //   if ($("#live-icon-img").attr("class") == "-transform-180") {
  //     setTimeout(live_text, 50);
  //     // 要開啟，要慢點出現
  //   } else {
  //     setTimeout(live_text, 700);
  //   }
  // });

  // 點擊收合留言板(RWD)
  // $("#live-icon-img-rwd").on("click", function () {
  //   $("#live-icon-img-rwd").toggleClass("-transform-90");
  //   $(".live-board-container").toggleClass("-live-on");

  //   $("#search-container-title-h3").toggleClass("-hide");
  //   $(".input-block").toggleClass("-live-border-hide");
  //   $(".input-block").toggleClass("-live-input-hide");
  //   $(".search-container-title").toggleClass("-live-border-hide");
  //   $(".live-text-input").toggleClass("-hide");
  //   $("#live-submit").toggleClass("-hide");
  //   $(".search-container").toggleClass("-hide");
  //   $(".result-block").toggleClass("live-height");
  //   $(".live-board").toggleClass("-live-border-hide-0");

  // });

  // function live_text() {
  //   $("#search-container-title-h3").toggleClass("-hide");
  //   $(".input-block").toggleClass("-live-border-hide");
  //   $(".search-container-title").toggleClass("-live-border-hide");
  //   $(".live-text-input").toggleClass("-live-text-input-hide");
  //   $("#live-submit").toggleClass("-hide");
  //   $(".search-container").toggleClass("-hide");
  //   $(".result-block").toggleClass("live-height");
  // }
  
  $(".live-text-input").on("keydown", function (e) {
    // console.log(e.which);
    if (e.which == 13) {
      $("#live-submit").click();
    }
  });

  //PC版點擊 "送出"
  $(".live-submit").on("click", function () {
    const input_text = $(".live-text-input").val().trim();
    console.log(input_text);
    if (input_text == "") {
      alert("請輸入資料");
    } else {
      let html = `
          <ul class="search-list">
            <li class="search-li">
            <div class="search-li-icon">
                <i class="fa-solid fa-user"></i>
            </div>
            <div>
              <div class="item-name">
              王大明
              </div>
              <div class="item-block">
                <div class="title-block">${input_text}</div>

              </div>
              </div>
            </li>
          </ul>
        `;

      $("div.search-container").append(html);

      // 重點1：以下方式取得 section.result-block(藍框) 的可捲動區域高度(不含邊框)
      //console.log( $('section.result-block').prop("scrollHeight") );

      // 重點2：透過 animate 使用 scrollTop 指定要滑動到離上方指定位置
      $(".result-block").animate({ scrollTop: $('.result-block')[0].scrollHeight}, 9999);
      $(".result-block").animate({ scrollTop: $('.result-block')[1].scrollHeight}, 9999);



    }

    // // 上課測試
    // const input = $(".live-text-input");
    // // 在這裡改成php網址
    // // const url = "https://jsonplaceholder.typicode.com/todos/";
    // const url = "http://10.2.0.84:8080/spring-exercise/test/login";
    // // fetch() 會回傳Promise物件
    // fetch(`${url}${input.val()}`)
    // // .then(自己取的名字 => 自己取的名字.json())
    //   .then(resp => resp.json())
    //   .then(body => console.log(body));
    // ;


    // 第二個測試
    // const url = "login.php";

    // const username = $("#username");
    // const password = $("#password");
    // fetch(url, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     username: $("#username").val(),
    //     password: $("#password").val()
    //   })
    // })
    //   .then(resp => resp.json())
    //   .then(body => {
    //     const { successful, NICKNAME } = body;
    //     // div.textContent = successful ? nickname : message;
    //     if (successful) {
    //       $(".test-div").text(NICKNAME);
    //     } else {
    //       $(".test-div").text("");
    //     }
    //   });



    // // 測試欄位
    // $("#username").val("");
    // $("#password").val("");

    // 上傳圖片
    // const url = "http://10.2.0.84:8080/spring-exercise/test/fileUpload";
    // const file = $("#file-test")[0].files[0];
    // const fileReader = new FileReader();
    // fileReader.onload = function (event) {
    //     const base64Str = btoa(event.target.result);
    //     fetch(url, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             fileName: file.name,
    //             file: base64Str
    //         })
    //     })
    //         .then(resp => resp.json())
    //         .then(body => {
    //             const { successful ,message} = body;
    //             if(successful){
    //                 alert(message);
    //             }
    //         });

    // }
    // fileReader.readAsBinaryString(file);
    // 欄位清空
    $(".live-text-input").val("");
  });



  // RWD點擊"送出"
  $(".live-submit-rwd").on("click", function () {
    const input_text = $(".live-text-input-rwd").val().trim();
    // console.log(input_text);
    if (input_text == "") {
      alert("請輸入資料");
    } else {
      let html = `
          <ul class="search-list">
            <li class="search-li">
            <div class="search-li-icon">
                <i class="fa-solid fa-user"></i>
            </div>
            <div>
              <div class="item-name">
              王大明
              </div>
              <div class="item-block">
                <div class="title-block">${input_text}</div>

              </div>
              </div>
            </li>
          </ul>
        `;

      $("div.search-container").append(html);

      // 重點1：以下方式取得 section.result-block(藍框) 的可捲動區域高度(不含邊框)

      // 重點2：透過 animate 使用 scrollTop 指定要滑動到離上方指定位置
      $(".result-block").animate({ scrollTop: $('.result-block')[0].scrollHeight}, 10);
      $(".result-block").animate({ scrollTop: $('.result-block')[1].scrollHeight}, 10);

    }
    
    // console.log(scrollTop);
    // 欄位清空
    $(".live-text-input-rwd").val("");
  });

});

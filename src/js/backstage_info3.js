// =====datdtable=====
$(document).ready(function () {
  var dataset = [
    [
      1,
      "王大明",
      `<img src="img/sample/speaker_sample.png" alt="">`,
      "2022/03/17",
      // `<div class="backstage_btn_td"></div>`,
    ],
    [
      2,
      "王小明",
      `<img src="img/sample/speaker_sample.png" alt="">`,
      "2022/03/18",
      // `<div class="backstage_btn_td"><button class="backstage_btn backstage_btn_short" name="edit_btn">修改</button><button class="backstage_btn backstage_btn_bad ml-4">刪除</button></div>`,
    ],
  ];
  var table = $("#table").DataTable({
    lengthMenu: [10, 20],
    dom: `<'row'<'col-6'l><'col-6'f>>
                <'row'<'col-12'tr>>
                <'row'<'col-5'i><'col-7'p>>`,
    language: {
      processing: "處理中...",
      loadingRecords: "載入中...",
      lengthMenu: "顯示 _MENU_ 項結果",
      zeroRecords: "沒有符合的結果",
      info: "顯示第 _START_ 至 _END_ 項結果，共 _TOTAL_ 項",
      infoEmpty: "顯示第 0 至 0 項結果，共 0 項",
      infoFiltered: "(從 _MAX_ 項結果中過濾)",
      infoPostFix: "",
      search: "搜尋欄位:",
      paginate: {
        first: "第一頁",
        previous: "上一頁",
        next: "下一頁",
        last: "最後一頁",
      },
      aria: {
        sortAscending: ": 升冪排列",
        sortDescending: ": 降冪排列",
      },
    },
    data: dataset,
    columns: [
      { title: "序號" },
      { title: "講師名稱" },
      { title: "講師照片" },
      { title: "議程日期" },
      {
        title: "操作", // 這邊是欄位
        render: function (data, type, row) {
          return (
            '<div class="backstage_btn_td">' +
            '<button type="button" class="backstage_btn backstage_btn_short edt_btn">編輯</button> ' +
            '<button type="button" class="backstage_btn backstage_btn_bad ml-4 del_btn">刪除</button> ' +
            "</div"
          );
        },
      },
    ],
  });
  // 點擊修改
  $("#table tbody").on("click", ".edt_btn", function () {
    var data = table.row($(this).parents("tr")).data();
    // data[0]是第1筆以此類推
    let openCreatBox = document.querySelector(".backstage_info3");
    openCreatBox.style.display = "block";
    $("#name").val(data[0]);
    $("#introduce").val(data[1]);
    let img_url_r = data[2].replace('" alt="">', "");
    let img_url = img_url_r.substring(10);
    $("#img").attr("src", img_url);
    $(".file-text").text(img_url.replace("img/sample/", ""));
    $(".photo-text").text(img_url.replace("img/sample/", ""));
    $("#date").val(data[3]);
    if (img_url != "") {
      $(".fa-image").remove();
    }
  });
  // 點擊刪除
  $("#table tbody").on("click", ".del_btn", function () {
    var data = table.row($(this).parents("tr")).data();
    // data[0]是第1筆以此類推
    swal({
      title: "是否確定刪除?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal({
          title: "刪除成功",
          icon: "success",
        });
      } else {
        
      }
    });
  });
});

// =====按鈕開關menu=====
let backstage_aside_btn = document.getElementsByClassName(
  "backstage_aside_btn"
);
for (let i = 0; i < backstage_aside_btn.length; i++) {
  backstage_aside_btn[i].addEventListener("click", function () {
    let aside = document.getElementsByClassName("backstage_menu")[0];
    aside.classList.toggle("-backstage_aside_on");
  });
}

// =====vue=====
new Vue({
  el: "#page",
  data() {
    return {
      // 是否編輯狀態
      current_edit: null,
      // 是否要關閉
      dbCheck: !1,
      // files: [],
      image: "",
      file_name: "",
    };
  },
  created: function () {},
  methods: {
    // 點擊新增按鈕
    insert() {
      let openCreatBox = document.querySelector(".backstage_info3");
      openCreatBox.style.display = "block";
    },
    // 點擊儲存
    f_save() {
      if ($("#name").val() != "" && $("#introduce").val() != "") {
        this.$swal({
          title: "儲存成功",
          icon: "success",
          image: "",
        });
        let openCreatBox = document.querySelector(".backstage_info3");
        openCreatBox.style.display = "none";
        (this.current_edit = null), (this.dbCheck = !1);
      } else {
        this.$swal({
          title: "儲存失敗",
          icon: "error",
          text: "所有欄位皆須填寫",
        });
      }
    },
    // 點擊關閉
    f_close() {
      this.$swal({
        title: "尚未存檔，是否關閉?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willInsert) => {
        if (willInsert) {
          let openCreatBox = document.querySelector(".backstage_info3");
          openCreatBox.style.display = "none";
          (this.current_edit = null), (this.dbCheck = !1);
        } else {
          let openCreatBox = document.querySelector(".backstage_info3");
          openCreatBox.style.display = "block";
        }
      });
    },
    // 執行存檔並關閉
    sss() {
      // this.current_edit = null,
      // this.dbCheck = !1;
      // let openCreatBox = document.querySelector(".backstage_info3");
      // openCreatBox.style.opacity = 1;
    },
    // 執行關閉
    ccc() {
      // this.dbCheck = !1;
      // let openCreatBox = document.querySelector(".backstage_info3");
      // openCreatBox.style.opacity = 1;
    },
    selectedFile(e) {
      let file = e.target.files[0];
      // let file = e.target.file.item(0);
      console.log("vue的:" + file);

      let readFiles = new FileReader(); //js的內建物件，才可以找到路徑，宣告後可以使用屬性和方法
      readFiles.readAsDataURL(file); //這是方法，如果寫別的讀取別的
      readFiles.addEventListener("load", this.loadImage);
      this.file_name = file.name;
      $(".file-text").text(file.name);
      $(".photo-text").text(file.name);
      $(".fa-image").addClass("input-p-hide");
      $(".file-text").removeClass("file-text-hide");
    },
    loadImage(e) {
      this.image = e.target.result;
    },
  },
});

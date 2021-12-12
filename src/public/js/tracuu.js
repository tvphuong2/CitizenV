var root_id = localStorage.getItem("id");
var token = localStorage.getItem("token");
 
var head_table = document.getElementById("head_table");
var body_table = document.getElementById("body_table");
 
var body_table_result = document.getElementById("ketquatimkiem");
var arrIdDiaPhuong = [];
 
$(document).ready(function () {
  $("#mytable").DataTable({});
});
 
function Chapnhan() {
  console.log(document.getElementById("loi_cmnd"));
  var okie = true; //chua co loi
  //xoa cac thong bao loi
  document.getElementById("loi_cmnd").innerHTML = "";
 
  //kiem tra cac truong bat buoc nhap
  if (document.getElementById("CMND").value == "") {
    document.getElementById("loi_cmnd").innerHTML = "chưa nhập cmnd";
    document.getElementById("CMND").focus();
    okie = false;
  }
  //neu tat ca phu hop thi cho phep submit
  //submit form
  if (okie) document.getElementById("form").submit();
}
 
function tracuu() {
  var cmnd = document.getElementById("cmnd").value;
  var hoten = document.getElementById("hovaten").value;
  var diaphuong = arrIdDiaPhuong[arrIdDiaPhuong.length - 1];
 
  var url =
    "/tracuu/timkiem/?cmnd=" +
    cmnd +
    "&hoten=" +
    hoten +
    "&diaphuong=" +
    diaphuong;
  fetch(url, {
    headers: {
      Authorization: "Basic " + token,
    },
  })
    .then((response) => response.json())
    .then((res) => {
      body_table_result.innerHTML = "";
      for (i in res) {
        var tr = document.createElement("tr");
        for (j in res[i]) {
          var td = document.createElement("td");
          td.innerHTML = res[i][j];
          tr.appendChild(td);
        }
        body_table_result.appendChild(tr);
      }
    });
}
 
switch (root_id.length) {
  case 2:
    head_table.innerHTML = "";
    head_table.innerHTML =
      "<tr>" +
      "<th>CMND</th>" +
      "<th>Họ và tên</th>" +
      "<th>Huyện</th>" +
      "<th>Xã</th>" +
      "<th>Thôn</th>" +
      "</tr>";
    body_table.innerHTML =
      "<tr>" +
      '<td><input type="text" id="cmnd" /></td>' +
      '<td><input type="text" id="hovaten" /></td>' +
      '<td><input list="danhsachhuyen" type="text" id="huyen" /><datalist id="danhsachhuyen"></datalist></td>' +
      '<td><input list="danhsachxa" type="text" id="xa" /><datalist id="danhsachxa"></datalist></td>' +
      '<td><input list="danhsachthon" type="text" id="thon" /><datalist id="danhsachthon"></datalist></td>' +
      "</tr>";
 
    var danhsachhuyen = document.getElementById("danhsachhuyen");
    var danhsachxa = document.getElementById("danhsachxa");
    var danhsachthon = document.getElementById("danhsachthon");
 
    layHuyen = fetch("/danhsach/capduoi/?id=" + root_id, {
      headers: {
        Authorization: "Basic " + token,
      },
    })
      .then((response) => response.json())
      .then((res) => {
        //url có dạng đường dẫn/?biến=giá trị&biến=giá trị
        arrIdDiaPhuong.push(root_id);
        for (i in res) {
          var option = document.createElement("option");
          option.setAttribute("data-value", res[i].id);
          option.value = "";
          option.value = res[i].ten;
          danhsachhuyen.appendChild(option);
        }
      });
 
    $("#huyen").on("input", function () {
      var value1 = this.value;
      var idHuyen = $('#danhsachhuyen [value="' + value1 + '"]').data("value");
      arrIdDiaPhuong.push(idHuyen);
      layXa = fetch("/danhsach/capduoi/?id=" + idHuyen, {
        headers: {
          Authorization: "Basic " + token,
        },
      })
        .then((response) => response.json())
        .then((res) => {
          //url có dạng đường dẫn/?biến=giá trị&biến=giá trị
 
          danhsachxa.innerHTML = "";
          for (i in res) {
            var option = document.createElement("option");
            option.setAttribute("data-value", res[i].id);
            option.value = "";
            option.value = res[i].ten;
            danhsachxa.appendChild(option);
          }
        });
 
      $("#xa").on("input", function () {
        var value1 = this.value;
        var idXa = $('#danhsachxa [value="' + value1 + '"]').data("value");
        arrIdDiaPhuong.push(idXa);
        layThon = fetch("/danhsach/capduoi/?id=" + idXa, {
          headers: {
            Authorization: "Basic " + token,
          },
        })
          .then((response) => response.json())
          .then((res) => {
            //url có dạng đường dẫn/?biến=giá trị&biến=giá trị
 
            danhsachthon.innerHTML = "";
            for (i in res) {
              var option = document.createElement("option");
              option.setAttribute("data-value", res[i].id);
              option.value = "";
              option.value = res[i].ten;
              danhsachthon.appendChild(option);
            }
          });
        $("#thon").on("input", function () {
          var value1 = this.value;
          var idHoKhau = $('#danhsachthon [value="' + value1 + '"]').data(
            "value"
          );
          arrIdDiaPhuong.push(idHoKhau);
        });
      });
    });
    break;
 
  case 4:
    head_table.innerHTML =
      "<tr>" +
      "<th>CMND</th>" +
      "<th>Họ và tên</th>" +
      "<th>Xã</th>" +
      "<th>Thôn</th>" +
      "</tr>";
    body_table.innerHTML =
      "<tr>" +
      '<td><input type="text" id="cmnd" /></td>' +
      '<td><input type="text" id="hovaten" /></td>' +
      '<td><input list="danhsachxa" type="text" id="xa" /><datalist id="danhsachxa"></datalist></td>' +
      '<td><input list="danhsachthon" type="text" id="thon" /><datalist id="danhsachthon"></datalist></td>' +
      "</tr>";
 
    var danhsachxa = document.getElementById("danhsachxa");
    var danhsachthon = document.getElementById("danhsachthon");
 
    layXa = fetch("/danhsach/capduoi/?id=" + root_id, {
      headers: {
        Authorization: "Basic " + token,
      },
    })
      .then((response) => response.json())
      .then((res) => {
        //url có dạng đường dẫn/?biến=giá trị&biến=giá trị
        arrIdDiaPhuong.push(root_id);
        for (i in res) {
          var option = document.createElement("option");
          option.setAttribute("data-value", res[i].id);
          option.value = "";
          option.value = res[i].ten;
          danhsachxa.appendChild(option);
        }
      });
 
    $("#xa").on("input", function () {
      var value1 = this.value;
      var idXa = $('#danhsachxa [value="' + value1 + '"]').data("value");
      arrIdDiaPhuong.push(idXa);
      layThon = fetch("/danhsach/capduoi/?id=" + idXa, {
        headers: {
          Authorization: "Basic " + token,
        },
      })
        .then((response) => response.json())
        .then((res) => {
          //url có dạng đường dẫn/?biến=giá trị&biến=giá trị
          danhsachthon.innerHTML = "";
          for (i in res) {
            var option = document.createElement("option");
            option.setAttribute("data-value", res[i].id);
            option.value = "";
            option.value = res[i].ten;
            danhsachthon.appendChild(option);
          }
        });
      $("#thon").on("input", function () {
        var value1 = this.value;
        var idHoKhau = $('#danhsachthon [value="' + value1 + '"]').data(
          "value"
        );
        arrIdDiaPhuong.push(idHoKhau);
      });
    });
    break;
 
  case 6:
    head_table.innerHTML =
      "<tr>" +
      "<th>CMND</th>" +
      "<th>Họ và tên</th>" +
      "<th>Thôn</th>" +
      "</tr>";
    body_table.innerHTML =
      "<tr>" +
      '<td><input type="text" id="cmnd" /></td>' +
      '<td><input type="text" id="hovaten" /></td>' +
      '<td><input list="danhsachthon" type="text" id="thon" /><datalist id="danhsachthon"></datalist></td>' +
      "</tr>";
 
    var danhsachthon = document.getElementById("danhsachthon");
    layThon = fetch("/danhsach/capduoi/?id=" + root_id, {
      headers: {
        Authorization: "Basic " + token,
      },
    })
      .then((response) => response.json())
      .then((res) => {
        //url có dạng đường dẫn/?biến=giá trị&biến=giá trị
        arrIdDiaPhuong.push(root_id);
        for (i in res) {
          var option = document.createElement("option");
          option.setAttribute("data-value", res[i].id);
          option.value = "";
          option.value = res[i].ten;
          danhsachthon.appendChild(option);
        }
      });
    $("#thon").on("input", function () {
      var value1 = this.value;
      var idHoKhau = $('#danhsachthon [value="' + value1 + '"]').data("value");
      arrIdDiaPhuong.push(idHoKhau);
    });
    break;
 
  case 3:
    head_table.innerHTML =
      "<tr>" +
      "<th>CMND</th>" +
      "<th>Họ và tên</th>" +
      "<th>Tinh</th>" +
      "<th>Huyện</th>" +
      "<th>Xã</th>" +
      "<th>Thôn</th>" +
      "</tr>";
    body_table.innerHTML =
      "<tr>" +
      '<td><input type="text" id="cmnd" /></td>' +
      '<td><input type="text" id="hovaten" /></td>' +
      '<td><input list="danhsachtinh" type="text" id="tinh" /><datalist id="danhsachtinh"></datalist></td>' +
      '<td><input list="danhsachhuyen" type="text" id="huyen" /><datalist id="danhsachhuyen"></datalist></td>' +
      '<td><input list="danhsachxa" type="text" id="xa" /><datalist id="danhsachxa"></datalist></td>' +
      '<td><input list="danhsachthon" type="text" id="thon" /><datalist id="danhsachthon"></datalist></td>' +
      "</tr>";
 
    var danhsachtinh = document.getElementById("danhsachtinh");
    var danhsachhuyen = document.getElementById("danhsachhuyen");
    var danhsachxa = document.getElementById("danhsachxa");
    var danhsachthon = document.getElementById("danhsachthon");
 
    layTinh = fetch("/danhsach/capduoi/?id=" + root_id, {
      headers: {
        Authorization: "Basic " + token,
      },
    })
      .then((response) => response.json())
      .then((res) => {
        //url có dạng đường dẫn/?biến=giá trị&biến=giá trị
        arrIdDiaPhuong.push(root_id);
        for (i in res) {
          var option = document.createElement("option");
          option.setAttribute("data-value", res[i].id);
          option.value = "";
          option.value = res[i].ten;
          danhsachtinh.appendChild(option);
        }
      });
 
    $("#tinh").on("input", function () {
      var value1 = this.value;
      var idHuyen = $('#danhsachtinh [value="' + value1 + '"]').data("value");
      arrIdDiaPhuong.push(idHuyen);
      layHuyen = fetch("/danhsach/capduoi/?id=" + idHuyen, {
        headers: {
          Authorization: "Basic " + token,
        },
      })
        .then((response) => response.json())
        .then((res) => {
          //url có dạng đường dẫn/?biến=giá trị&biến=giá trị
          danhsachhuyen.innerHTML = "";
          for (i in res) {
            var option = document.createElement("option");
            option.setAttribute("data-value", res[i].id);
            option.value = "";
            option.value = res[i].ten;
            danhsachhuyen.appendChild(option);
          }
        });
 
      $("#huyen").on("input", function () {
        var value1 = this.value;
        var idXa = $('#danhsachhuyen [value="' + value1 + '"]').data("value");
        arrIdDiaPhuong.push(idXa);
        layXa = fetch("/danhsach/capduoi/?id=" + idXa, {
          headers: {
            Authorization: "Basic " + token,
          },
        })
          .then((response) => response.json())
          .then((res) => {
            //url có dạng đường dẫn/?biến=giá trị&biến=giá trị
            danhsachxa.innerHTML = "";
            for (i in res) {
              var option = document.createElement("option");
              option.setAttribute("data-value", res[i].id);
              option.value = "";
              option.value = res[i].ten;
              danhsachxa.appendChild(option);
            }
          });
 
        $("#xa").on("input", function () {
          var value1 = this.value;
          var idThon = $('#danhsachxa [value="' + value1 + '"]').data("value");
          arrIdDiaPhuong.push(idThon);
          layThon = fetch("/danhsach/capduoi/?id=" + idThon, {
            headers: {
              Authorization: "Basic " + token,
            },
          })
            .then((response) => response.json())
            .then((res) => {
              //url có dạng đường dẫn/?biến=giá trị&biến=giá trị
              danhsachthon.innerHTML = "";
              for (i in res) {
                var option = document.createElement("option");
                option.setAttribute("data-value", res[i].id);
                option.value = "";
                option.value = res[i].ten;
                danhsachthon.appendChild(option);
              }
            });
          $("#thon").on("input", function () {
            var value1 = this.value;
            var idHoKhau = $('#danhsachthon [value="' + value1 + '"]').data(
              "value"
            );
            arrIdDiaPhuong.push(idHoKhau);
          });
        });
      });
    });
 
    break;
}

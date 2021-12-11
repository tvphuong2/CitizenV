var info = document.getElementById("info");
var nav = document.getElementById("navigation"); // Nơi chứa thanh điều hướng
var danhsach = document.getElementById("danhsach");

var root_id = localStorage.getItem("id");
var token = localStorage.getItem("token");

var arrIndexOfLocation = [root_id]; // Mảng chứa các id để truy vấn tới dtb
var navNameOfLocation = []; // Mảng để hiện thị đường dẫn trên danh sách
var root = ""; // Gốc của điều hướng có thể thay đổi sau này với mỗi tài khoản có quyền khác nhau
fetch("/danhsach/timten/?id=" + root_id, {headers: {
    'Authorization': 'Basic '+ token
  }}).then((response) => response.json()).then((res) => {
    root = "<p>"+res.ten+"</p>"
    if (res.status) {
      alert(res.status)
    }
  });

danhsach.innerHTML = "đang tải...";

laydanhsach = fetch("/danhsach/capduoi/?id=" + root_id, {headers: {
    'Authorization': 'Basic '+ token
  }}).then((response) => response.json())
  .then((res) => {
    if (res.status) alert(res.status)
    //url có dạng đường dẫn/?biến=giá trị&biến=giá trị
    danhsach.innerHTML = "";
    nav.innerHTML = root;
    for (i in res) {
      //tạo các hàng
      var tr = document.createElement("tr");
      tr.innerHTML = '<td><input type="checkbox" class = "ck" id="ck-1"></td>';
      for (j in res[i]) {
        //tạo trường cho các hàng
        var td = document.createElement("td");
        td.innerHTML = res[i][j];
        tr.appendChild(td);
      }

      danhsach.appendChild(tr);
    }
  });

// Hàm khi ấn vào một dòng
$("#table").on("click", "tbody tr", function (e) {
  if ($(e.target).closest("input").length) return;
  var index = this.getElementsByTagName("td")[1].innerHTML;
  str = "/danhsach/capduoi/?id=" + index;
  arrIndexOfLocation.push(index);

  navNameOfLocation[arrIndexOfLocation.length - 2] =
    document.createElement("p");
  navNameOfLocation[arrIndexOfLocation.length - 2].innerHTML =
    ">>" + this.getElementsByTagName("td")[2].innerHTML;
  nav.appendChild(navNameOfLocation[arrIndexOfLocation.length - 2]);

  danhsach.innerHTML = "";
  fet = fetch(str, {headers: {
    'Authorization': 'Basic '+ token
  }})
    .then((response) => response.json())
    .then((res) => {
      if (res.status) alert(res.status)
      for (i in res) {
        //tạo các hàng
        var tr = document.createElement("tr");
        tr.innerHTML =
          '<td><input type="checkbox" class = "ck" id="ck-1"></td>';
        for (j in res[i]) {
          //tạo trường cho các hàng
          var td = document.createElement("td");
          td.innerHTML = res[i][j];
          tr.appendChild(td);
        }

        danhsach.appendChild(tr);
      }
    });
});

// Hàm để ấn vào điều hướng
$("#navigation").on("click", "p", function () {
  var index = $(this).index();
  nav.innerHTML = root;

  // Xử lý sự kiện khi ấn thanh điều hướng
  var temp = [];
  for (i = 0; i < index; i++) {
    temp[i] = document.createElement("p");
    temp[i].innerHTML = navNameOfLocation[i].innerHTML;
    nav.appendChild(temp[i]);
  }

  navNameOfLocation.splice(index, navNameOfLocation.length);
  arrIndexOfLocation.splice(index + 1, arrIndexOfLocation.length);
  str =
    "/danhsach/capduoi/?id=" +
    arrIndexOfLocation[arrIndexOfLocation.length - 1];

  danhsach.innerHTML = "";

  fet = fetch(str, {headers: {
    'Authorization': 'Basic '+ token
  }})
    .then((response) => response.json())
    .then((res) => {
      if (res.status) alert(res.status)
      for (i in res) {
        //tạo các hàng
        var tr = document.createElement("tr");
        tr.innerHTML =
          '<td><input type="checkbox" class = "ck" id="ck-1"></td>';
        for (j in res[i]) {
          //tạo trường cho các hàng
          var td = document.createElement("td");
          td.innerHTML = res[i][j];
          tr.appendChild(td);
        }

        danhsach.appendChild(tr);
      }
    });
});


function themDiaPhuong() {
  var name = document.getElementById('name_').value;
  var dientich = document.getElementById('dt_').value;
  fetch("/danhsach/taomoi/?name=" + name + "&dientich=" + dientich, {headers: {
    'Authorization': 'Basic '+ token
  }})
    .then((response) => response.json())
    .then((res) => {
      if (res.status) alert(res.status)
    })
  }

function xoaDiaPhuong() {
  var id_ = document.getElementById('id_').value;
  fetch("/danhsach/xoa/?id=" + id_, {headers: {
    'Authorization': 'Basic '+ token
  }})
  .then((response) => response.json())
  .then((res) => {
    if (res.status) alert(res.status)
  })
}

function chinhSua() { //nếu như tên trống sẽ sửa mỗi diện tích và ngược lại
  var id_ = document.getElementById('id_').value;
  var name = document.getElementById('name_').value;
  var dientich = document.getElementById('dt_').value;
  fetch("/danhsach/chinhsua/?id=" + id_ +"&name=" + name +"&dientich=" + dientich, {headers: {
    'Authorization': 'Basic '+ token
  }})
  .then((response) => response.json())
  .then((res) => {
    if (res.status) alert(res.status)
  })
}
var info = document.getElementById("info");
var nav = document.getElementById("navigation"); // Nơi chứa thanh điều hướng
var danhsach = document.getElementById("danhsach");

var root_id = localStorage.getItem("id");
var token = localStorage.getItem("token");

var arrIndexOfLocation = [root_id]; // Mảng chứa các id để truy vấn tới dtb
var navNameOfLocation = []; // Mảng để hiện thị đường dẫn trên danh sách
var root = ""; 
// Gốc của điều hướng có thể thay đổi sau này với mỗi tài khoản có quyền khác nhau
var arrIndexClicked = [];
var so_luong_nam = 0;
var so_luong_nu = 0;
var nam_thong_ke = {
  '0-9': 0,
  '10-19': 0,
  '20-29':0,
  '30-39':0,
  '40-49':0,
  '50-59':0,
  '60-69': 0,
  '70-79': 0,
  '80-89':0,
  '90-99':0,
  '100-':0,
}
var nu_thong_ke = {
  '0-9': 0,
  '10-19': 0,
  '20-29':0,
  '30-39':0,
  '40-49':0,
  '50-59':0,
  '60-69': 0,
  '70-79': 0,
  '80-89':0,
  '90-99':0,
  '100-':0,
}
fetch("/danhsach/timten/?id=" + root_id, {
  headers: {
    'Authorization': 'Basic ' + token
  }
}).then((response) => response.json()).then((res) => {
  root = "<p>" + res.ten + "</p>"
});

danhsach.innerHTML = "đang tải...";

laydanhsach = fetch("/danhsach/capduoi/?id=" + root_id, {
  headers: {
    'Authorization': 'Basic ' + token
  }
}).then((response) => response.json())
  .then((res) => {
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
 
  // Hiện thông tin mỗi người theo mỗi hộ khẩu la truy van cuoi cung
  if (index.length == 10) {
    subStr = "/danhsach/danhsachnhankhau/?id=" + index;
    fet = fetch(subStr, {
      headers: {
        Authorization: "Basic " + token,
      },
    })
      .then((response) => response.json())
      .then((res) => {
        // Thanh dieu huong
        arrIndexOfLocation.push(index);
        navNameOfLocation[arrIndexOfLocation.length - 2] =
          document.createElement("p");
        navNameOfLocation[arrIndexOfLocation.length - 2].innerHTML =
          ">>" + this.getElementsByTagName("td")[2].innerHTML;
        nav.appendChild(navNameOfLocation[arrIndexOfLocation.length - 2]);
 
        danhsach.innerHTML = "";
 
        tieude.innerHTML = "";
        var trHead = document.createElement("tr");
        trHead.innerHTML =
          "<th>Họ tên</th>" +
          "<th>Ngày sinh</th>" +
          "<th>Giới tính</th>" +
          "<th>Tôn giáo</th>" +
          "<th>Quốc tịch</th>" +
          "<th>Nghề nghiệp</th>" +
          "<th>CMND</th>" +
          "<th>Địa chỉ thường trú</th>" +
          "<th>Địa chỉ tạm trú</th>" +
          "<th>Trình độ học vấn</th>";
        tieude.appendChild(trHead);
 
        for (i in res) {
          //tạo các hàng
          var tr = document.createElement("tr");
          for (j in res[i]) {
            //tạo trường cho các hàng
            var td = document.createElement("td");
            td.innerHTML = res[i][j];
            tr.appendChild(td);
          }
          danhsach.appendChild(tr);
        }
      });
  } else {
    str = "/danhsach/capduoi/?id=" + index;
 
    arrIndexOfLocation.push(index);
    navNameOfLocation[arrIndexOfLocation.length - 2] =
      document.createElement("p");
    navNameOfLocation[arrIndexOfLocation.length - 2].innerHTML =
      ">>" + this.getElementsByTagName("td")[2].innerHTML;
    nav.appendChild(navNameOfLocation[arrIndexOfLocation.length - 2]);
 
    tieude.innerHTML = "";
    var trHead = document.createElement("tr");
    trHead.innerHTML = "<th></th>" + "<th>Mã</th>" + "<th>Địa phương</th>";
    tieude.appendChild(trHead);
 
    danhsach.innerHTML = "";
    fet = fetch(str, {
      headers: {
        Authorization: "Basic " + token,
      },
    })
      .then((response) => response.json())
      .then((res) => {
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
  }
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
 
  tieude.innerHTML = "";
  var trHead = document.createElement("tr");
  trHead.innerHTML = "<th></th>" + "<th>Mã</th>" + "<th>Địa phương</th>";
  tieude.appendChild(trHead);
 
  fet = fetch(str, {
    headers: {
      Authorization: "Basic " + token,
    },
  })
    .then((response) => response.json())
    .then((res) => {
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

var thap_tuoi_data;
var mat_do_data;

function thongKe() {
  var type = document.getElementById("bieudo").value;
  fetch("/danhsach/thongke/?arr_id=" + arrIndexClicked + "&type=" + type, {
    headers: {
      'Authorization': 'Basic ' + token
    }
  }).then((response) => response.json())
    .then((res) => {
      if (type == "nam/nu") {
        for (i in res) {
          if (res[i]['Gioitinh'] == "Nam") {
            so_luong_nam++;
          }
        }
        so_luong_nu = res.length - so_luong_nam;
        console.log("Nam: " + so_luong_nam);
        console.log("Nữ: " + so_luong_nu)
      }
      else if (type == "thap_tuoi") {

        for (i in res) {
          if (res[i]['Gioitinh'] == "Nam") {
            so_luong_nam++;
            if (res[i]['Tuoi'] >= 0 && res[i]['Tuoi'] <= 9) {
              nam_thong_ke['0-9']++;

            } else if (res[i]['Tuoi'] <= 19) {
              nam_thong_ke['10-19']++;

            } else if (res[i]['Tuoi'] <= 29) {
              nam_thong_ke['20-29']++;

            } else if (res[i]['Tuoi'] <= 39) {
              nam_thong_ke['30-39']++;

            } else if (res[i]['Tuoi'] <= 49) {
              nam_thong_ke['40-49']++;

            } else if (res[i]['Tuoi'] <= 59) {
              nam_thong_ke['50-59']++;

            } else if (res[i]['Tuoi'] <= 69) {
              nam_thong_ke['60-69']++;

            } else if (res[i]['Tuoi'] <= 79) {
              nam_thong_ke['70-79']++;

            } else if (res[i]['Tuoi'] <= 89) {
              nam_thong_ke['80-89']++;

            } else if (res[i]['Tuoi'] <= 99) {
              nam_thong_ke['90-99']++;

            } else {
              nam_thong_ke['100-']++;

            }
          }
          if (res[i]['Gioitinh'] == "Nữ") {
            so_luong_nu++;
            if (res[i]['Tuoi'] >= 0 && res[i]['Tuoi'] <= 9) {
              nu_thong_ke['0-9']++;

            } else if (res[i]['Tuoi'] <= 19) {
              nu_thong_ke['10-19']++;

            } else if (res[i]['Tuoi'] <= 29) {
              nu_thong_ke['20-29']++;

            } else if (res[i]['Tuoi'] <= 39) {
              nu_thong_ke['30-39']++;

            } else if (res[i]['Tuoi'] <= 49) {
              nu_thong_ke['40-49']++;

            } else if (res[i]['Tuoi'] <= 59) {
              nu_thong_ke['50-59']++;

            } else if (res[i]['Tuoi'] <= 69) {
              nu_thong_ke['60-69']++;

            } else if (res[i]['Tuoi'] <= 79) {
              nu_thong_ke['70-79']++;

            } else if (res[i]['Tuoi'] <= 89) {
              nu_thong_ke['80-89']++;

            } else if (res[i]['Tuoi'] <= 99) {
              nu_thong_ke['90-99']++;

            } else {
              nu_thong_ke['100-']++;

            }
          }


        }
        thap_tuoi_data = [
          ['Age', 'Male', 'Female'],
          ['0-9   years', nam_thong_ke["0-9"], -nu_thong_ke["0-9"]],
          ['10-19 years', nam_thong_ke["10-19"], -nu_thong_ke["10-19"]],
          ['20-29 years', nam_thong_ke["20-29"], -nu_thong_ke["20-29"]],
          ['30-39 years', nam_thong_ke["30-39"], -nu_thong_ke["30-39"]],
          ['40-49 years', nam_thong_ke["40-49"], -nu_thong_ke["40-49"]],
          ['50-59 years', nam_thong_ke["50-59"], -nu_thong_ke["50-59"]],
          ['60-69 years', nam_thong_ke["60-69"], -nu_thong_ke["60-69"]],
          ['70-79 years', nam_thong_ke["70-79"], -nu_thong_ke["70-79"]],
          ['80-89 years', nam_thong_ke["80-89"], -nu_thong_ke["80-89"]],
          ['90-99 years', nam_thong_ke["90-99"], -nu_thong_ke["90-99"]],
          ['100+  years', nam_thong_ke["100-"], -nu_thong_ke["100-"]]
        ];

        console.log(nam_thong_ke);
        console.log(nu_thong_ke);
      }
      else if (type == 'mat_do') {
        mat_do_data = [
          ['Tỉnh thành', 'Mật độ',],
        ]
        for (var i = 0 ; i < res.length ; i ++) {
            mat_do_data.push([res[i]['Ten'], res[i]['Matdo']])
        }
       
      }
    }).then((_) => {
      thongKe2();
      nam_thong_ke = {
        '0-9': 0,
        '10-19': 0,
        '20-29': 0,
        '30-39': 0,
        '40-49': 0,
        '50-59': 0,
        '60-69': 0,
        '70-79': 0,
        '80-89': 0,
        '90-99': 0,
        '100-': 0,
      }
      nu_thong_ke = {
        '0-9': 0,
        '10-19': 0,
        '20-29': 0,
        '30-39': 0,
        '40-49': 0,
        '50-59': 0,
        '60-69': 0,
        '70-79': 0,
        '80-89': 0,
        '90-99': 0,
        '100-': 0,
      }
    })

}

google.load("visualization", "1", {packages:["corechart"]});


var thongke = document.getElementById("thongke");
function thongKe2() {
  var bieudo = document.getElementById("bieudo").value;
  thongke.style.display = "block";
  if (bieudo == 'mat_do')
    google.setOnLoadCallback(matdodanso);
  else if (bieudo == 'thap_tuoi')
    google.setOnLoadCallback(danso);
}

function danso() {
  // var data = new google.visualization.DataTable();

  // var dataArray = [
  //   ['Age', 'Male', 'Female'],
  //   ['0-4 years',   106, -104],
  //   ['5-9 years',   91,  -86 ],
  //   ['10-14 years', 79,  -77 ],
  //   ['15-19 years', 68,  -64 ],
  //   ['20-24 years', 62,  -58 ],
  //   ['25-29 years', 56,  -53 ],
  //   ['30-34 years', 51,  -46 ],
  //   ['35-39 years', 48,  -41 ],
  //   ['40-44 years', 43,  -35 ],
  //   ['45-49 years', 39,  -30 ],
  //   ['50-54 years', 33,  -27 ],
  //   ['55-59 years', 32,  -25 ],
  //   ['60-64 years', 27,  -20 ],
  //   ['64-69 years', 19,  -16 ],
  //   ['70-74 years', 13,  -12 ],
  //   ['75-79 years', 8,   -7  ],
  //   ['80-84 years', 3,   -3  ],
  //   ['85-89 years', 1,   -1  ],
  //   ['90-94 years', 0,   0   ],
  //   ['95+ years',   0,   0   ]
  // ];

  var data = google.visualization.arrayToDataTable(thap_tuoi_data);

  var chart = new google.visualization.BarChart(document.getElementById('chart_div'));

  var options = {
    isStacked: true,
    'width': 800,
    'height': 500,
    hAxis: {
      format: ';'
    },
    vAxis: {
      direction: -1
    }
  };


  var formatter = new google.visualization.NumberFormat({
    pattern: ';'
  });

  formatter.format(data, 2)

  chart.draw(data, options);
}

function matdodanso() {
  var data = google.visualization.arrayToDataTable(mat_do_data);

  var options = {
    title: 'Mật độ dân số',
    chartArea: { width: '50%' },
    hAxis: {
      title: 'Thành phố',
      minValue: 0
    },
    vAxis: {
      title: 'Mật độ dân số'
    }
  };

  var chart = new google.visualization.ColumnChart(
    document.getElementById('chart_div'));

  chart.draw(data, options);
}

// function tilenghenghiep() {

//   var data = google.visualization.arrayToDataTable([
//     ['Nghề', 'Tỉ lệ nghề nghiệp'],
//     ['Nông dân',     11],
//     ['Giáo viên',      2],
//     ['Kinh doanh',  2],
//     ['Công nhân', 2],
//     ['Nhân viên văn phòng',    7]
//   ]);

//   var options = {
//     title: 'Tỉ lệ nghề nghiệp'
//   };

//   var chart = new google.visualization.PieChart(document.getElementById('chart_div'));

//   chart.draw(data, options);
// }

// function trinhdovanhoa() {

//   var data = google.visualization.arrayToDataTable([
//     ['Trình độ', 'Trình độ văn hóa'],
//     ['8/12',     2],
//     ['9/12',      8],
//     ['12/12',  20]
//   ]);

//   var options = {
//     title: 'Trình độ văn hóa'
//   };

//   var chart = new google.visualization.PieChart(document.getElementById('chart_div'));

//   chart.draw(data, options);
// }

function tatThongKe() {
  thongke.style.display = "none";
}
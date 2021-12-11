var quanly = document.getElementById("list");
var root_id = localStorage.getItem("id");
var token = localStorage.getItem("token");

if (root_id.length != 6) document.getElementById("inphieu").style.display = "none";

quanly.innerHTML = "đang tải...";
quanLyDanhSach = fetch("/quanly/capduoi/?id=" + root_id, {headers: {
  'Authorization': 'Basic '+ token
}}).then((response) => response.json())
  .then((res) => {
    if (res.status) alert(res.status)
    quanly.innerHTML = "";
    for (var i = 0; i < res.length; i++) {
        var row = document.createElement("tr");
        var column1 = document.createElement("td");
        var column2 = document.createElement("td");
        var column3 = document.createElement("td");
        var column4 = document.createElement("td");
        var column5 = document.createElement("td");
        var column6 = document.createElement("td");

        column1.innerHTML = '<input type="checkbox" class = "ck" id="ck-1">';
        column2.innerHTML = res[i].id;
        column3.innerHTML = res[i].ten;
        column4.innerHTML = res[i].matkhau;
        column5.innerHTML = res[i].quyen;
        column6.innerHTML = res[i].tiendo;

        row.appendChild(column1);
        row.appendChild(column2);
        row.appendChild(column3);
        row.appendChild(column4);
        row.appendChild(column5);
        row.appendChild(column6);

        quanly.appendChild(row);
        
    }

  });

fetch("/quanly/kttenquyentiendo/?id=" + root_id, {headers: {
    'Authorization': 'Basic '+ token
  }}).then((response) => response.json())
  .then((res) => {
    if (res.status) alert(res.status)
    var name = document.getElementById("ten");
    name.innerHTML = res.ten;
    var quyen = document.getElementById("quyen");
    quyen.innerHTML = "Quyền: " + res.quyen;
    var tiendo = document.getElementById("tiendo");
    if (res.tiendo) {
      var tiendo = document.getElementById("tiendo");
      tiendo.innerHTML = "Tiến độ: " + res.tiendo;
    }else{
      tiendo.parentNode.removeChild(tiendo);
    }

  });



function doi_mk() {
  id = document.getElementById('o_id').value;
  pass = document.getElementById('n_pass').value;
  fetch("/quanly/thaymk", {
      method: 'POST',
      headers: {'Content-Type': 'application/json',
                'Authorization': 'Basic '+ token},
      body: JSON.stringify({"id": id, 
                            "password": pass})
    }).then((response) => response.json())
    .then((res) => {
      if (res.status) alert(res.status)
    })
}

function xoa_mk() {
  id = document.getElementById('o_id').value;
  fetch("/quanly/thaymk", {
    method: 'POST',
    headers: {'Content-Type': 'application/json',
              'Authorization': 'Basic '+ token},
    body: JSON.stringify({"id": id, 
                          "password": ""})
    }).then((response) => response.json())
    .then((res) => {
      if (res.status) alert(res.status)
    })
}

function doi_quyen() {
  var id = document.getElementById('o_id').value;
  var start = document.getElementById('time_start').value;
  var end = document.getElementById('time_end').value;
  fetch("/quanly/thayquyen/?id=" + id + "&start=" + start + "&end=" + end, {headers: {
      'Authorization': 'Basic '+ token
    }}).then((response) => response.json())
    .then((res) => {
      if (res.status) alert(res.status)
    })
}

function xoa_quyen() {
  var id = document.getElementById('o_id').value;
  fetch("/quanly/xoaquyen/?id=" + id, {headers: {
      'Authorization': 'Basic '+ token
    }}).then((response) => response.json())
    .then((res) => {
      if (res.status) alert(res.status)
    })
}

function hoan_thanh() {
  fetch("/quanly/tiendo/?tiendo=1", {headers: {
      'Authorization': 'Basic '+ token
    }}).then((response) => response.json())
    .then((res) => {
      if (res.status) alert(res.status)
    })
}

function chua_hoan_thanh() {
  fetch("/quanly/tiendo/?tiendo=0", {headers: {
      'Authorization': 'Basic '+ token
    }}).then((response) => response.json())
    .then((res) => {
      if (res.status) alert(res.status)
    })
}

function inphieu() {
  var cb = document.getElementsByClassName('cb');

  var style = "<style>"
  style += "table {font-family: arial, sans-serif;border-collapse: collapse;width: 100%;}"
  style += "td, th {border: 1px solid #dddddd;text-align: left;padding: 8px; height:24px;}"
  style += "tr:nth-child(even) {background-color: #dddddd;}"
  style += "</style>"

  var table = "<h1>Tên hộ:</h1><table><thead><tr>";
  var len = 0;

  for (var i = 0; i < cb.length; i++) {
    if (cb[i].checked) {
      len++;
      table += "<th>" + cb[i].value + "</th>"
    }
  }
  table += "</tr></thead><tbody>"
  for (var j = 0; j < 15; j++) {
    table += "<tr>"
    for (var i = 0; i < len; i++) {
      table += "<td></td>"
    }
    table += "</tr>"
  }
  table += "</tbody></table><h2>Người khai báo</h2><h3>(Ký tên)</h3>"

  var win = window.open('', '', 'height=800,width=800');
  win.document.write(style);
  win.document.write(table);
  win.document.close();
  win.print();
}
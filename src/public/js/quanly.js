var quanly = document.getElementById("list");
var root_id = localStorage.getItem("id");
var token = localStorage.getItem("token");

quanly.innerHTML = "đang tải...";
quanLyDanhSach = fetch("/quanly/capduoi/?id=" + root_id, {headers: {
  'Authorization': 'Basic '+ token
}}).then((response) => response.json())
  .then((res) => {
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

fetch("/quanly/kttenquyen/?id=" + root_id, {headers: {
    'Authorization': 'Basic '+ token
  }}).then((response) => response.json())
  .then((res) => {
    var name = document.getElementById("ten");
    name.innerHTML = res.ten;
    var quyen = document.getElementById("quyen");
    quyen.innerHTML = "Quyền: " + res.quyen;
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
    }).then((response) => {
      console.log(response);
    });
}

function xoa_mk() {
  id = document.getElementById('o_id').value;
  fetch("/quanly/thaymk", {
    method: 'POST',
    headers: {'Content-Type': 'application/json',
              'Authorization': 'Basic '+ token},
    body: JSON.stringify({"id": id, 
                          "password": ""})
    }).then((response) => {
      console.log(response);
    });
}

function doi_quyen() {
  var id = document.getElementById('o_id').value;
  var start = document.getElementById('time_start').value;
  var end = document.getElementById('time_end').value;
  fetch("/quanly/thayquyen/?id=" + id + "&start=" + start + "&end=" + end, {headers: {
      'Authorization': 'Basic '+ token
    }}).then((response) => {
      console.log(response);
    });
}
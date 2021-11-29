var info = document.getElementById("info");

var danhsach = document.getElementById('danhsach');
danhsach.innerHTML = "đang tải...";
laydanhsach = fetch("/danhsach/capduoi/?id=-1").then(response => response.json()).then(res => { //url có dạng đường dẫn/?biến=giá trị&biến=giá trị
    danhsach.innerHTML = "";
    console.log(res);
    for (i in res) { //tạo các hàng
        var tr = document.createElement('tr');
        tr.innerHTML = '<td><input type="checkbox" class = "ck" id="ck-1"></td>'
        for (j in res[i]) { //tạo trường cho các hàng
            var td = document.createElement('td');
            td.innerHTML = res[i][j];
            tr.appendChild(td);
        }

        tr.onclick = function(e) { //tạo sự kiện khi ấn phím sẽ trả về cột id của hàng đó sang ô bên phải màn hình
            str = "/danhsach/capduoi/?id=" + this.getElementsByTagName('td')[1].innerHTML;
            info.innerHTML = "đang tải...";
            fet = fetch(str).then(response => response.json()).then(res => {
                info.innerHTML = "";
                console.log(res);
                for (i in res) {
                    var div = document.createElement("div");
                    div.innerHTML = i;
                    for (j in res[i]) {
                        var item = document.createElement('p');
                        item.innerHTML =j + ": " + res[i][j];
                        div.appendChild(item);
                    }
                    info.appendChild(div);
                }
            });
        }

        danhsach.appendChild(tr);
    }
});


var root_id = localStorage.getItem("id");
var token = localStorage.getItem("token");
var trang = "";

var danhsach = document.getElementById("danhsach2");
if (root_id.length != 6) $("#inkhaibao").hide();

fetch("/danhsach/thongtin", {
    headers: {
        'Authorization': 'Basic ' + token
    }
    })
    .then((response) => response.json())
    .then(res => {
        if (res.loi) document.location.pathname = "/"
        
        var trangthai = document.getElementById("trang_thai_kb");
        var quyen = document.getElementById("quyen_kb");
        
        document.getElementById("ten").innerHTML = res.ten;
        if (root_id.length == 3) document.getElementById("quyen_han").innerHTML = "Quyền hạn A1";
        else if (root_id.length == 2) document.getElementById("quyen_han").innerHTML = "Quyền hạn A2";
        else if (root_id.length == 4) document.getElementById("quyen_han").innerHTML = "Quyền hạn A3";
        else if (root_id.length == 6) document.getElementById("quyen_han").innerHTML = "Quyền hạn B1";
        else if (root_id.length == 8) document.getElementById("quyen_han").innerHTML = "Quyền hạn B2";

        if (res.quyen == "Không") {
            quyen.innerHTML = "Không";
            quyen.className = "badge bg-secondary";
            trangthai.innerHTML = "Không có quyền khai báo";
            trangthai.className = "badge bg-secondary";
        } else {
            if (res.dangkhaibao == "0") {
                trangthai.innerHTML = "Chưa mở khai báo";
                trangthai.className = "badge bg-warning";
            } else {
                trangthai.innerHTML = "Đang mở khai báo";
                trangthai.className = "badge bg-primary";
            }
        }
    })
    .then(capDuoi(root_id));

function capDuoi(id) {
    fetch("/quanly/capduoi?id=" + id, {
        headers: {'Authorization': 'Basic ' + token}
        })
        .then((response) => response.json())
        .then(res => {
            if (res.loi) {
                baoLoi(false, "Không tìm được thông tin");
            } else {
                trang = res;
                hienThiCapduoi();
            }
        })
}

function hienThiCapduoi() {
    while (danhsach.firstChild) {
        danhsach.firstChild.remove()
    }

    for (i = 0; i < trang.length; i++) {
        var line = trang[i];
        var tr = document.createElement("tr");
        var td1 = document.createElement("td");
        var td3 = document.createElement("td");
        var td2 = document.createElement("td");
        var td4 = document.createElement("td");
        var td5 = document.createElement("td");
        var td6 = document.createElement("td");

        td1.innerHTML = line.id;
        td2.innerHTML = line.ten;
        if (line.matkhau == "Có") td3.innerHTML = "<span class='badge bg-primary'>Có</span>";
        else td3.innerHTML = "<span class='badge bg-secondary'>Không</span>";
        if (line.quyen == "Có") td4.innerHTML = "<span class='badge bg-primary'>Có</span>";
        else td4.innerHTML = "<span class='badge bg-secondary'>Không</span>";
        td5.innerHTML = "75%";

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.setAttribute('onclick', "thongTin(\""+i+"\")")

        danhsach.appendChild(tr);
    }
}

function thongTin(i) {
    var line = trang[i];
    var dsthongtin = document.getElementById("danhsachthongtin");
    while (dsthongtin.firstChild) {
        dsthongtin.firstChild.remove()
    }

    var thongtin = document.getElementById("thongtin");
    $("#thongtin strong").text("Mã địa phương: " + line.id);
    $("#thongtin h2").text(line.ten);
    $("#thongtin h6 span").text(i);

    if (line.matkhau == "Có") {
        $("#mk").html("Mật khẩu: <span class='badge bg-primary'>Có</span>");
        $("#xoamk").show();
    } else {
        $("#mk").html("Mật khẩu: <span class='badge bg-secondary'>Không</span>");
        $("#xoamk").hide();
    }

    if (line.quyen == "Có") {
        $("#quyen").html("Quyền: <span class='badge bg-primary'>Có</span>");
        $("#xoaquyen").show();
    } else {
        $("#quyen").html("Quyền: <span class='badge bg-secondary'>Không</span>");
        $("#xoaquyen").hide();
    }

    $("#batdau").text("Từ: " + line.batdau);
    $("#ketthuc").text("Đến: " + line.ketthuc);
    $("#homnay").text("Hôm nay: " + line.homnay);
    let ds = thongtin.cloneNode(true);

    dsthongtin.appendChild(ds);
}

function doiMatKhau() {
    var i = $("#danhsachthongtin h6 span").text();
    line = trang[i];
    $("#bangdoimatkhau h5 span").text(line.id);
    $("#bangdoimatkhau h2").text(line.ten);
    xacnhan = document.getElementById("xndoimatkhau")
    xacnhan.innerHTML = "Xác nhận";
    xacnhan.disabled = false;
    $("#bangdoimatkhau").modal('show');
}

function xoaMatKhau() {
    var i = $("#danhsachthongtin h6 span").text();
    line = trang[i];
    $("#bangxoamatkhau h5 span").text(line.id);
    $("#bangxoamatkhau h2").text(line.ten);
    xacnhan = document.getElementById("xnxoamatkhau")
    xacnhan.innerHTML = "Xác nhận";
    xacnhan.disabled = false;
    $("#bangxoamatkhau").modal('show');
}

function suaQuyen() {
    var i = $("#danhsachthongtin h6 span").text();
    line = trang[i];
    $("#bangsuaquyen h5 span").text(line.id);
    $("#bangsuaquyen h2").text(line.ten);
    $("#nhapngaybatdau").val(line.batdau);
    $("#nhapngayketthuc").val(line.ketthuc);
    xacnhan = document.getElementById("xnsuaquyen")
    xacnhan.innerHTML = "Xác nhận";
    xacnhan.disabled = false;
    $("#bangsuaquyen").modal('show');
}

function xoaQuyen() {
    var i = $("#danhsachthongtin h6 span").text();
    line = trang[i];
    $("#bangxoaquyen h5 span").text(line.id);
    $("#bangxoaquyen h2").text(line.ten);
    xacnhan = document.getElementById("xnxoaquyen")
    xacnhan.innerHTML = "Xác nhận";
    xacnhan.disabled = false;
    $("#bangxoaquyen").modal('show');
}

function xnDoiMk() {
    var i = $("#danhsachthongtin h6 span").text();
    line = trang[i];
    var xacnhan = document.getElementById("xndoimatkhau");
    var dsthongtin = document.getElementById("danhsachthongtin");
    xacnhan.innerHTML = "<span class='spinner-border spinner-border-sm'></span> Đang tải...";
    xacnhan.disabled = true;

    var n = $("#nhapmatkhau").val();
    var r = $("#nhaplaimatkhau").val();
    if (n != r) {
        baoLoi(false, "Mật khẩu nhập lại sai")
    } else {
        fetch("/quanly/thaymk", {
            method: 'POST',
            headers: {'Content-Type': 'application/json',
                        'Authorization': 'Basic '+ token},
            body: JSON.stringify({"id": line.id, 
                                    "password": n})
            }).then((response) => {
                if (response.status == 200) {
                    $("#bangdoimatkhau").modal('hide');
                    while (dsthongtin.firstChild) {
                        dsthongtin.firstChild.remove()
                    }
                    baoLoi(true, "Đổi mật khẩu thành công");
                    capDuoi(root_id);
                }
                else
                    baoLoi(false, "Đổi mật khẩu thất bại");
            })
    }
}

function xnXoaMk() {
    var i = $("#danhsachthongtin h6 span").text();
    line = trang[i];
    var xacnhan = document.getElementById("xnxoamatkhau");
    var dsthongtin = document.getElementById("danhsachthongtin");
    xacnhan.innerHTML = "<span class='spinner-border spinner-border-sm'></span> Đang tải...";
    xacnhan.disabled = true;

    fetch("/quanly/thaymk", {
        method: 'POST',
        headers: {'Content-Type': 'application/json',
                    'Authorization': 'Basic '+ token},
        body: JSON.stringify({"id": line.id, 
                                "password": ""})
        }).then((response) => {
            if (response.status == 200) {
                $("#bangxoamatkhau").modal('hide');
                while (dsthongtin.firstChild) {
                    dsthongtin.firstChild.remove()
                }
                baoLoi(true, "Xóa mật khẩu thành công");
                capDuoi(root_id);
            }
            else
                baoLoi(false, "Xóa mật khẩu thất bại");
        })
}

function xnSuaQuyen() {
    var i = $("#danhsachthongtin h6 span").text();
    line = trang[i];
    var xacnhan = document.getElementById("xnsuaquyen");
    var dsthongtin = document.getElementById("danhsachthongtin");
    xacnhan.innerHTML = "<span class='spinner-border spinner-border-sm'></span> Đang tải...";
    xacnhan.disabled = true;

    var batdau = $("#nhapngaybatdau").val();
    var ketthuc = $("#nhapngayketthuc").val();

    fetch("/quanly/thayquyen/?id=" + line.id + "&start=" + batdau + "&end=" + ketthuc, {headers: {
            'Authorization': 'Basic '+ token
        }}).then((response) => {
            if (response.status == 200) {
                $("#bangsuaquyen").modal('hide');
                while (dsthongtin.firstChild) {
                    dsthongtin.firstChild.remove()
                }
                baoLoi(true, "Thay đổi quyền thành công");
                capDuoi(root_id);
            }
            else
                baoLoi(false, "Thay đổi quyền thất bại");
        })
}

function xnXoaQuyen() {
    var i = $("#danhsachthongtin h6 span").text();
    line = trang[i];
    var xacnhan = document.getElementById("xnxoaquyen");
    var dsthongtin = document.getElementById("danhsachthongtin");
    xacnhan.innerHTML = "<span class='spinner-border spinner-border-sm'></span> Đang tải...";
    xacnhan.disabled = true;

    fetch("/quanly/xoaquyen/?id=" + line.id , {headers: {
            'Authorization': 'Basic '+ token
        }}).then((response) => {
            if (response.status == 200) {
                $("#bangxoaquyen").modal('hide');
                while (dsthongtin.firstChild) {
                    dsthongtin.firstChild.remove()
                }
                baoLoi(true, "Xóa quyền thành công");
                capDuoi(root_id);
            }
            else
                baoLoi(false, "Xóa quyền thất bại");
        })
}
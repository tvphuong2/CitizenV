var root_id = localStorage.getItem("id");
var token = localStorage.getItem("token");

var danhsach = document.getElementById("danhsach");
var danh_sach = new Array(5);
var trang_max = 0;
var trang = -1;
var mode = "them";
var id_hien_tai = root_id;

$("#dsdachon").hide();

if (root_id.length == 3) {trang_max = 4}
if (root_id.length == 2) {trang_max = 3}
if (root_id.length == 4) {trang_max = 2}
if (root_id.length == 6) {trang_max = 1}
if (root_id.length == 8) {trang_max = 0}
if (root_id.length <6) $("#khaibao").html("")
else $("#khaibao").hide()

fetch("/danhsach/thongtin", {
    headers: {
        'Authorization': 'Basic ' + token
    }
    })
    .then((response) => response.json())
    .then(res => {
        if (res.loi) {
            document.location.pathname = "/"
        }

        var trangthai = document.getElementById("trang_thai_kb");
        var thongtin = document.getElementById("thong_tin_kb");
        
        document.getElementById("ten").innerHTML = res.ten;
        if (root_id.length == 3) document.getElementById("quyen_han").innerHTML = "Quyền hạn A1";
        else if (root_id.length == 2) document.getElementById("quyen_han").innerHTML = "Quyền hạn A2";
        else if (root_id.length == 4) document.getElementById("quyen_han").innerHTML = "Quyền hạn A3";
        else if (root_id.length == 6) document.getElementById("quyen_han").innerHTML = "Quyền hạn B1";
        else if (root_id.length == 8) document.getElementById("quyen_han").innerHTML = "Quyền hạn B2";

        if (res.quyen == "0") {
            trangthai.innerHTML = "Không có quyền khai báo";
            trangthai.className = "badge bg-secondary";
            thongtin.innerHTML = "";
        } else {
            if (root_id.length == 8) {
                thongtin.innerHTML = "";
            } else if (res.dangkhaibao == "0") {
                trangthai.innerHTML = "Chưa mở khai báo";
                trangthai.className = "badge bg-warning";
                thongtin.innerHTML = "";
            } else {
                trangthai.innerHTML = "Đang mở khai báo";
                trangthai.className = "badge bg-primary";
                document.getElementById("han_cuoi").innerHTML = res.han;
                document.getElementById("dang_kb").innerHTML = res.dangkhaibao + " Địa phương";
                document.getElementById("tien_do").innerHTML = (res.tiendo * 100/res.dangkhaibao).toString().substring(0,5) + "%";
            }
        }
        return res.ten;
    })
    .then(ten => capDuoi(root_id, ten));

function capDuoi(id, name) {
    id_hien_tai = id;
    trang += 1;
    fetch("/danhsach/capduoi?id=" + id, {
        headers: {'Authorization': 'Basic ' + token}
        })
        .then((response) => response.json())
        .then(res => {
            if (res.loi) {
                baoLoi(false, "Không tìm được thông tin");
            } else {
                danh_sach[trang] = res;
                suaDiaChi(name);
                hienThiCapduoi();
            }
        })
}

function hienThiCapduoi() {
    while (danhsach.firstChild) {
        danhsach.firstChild.remove()
    }
    if (trang == trang_max) $("#themdiaphuong").text("+ Hộ khẩu")
    else $("#themdiaphuong").text("+ Địa phương")

    boChonHet()
    for (i = 0; i < danh_sach[trang].length; i++) {
        var line = danh_sach[trang][i];
        var tr = document.createElement("tr");
        var td1 = document.createElement("td");
        var td3 = document.createElement("td");
        var td2 = document.createElement("td");
        var td4 = document.createElement("td");
        var td5 = document.createElement("td");
        var div = document.createElement("div");

        td1.innerHTML = "<input type='checkbox' id='ck_"+line.id+"' onchange='chon(event,\""+line.id+"\",\""+line.ten+"\")'>";
        td2.innerHTML = "<label for='ck_"+line.id+"'>"+line.id+"</label>";
        td3.innerHTML = "<label for='ck_"+line.id+"' id='ten_"+line.id+"'>"+line.ten+"</label>";
        td4.innerHTML = "<button class='btn btn-outline-success' onclick='capDuoi(\""+line.id+"\",\""+line.ten+"\")'>Cấp dưới</button>"
        td4.className = "text-center";
        td5.className = "text-center";
        div.className = "";

        if (trang == 0 || (trang == trang_max && root_id.length >= 6)) {
            div.innerHTML = "<button class ='btn btn-outline-primary border-end-0' onclick='xemThongTin(\""+i+"\")'><i class='fas fa-eye'></i></button>" +
                            "<button class='btn btn-outline-warning' onclick='chinhSua(\""+i+"\")'><i class='fas fa-edit'></i></button>" +
                            "<button class='btn btn-outline-danger border-start-0' onclick='xoa(\""+i+"\")'><i class='fas fa-trash-alt'></i></button>";
        } else {
            div.innerHTML = "<button class ='btn btn-outline-primary' onclick='xemThongTin(\""+i+"\")'><i class='fas fa-eye'></i></button>";
        }
        
        tr.id = "ds_" + line.id;
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        if (trang != trang_max) tr.appendChild(td4);
        else tr.appendChild(document.createElement("td"));
        td5.appendChild(div);
        tr.appendChild(td5)
        danhsach.appendChild(tr);
    }
}

function suaDiaChi(ten) {
    boChonHet()
    diachi = document.getElementById("diachi");
    var li = document.createElement("li");
    li.innerHTML = ten;
    li.id = "dc_" + trang;
    li.className = "breadcrumb-item";
    li.onclick = function () {
        i = this.id[3];
        while(this.nextSibling) {
            this.parentNode.removeChild(this.nextSibling);
        }
        trang = parseInt(i);
        hienThiCapduoi();
    }
    diachi.appendChild(li);
}

function chon(event, id, ten) {
    if (event.currentTarget.checked) {
        chonDiaPhuong(id, ten);
    } else {
        boChon(id);
    }
}

function chonDiaPhuong(id, ten) {
    var dachon = document.getElementById("da_chon");
    var li = document.createElement("li");
    li.id = "l_" + id;
    li.className = "list-group-item mt-2";
    li.innerHTML = "<strong>"+id+"</strong> | <span>" + ten + "</span>";
    li.onclick = function () {
        id = this.id.substring(2);
        var diaphuong = document.getElementById("ds_" + id).firstChild.firstChild;
        diaphuong.checked = false;
        parent = this.parentNode;
        parent.removeChild(this);
        document.getElementById("soluong").innerHTML = parent.childNodes.length;
        if (parent.childNodes.length == 0) 
            $("#dsdachon").hide();
    }
    dachon.appendChild(li);
    document.getElementById("soluong").innerHTML = dachon.childNodes.length;
    $("#dsdachon").show();
}

function boChon(id) {
    var diaphuong = document.getElementById("l_" + id);
    if (diaphuong) {
        diaphuong.parentNode.removeChild(diaphuong);
    }
    var dachon = document.getElementById("da_chon");
    document.getElementById("soluong").innerHTML = dachon.childNodes.length;
    if (dachon.childNodes.length == 0)
        $("#dsdachon").hide();
}

function boChonHet() {
    var dachon = document.getElementById("da_chon");
    document.getElementById("soluong").innerHTML = 0;
    $("#dsdachon").hide();
    while (dachon.firstChild) {
        dachon.firstChild.remove()
    }
}

function xemThongTin(i) {
    if (trang == trang_max) {
        xemNhanKhau(i);
    } else {
        line = danh_sach[trang][i];
        if (line.quyen == "0") line.quyen = "Không";
        else if(line.quyen == "1") line.quyen = "Có";

        var dsthongtin = document.getElementById("danhsachthongtin");
        while (dsthongtin.firstChild) {
            dsthongtin.firstChild.remove()
        }
        var thongtin = document.createElement("div");
        div1 = document.createElement("div");
        div2 = document.createElement("div");
        div21 = document.createElement("div");
        div22 = document.createElement("div");
    
        thongtin.className = "toast show thongtin";
    
        div1.className = "toast-header";
        div2.className = "toast-body card";
        div21.className = "card-body";
        div22.className = "card-footer pb-0";
    
        div1.innerHTML = "<strong class='me-auto'>Mã địa phương: "+ line.id +
                        "</strong><button type='button' class='btn-close' data-bs-dismiss='toast'></button>";
        div21.innerHTML = "<h2>"+line.ten+"</h2><p>Diện tích: "+line.dientich+"</p><p>Quyền: "+line.quyen+"</p>";

            
        if (trang == 0) {
            div22.innerHTML = "<div class='input-group mb-3'>"+
                            "<button class='btn btn-outline-primary' type='button' onclick='chinhSua(\""+i+"\")'>Chỉnh sửa</button>"+
                            "<button class='btn btn-outline-danger' type='button' onclick='xoa(\""+i+"\")'>Xóa</button></div>";
        }
        
        div2.appendChild(div21);
        div2.appendChild(div22);
        thongtin.appendChild(div1);
        thongtin.appendChild(div2);
        dsthongtin.appendChild(thongtin);
    } 
}

function xemNhanKhau(i) {
    var line = danh_sach[trang][i];
    $("#khaibao").show();
    $("#khaibao h2").text("Xem hộ khẩu");
    $("#tenho").val(line.ten);
    $("#khaibao strong").text("ID hộ: " + line.id);
    hienThiNhanKhau(line.id, true)
}

function chinhSua(i) {
    mode = "sua";
    var line = danh_sach[trang][i];

    if (trang != trang_max) {
        $("#nhapten").val(line.ten);
        $("#nhapdientich").val(line.dientich);
        $("#bangchinhsua h5 span").text(line.id);
    
        $("#bangchinhsua").modal('show');
    } else {
        $("#khaibao").show();
        $("#khaibao h2").text("Chỉnh sửa hộ khẩu");
        $("#tenho").val(line.ten);
        $("#khaibao strong").text("ID hộ: " + line.id);

        hienThiNhanKhau(line.id, false);
    }
}

function them() {
    mode = "them";
    if (trang != trang_max) {
        $("#nhaptenmoi").val("");
        $("#nhapdientichmoi").val("");
        $("#bangthem").modal('show');
    } else {
        $("#khaibao").show();
        $("#khaibao h2").text("Thêm hộ khẩu");
        $("#tenho").val("");
        $("#khaibao strong").text("");

        themHoKhau();
    }
}

function xoa(i) {
    var line = danh_sach[trang][i];
    if (trang != trang_max) {
        $("#bangxoa h5 span").text(line.id);
        $("#bangxoa p span").text(line.ten);

        $("#bangxoa").modal('show');
    } else {
        $("#bangxoaho h5 span").text(line.id);
        $("#bangxoaho p span").text(line.ten);

        $("#bangxoaho").modal('show');
    }
}

function xnChinhSua() {
    var ten = $("#nhapten").val();
    var dientich = $("#nhapdientich").val();
    var id = $("#bangchinhsua h5 span").text();
    var xacnhan = document.getElementById('xnchinhsua')

    xacnhan.innerHTML = "<span class='spinner-border spinner-border-sm'></span> Đang tải...";
    xacnhan.disabled = true;

    fetch("/danhsach/chinhsua/?id=" + id +"&name=" + ten +"&dientich=" + dientich, {headers: {
        'Authorization': 'Basic '+ token
        }})
        .then((response) => {
            xacnhan.innerHTML = "Xác nhận";
            xacnhan.disabled = false;
            if (response.status == 200) {
                $("#bangchinhsua").modal('hide');
                baoLoi(true, "Chỉnh sửa thành công");
                trang = -1;
                $("#diachi").html("");
                capDuoi(root_id, $("#ten").text());
            } else {
                baoLoi(false, "Chỉnh sửa thất bại");
            }
        })
}

function xnXoa() {
    var id = $("#bangxoa h5 span").text();
    var xacnhan = document.getElementById('xnxoa')

    xacnhan.innerHTML = "<span class='spinner-border spinner-border-sm'></span> Đang tải...";
    xacnhan.disabled = true;

    fetch("/danhsach/xoa/?id=" + id, {headers: {
        'Authorization': 'Basic '+ token
        }})
        .then((response) => {
            xacnhan.innerHTML = "Xác nhận";
            xacnhan.disabled = false;
            if (response.status == 200) {
                $("#bangxoa").modal('hide');
                baoLoi(true, "Xóa thành công");
                trang = -1;
                $("#diachi").html("");
                capDuoi(root_id, $("#ten").text());
            } else {
                baoLoi(false, "Xóa thất bại");
            }
        })
}

function xnXoaHo() {
    var id = $("#bangxoaho h5 span").text();
    var xacnhan = document.getElementById('xnxoaho')

    xacnhan.innerHTML = "<span class='spinner-border spinner-border-sm'></span> Đang tải...";
    xacnhan.disabled = true;

    fetch("/nhaplieu/xoaho/?idho=" + id, {headers: {
        'Authorization': 'Basic '+ token
        }})
        .then((response) => {
            xacnhan.innerHTML = "Xác nhận";
            xacnhan.disabled = false;
            if (response.status == 200) {
                $("#bangxoaho").modal('hide');
                taiLaiNhanKhau();
                baoLoi(true, "Xóa hộ thành công");
            } else {
                baoLoi(false, "Xóa hộ thất bại");
            }
        })
}

function xnThem() {
    var xacnhan = document.getElementById('xnthem');
    var ten = $("#nhaptenmoi").val();
    var dientich = $("#nhapdientichmoi").val();

    xacnhan.innerHTML = "<span class='spinner-border spinner-border-sm'></span> Đang tải...";
    xacnhan.disabled = true;

    fetch("/danhsach/taomoi/?name=" + ten + "&dientich=" + dientich, {headers: {
        'Authorization': 'Basic '+ token
        }})
        .then((response) => {
            xacnhan.innerHTML = "Xác nhận";
            xacnhan.disabled = false;
            if (response.status == 200) {
                $("#bangthem").modal('hide');
                baoLoi(true, "Thêm địa phương thành công");
                trang = -1;
                $("#diachi").html("");
                capDuoi(root_id, $("#ten").text());
            } else {
                baoLoi(false, "Thêm địa phương thất bại");
            }
        })
}

function hienThiNhanKhau(id, xem) {
    var thanhvien = document.getElementById("an").getElementsByClassName("thanhvien")[0];
    var cacthanhvien = document.getElementById("cacthanhvien");
    $("#cacthanhvien").empty();
    fetch("/danhsach/danhsachnhankhau/?id=" + id, {headers: {
    'Authorization': 'Basic '+ token
    }})
    .then(response => response.json()).then(res => {
        if (res.loi) {
            baoLoi(false, "Không tìm được nhân khẩu");
        } else {
            for (i = 0; i < res.length; i++) {
                let tv = thanhvien.cloneNode(true);
                let children = tv.childNodes;
                children[0].childNodes[1].value = res[i].hoten;
                children[1].childNodes[1].value = res[i].cmnd;
                children[2].childNodes[1].value = res[i].nghenghiep;
                children[3].childNodes[1].value = res[i].gioitinh == "1" ? "Nữ" : "Nam";
                children[4].childNodes[1].value = res[i].ngaysinh;
                children[5].childNodes[1].value = res[i].quoctich;
                children[6].childNodes[1].value = res[i].tongiao;
                children[7].childNodes[1].value = res[i].trinhdo;
                children[8].childNodes[1].value = res[i].thuongtru;
                children[9].childNodes[1].value = res[i].tamtru;
                cacthanhvien.appendChild(tv);
            }
            if (xem) {
                $("#khaibao button").hide();
                $("#khaibao input").prop('disabled', true);
                $("#khaibao select").prop('disabled', true);
            } else {
                $("#khaibao button").show();
                $("#khaibao input").prop('disabled', false);
                $("#khaibao select").prop('disabled', false);
            }
        }
    })
}

function themHoKhau() {
    var thanhvien = document.getElementById("an").getElementsByClassName("thanhvien")[0];
    var cacthanhvien = document.getElementById("cacthanhvien");
    $("#cacthanhvien").empty();
    
    let tv = thanhvien.cloneNode(true);
    cacthanhvien.appendChild(tv);

    $("#khaibao button").show();
    $("#khaibao input").prop('disabled', false);
    $("#khaibao select").prop('disabled', false);
}

function themNhanKhau() {
    let thanhvien = document.getElementById("an").getElementsByClassName("thanhvien")[0];
    let cacthanhvien = document.getElementById("cacthanhvien");
    let tv = thanhvien.cloneNode(true);
    cacthanhvien.appendChild(tv);
}

function xoaNhanKhau(node) {
    node.parentNode.parentNode.removeChild(node.parentNode);
}

function thayDoiNhanKhau() {
    var tenho = $("#tenho").val();
    var ten = $("#cacthanhvien .ten input");
    var cmnd = $("#cacthanhvien .cmnd input");
    var nghe = $("#cacthanhvien .nghe input");
    var gioi = $("#cacthanhvien .gioi select");
    var ngaysinh = $("#cacthanhvien .ngaysinh input");
    var quoctich = $("#cacthanhvien .quoctich input");
    var tongiao = $("#cacthanhvien .tongiao input");
    var trinhdo = $("#cacthanhvien .trinhdo input");
    var thuongtru = $("#cacthanhvien .thuongtru input");
    var tamtru = $("#cacthanhvien .tamtru input");

    var cacthanhvien = [];
    for (var i = 0; i < ten.length; i++) {
        var thanhvien = {ten: ten[i].value,
                        cmnd: cmnd[i].value,
                        nghe: nghe[i].value,
                        gioi: gioi[i].value == "Nữ" ? "1" : "0",
                        ngaysinh: ngaysinh[i].value,
                        quoctich: quoctich[i].value,
                        tongiao: tongiao[i].value,
                        trinhdo: trinhdo[i].value,
                        thuongtru: thuongtru[i].value,
                        tamtru: tamtru[i].value
                        }
        cacthanhvien.push(thanhvien);
    }

    if (mode == "them") {
        fetch('/nhaplieu/themho',{
            method: 'POST',
            headers: {'Content-Type': 'application/json',
                      'Authorization': 'Basic '+ token},
            body: JSON.stringify({"tenho": tenho,
                                  "idthon": id_hien_tai,
                                  "cacthanhvien": cacthanhvien})
            }).then(response => {
                if (response.status == 200) {
                    taiLaiNhanKhau();
                    baoLoi(true, "Thêm hộ thành công");
                } else {
                    baoLoi(false, "Thêm hộ thất bại");
                }
            })
    } else {
        var id = $("#khaibao strong").text().substring(7);
        fetch('/nhaplieu/suaho',{
            method: 'POST',
            headers: {'Content-Type': 'application/json',
                      'Authorization': 'Basic '+ token},
            body: JSON.stringify({"tenho": tenho,
                                  "idho": id,
                                  "cacthanhvien": cacthanhvien})
            }).then(response => {
                if (response.status == 200) {
                    taiLaiNhanKhau();
                    baoLoi(true, "Sửa hộ thành công");
                } else {
                    baoLoi(false, "Sửa hộ thất bại");
                }
            })
    }
}

function huyBoNhanKhau() {
    $("#khaibao").hide();
}

function taiLaiNhanKhau() {
    fetch("/danhsach/capduoi?id=" + id_hien_tai, {
        headers: {'Authorization': 'Basic ' + token}
    })
    .then((response) => response.json())
    .then(res => {
        if (res.loi) {
            baoLoi(false, "Không tìm được thông tin");
        } else {
            danh_sach[trang] = res;
            hienThiCapduoi();
            for (var i = 0; i < res.length; i++) {
                if (res[i].ten == $("#tenho").val().trim()) xemNhanKhau(i);
            }
        }
    })
}

function thongKe() {
    var arr = []
    var ten = []
    var list = $("#da_chon li strong")
    var ten_list = $("#da_chon li span")
    var type = $("#thongke select").eq(0).val();
    for (var i = 0; i < list.length; i++) {
        arr.push(list[i].innerHTML)
        ten.push(ten_list[i].innerHTML)
    }
    console.log(arr);

    let worker = new SharedWorker("/js/share.js");
    var data = {
        'mes': arr,
        'ten': ten,
        'type': type
    }
    worker.port.postMessage(data);
    window.open('/thongke', '_blank').focus();
}
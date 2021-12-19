var root_id = localStorage.getItem("id");
var token = localStorage.getItem("token");
var ketqua = "";

if (root_id.length != 3) timTen("#chontinh", 2)
if (root_id.length > 3) timTen("#chonhuyen", 4)
if (root_id.length > 4) timTen("#chonxa", 6)
if (root_id.length > 6) timTen("#chonthon", 8)

if(root_id.length == 3) timTuyenDuoi("#chontinh", 3)
if(root_id.length == 2) timTuyenDuoi("#chonhuyen", 2)
if(root_id.length == 4) timTuyenDuoi("#chonxa", 4)
if(root_id.length == 6) timTuyenDuoi("#chonthon", 6)

function timTen(id, end) {
    $(id).prop('disabled', true);
    fetch("/danhsach/timten/?id="  + root_id.substring(0,end), {headers: {
        'Authorization': 'Basic '+ token
        }})
        .then((response) => response.json())
        .then(res => {
            $(id).append($("<option id=o_"+res.id+"></option>").text(res.ten));
            $(id).val(res.ten);
        })
}

function timTuyenDuoi(id, end) {
    console.log("pip")
    if($(id).prop('disabled') == false) {
        fetch("/danhsach/timtencapduoi/?id="  + root_id.substring(0,end), {headers: {
            'Authorization': 'Basic '+ token
            }})
            .then((response) => response.json())
            .then(res => {
                for (var i = 0; i <res.length; i++) {
                    $(id).append($("<option id=o_"+res[i].id+"></option>").text(res[i].ten));
                }
            })
    }
}

function timTiep(id, sel, after) {
    var options = sel.options;
    var i = sel.selectedIndex;
    if (i == 0) {
        $(id).html('<option value="">-- Tất cả --</option>');
        for (j = 0; j < after.length; j++) {
            $(after[j]).html('<option value="">-- Tất cả --</option>');
        }
    } else {
        fetch("/danhsach/timtencapduoi/?id="  + options[i].id.substring(2), {headers: {
            'Authorization': 'Basic '+ token
            }})
            .then((response) => response.json())
            .then(res => {
                $(id).html('<option value="">-- Tất cả --</option>');
                for (j = 0; j < after.length; j++) {
                    $(after[j]).html('<option value="">-- Tất cả --</option>');
                }
                for (var i = 0; i <res.length; i++) {
                    $(id).append($("<option id=o_"+res[i].id+"></option>").text(res[i].ten));
                }
            })
    }
}

function traCuu() {
    var cmnd = $("#cmnd").val();
    var ten = $("#ten").val();
    var tuoi = $("#tuoi").val();
    var gioi = $("#gioi").val();
    var tongiao = $("#tongiao").val();
    var quoctich = $("#quoctich").val();
    var trinhdo = $("#trinhdo").val();
    var max_id = "";

    if (document.getElementById("chontinh").selectedIndex == 0) {
        max_id = root_id;
    } else if (document.getElementById("chonhuyen").selectedIndex == 0) {
        var i = document.getElementById("chontinh");
        max_id = i.options[i.selectedIndex];
    } else if (document.getElementById("chonxa").selectedIndex == 0) {
        var i = document.getElementById("chonhuyen");
        max_id = i.options[i.selectedIndex];
    } else if (document.getElementById("chonthon").selectedIndex == 0) {
        var i = document.getElementById("chonxa");
        max_id = i.options[i.selectedIndex];
    } else {
        var i = document.getElementById("chonthon");
        max_id = i.options[i.selectedIndex];
    }
    max_id = max_id.id.substring(2);

    if(gioi == "Tất cả") gioi = "";
    var url = "/tracuu/timkiem" + 
            "?cmnd=" + cmnd +
            "&ten=" + ten +
            "&tuoi=" + tuoi +
            "&gioi=" + gioi +
            "&tongiao=" + tongiao +
            "&quoctich=" + quoctich +
            "&trinhdo=" + trinhdo +
            "&id=" + max_id

    fetch(url, {headers: {
        'Authorization': 'Basic '+ token
        }})
        .then((response) => response.json())
        .then(res => {
            if (res.loi) {
                baoLoi(false, "Yêu cầu không hợp lệ")
            } else {
                ketqua = res;
                hienThiDanhSach();
            }
        })
}

function hienThiDanhSach() {
    for (var i = 0; i < ketqua.length; i++) {
        var cmnd = $("<td></td>").text(ketqua[i].cmnd);
        var ten = $("<td></td>").text(ketqua[i].hoten);
        var gioitinh = $("<td></td>");
        if (ketqua[i].gioitinh == "0") gioitinh.text("Nam");
        else gioitinh.text("Nữ");
        var ngaysinh = $("<td></td>").text(ketqua[i].ngaysinh);
        var tr = $("<tr onclick=hienThiNhanKhau('"+i+"')></tr>").append(cmnd, ten, gioitinh,ngaysinh);
        $("#danhsach2").append(tr);
    }
}

function hienThiNhanKhau(i) {
    $("#thongtinnhankhau").empty();
    $("#an #thongtin h2").text(ketqua[i].hoten);
    $("#an #thongtin p span").eq(0).text(ketqua[i].cmnd);
    $("#an #thongtin p span").eq(1).text(ketqua[i].ngaysinh);
    $("#an #thongtin p span").eq(2).text(ketqua[i].gioitinh == 1 ? "Nữ" : "Nam");
    $("#an #thongtin p span").eq(3).text(ketqua[i].tongiao);
    $("#an #thongtin p span").eq(4).text(ketqua[i].quoctich);
    $("#an #thongtin p span").eq(5).text(ketqua[i].nghenghiep);
    $("#an #thongtin p span").eq(6).text(ketqua[i].trinhdo);
    $("#an #thongtin p span").eq(7).text(ketqua[i].thuongtru);
    $("#an #thongtin p span").eq(8).text(ketqua[i].tamtru);
    $("#an #thongtin").clone().appendTo("#thongtinnhankhau");

}
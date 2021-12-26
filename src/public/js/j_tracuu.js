var root_id = localStorage.getItem("id");
var ketqua = "";

if (root_id.length != 3) timTen("#chontinh", 2)
if (root_id.length > 3) timTen("#chonhuyen", 4)
if (root_id.length > 4) timTen("#chonxa", 6)
if (root_id.length > 6) timTen("#chonthon", 8)

if(root_id.length == 3) timTuyenDuoi("#chontinh", 3)
if(root_id.length == 2) timTuyenDuoi("#chonhuyen", 2)
if(root_id.length == 4) timTuyenDuoi("#chonxa", 4)
if(root_id.length == 6) timTuyenDuoi("#chonthon", 6)

/**
 * hiển thị tên địa phương vào thẻ <select> được chỉ định
 * @param {string} id #id của <select>
 * @param {int} end độ dài của id
 */
function timTen(id, end) {
    $(id).prop('disabled', true);
    fetch("/danhsach/timten/?id="  + root_id.substring(0,end))
        .then((response) => response.json())
        .then(res => {
            $(id).append($("<option id=o_"+res.id+"></option>").text(res.ten));
            $(id).val(res.ten);
        })
}

/**
 * Hiển thị các địa phương cấp dưới dưới dạng các <option>
 * @param {string} id #id của <select>
 * @param {int} end độ dài của id
 */
function timTuyenDuoi(id, end) {
    console.log("pip")
    if($(id).prop('disabled') == false) {
        fetch("/danhsach/timtencapduoi/?id="  + root_id.substring(0,end))
            .then((response) => response.json())
            .then(res => {
                for (var i = 0; i <res.length; i++) {
                    $(id).append($("<option id=o_"+res[i].id+"></option>").text(res[i].ten));
                }
            })
    }
}

/**
 * Hiển thị các địa phương tuyến dưới xuống <Select> phía dưới.
 * Nếu sửa là 'tất cả', sửa tất cả tuyến dưới thành 'tất cả'
 * @param {string} id #id của <select>
 * @param {object} sel đối tượng gọi hàm
 * @param {array} after mảng các đối tượng phía sau
 */
function timTiep(id, sel, after) {
    var options = sel.options;
    var i = sel.selectedIndex;
    if (i == 0) {
        $(id).html('<option value="">-- Tất cả --</option>');
        for (j = 0; j < after.length; j++) {
            $(after[j]).html('<option value="">-- Tất cả --</option>');
        }
    } else {
        fetch("/danhsach/timtencapduoi/?id="  + options[i].id.substring(2))
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

/**
 * Tra cứu nhân khẩu với các điều kiện đã được nhập ở mục tìm kiếm
 */
function traCuu() {
    $("#danhsach2").empty();
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
        max_id = i.options[i.selectedIndex].id.substring(2);
    } else if (document.getElementById("chonxa").selectedIndex == 0) {
        var i = document.getElementById("chonhuyen");
        max_id = i.options[i.selectedIndex].id.substring(2);
    } else if (document.getElementById("chonthon").selectedIndex == 0) {
        var i = document.getElementById("chonxa");
        max_id = i.options[i.selectedIndex].id.substring(2);
    } else {
        var i = document.getElementById("chonthon");
        max_id = i.options[i.selectedIndex].id.substring(2);
    }

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

    fetch(url)
        .then((response) => response.json())
        .then(res => {
            if (res.loi) {
                baoLoi(false, "Yêu cầu không hợp lệ")
            } else {
                ketqua = res;
                if (ketqua.length == 0) baoLoi(false, "Không tìm được kết quả nào")
                hienThiDanhSach();
            }
        })
}

/**
 * Hiển thị danh sách trong bộ nhớ lên màn hình
 */
function hienThiDanhSach() {
    for (var i = 0; i < ketqua.length; i++) {
        var cmnd = $("<td></td>").text(ketqua[i].cmnd);
        var ten = $("<td></td>").text(ketqua[i].hoten);
        var gioitinh = $("<td></td>");
        if (ketqua[i].gioitinh == "0") gioitinh.text("Nam");
        else gioitinh.text("Nữ");
        var ngaysinh = $("<td></td>").text(ketqua[i].ngaysinh);
        var tr = $("<tr onclick=hienThiNhanKhau(\""+i+"\",this)></tr>").append(cmnd, ten, gioitinh,ngaysinh);
        $("#danhsach2").append(tr);
    }
}
/**
 * Hiển thị bảng thông tin về một nhân khẩu
 * @param {int} i Số thứ tự của nhân khẩu trong bộ nhớ
 */
function hienThiNhanKhau(i, self) {
    $(".chonhang").removeClass("chonhang");
    self.className ="chonhang";
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

var trangthai = [0,0,0,0]
function sapXep(id, self) {
    document.getElementById("cothoten").innerHTML = "Họ và tên";
    document.getElementById("cotgioitinh").innerHTML = "Giới tính";
    document.getElementById("cotngaysinh").innerHTML = "Ngày sinh";
    for (var i = 0; i < trangthai.length; i++) {
        if (i != id) trangthai[i] = 0
        else if (trangthai[i] == 0 || trangthai[i] == 2) trangthai[i] = 1
        else trangthai[i] = 2
    }
    self.innerHTML += trangthai[id] != 1 ? " ▲" : " ▼";
    var danhsach2 = document.getElementById("danhsach2");
    var dong = danhsach2.childNodes;
    for (var i = 0; i < dong.length; i++) {
        var kt = true;
        for (var j = 1; j <dong.length; j++) {
            var x = dong[j].getElementsByTagName("td")[id].innerHTML.toLowerCase();
            var y = dong[j - 1].getElementsByTagName("td")[id].innerHTML.toLowerCase();
            var key = id == 3 ? "/" : " "; 
            if (soSanh(x,y,key) == trangthai[id]) {
                dong[j].parentNode.insertBefore(dong[j], dong[j - 1]);
                kt = false;
            }
        }
        if (kt) break;
    }
}
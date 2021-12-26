/**
 * Các file đặt trong folder public là các file tĩnh hoạt động phía client 
 * Trang chủ là trang quản lý và thống kê địa phương khèm khai báo đối với B1 và B3
 * Quản lý là trang quản lý quyền và cấp tài khoảng khai báo (in khai báo đối với B1)
 * Thống kê là trang thống kê dữ liệu trên yêu cầu từ Trang chủ
 * Tra cứu là trang tìm kiếm thông tin của một hoặc một nhóm người
 */

var root_id = localStorage.getItem("id");
var path = document.location.pathname;
var danhsachtrang = document.getElementById("danhsachtrang").childNodes;

if (path == "/danhsach") danhsachtrang[1].childNodes[1].className = "nav-link active"
if (path == "/quanly") danhsachtrang[3].childNodes[1].className = "nav-link active"
if (path == "/tracuu") danhsachtrang[5].childNodes[1].className = "nav-link active"

if(root_id.length == 8) $("#trangquanly").hide();

/**
 * Hiện thông báo lên màn hình 
 * @param {boolean} success true nếu là thông báo thành công và người lại
 * @param {string} status nội dung thông báo
 */
function baoLoi(success, status) {
    var ds_loi = document.getElementById("ds_loi");

    var div = document.createElement("div");
    if (success) {
        div.className = "alert alert-success alert-dismissible";
        div.innerHTML = "<button type='button' class='btn-close' data-bs-dismiss='alert'></button><strong>Thành công! </strong>" + status;
    } else {
        div.className = "alert alert-danger alert-dismissible";
        div.innerHTML = "<button type='button' class='btn-close' data-bs-dismiss='alert'></button><strong>Thất bại! </strong>" + status;
    }
    ds_loi.appendChild(div);
}

/**
 * viết hoa các ký tự đầu và viết thường các ký tự còn lại, chuẩn hóa dấu cách
 * @param {object} self 
 */
function chuanHoaTen(self) {
    var s = self.value.trim();

    var arr = s.toLowerCase().split(" ");
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] != "") 
            arr[i] = arr[i][0].toUpperCase() + arr[i].substr(1);
        else {
            arr.splice(i, 1);
            i--;
        }
            
    }
    s = arr.join(" ");
    self.value = s;
}

/**
 * Trả về danh sách thành viên
 */
function danhSachThanhVien() {
    var ds_loi = document.getElementById("ds_loi");
    var div = document.createElement("div");

    div.className = "alert alert-success alert-dismissible";
    var info = "<button type='button' class='btn-close' data-bs-dismiss='alert'></button>"
    info += "<h4>Nếu có bất kỳ câu hỏi nào xin vui lòng liên hệ với chúng tôi qua email 19020397@vnu.edu.vn</h4>"
    info += "<h5>Danh sách tác giả:</h5>"
    info += "<p>Tạ Viết Phương</p>"
    info += "<p>Bùi Quang Trường</p>"
    info += "<p>Trương Hoàng Tùng</p>"
    div.innerHTML = info;

    ds_loi.appendChild(div);
}

function soSanh(a,b,key) {
    var a_ = a.split(key)
    var b_ = b.split(key)
    var min = Math.min(a_.length,b_.length)
    for (var i = 1; i <= min; i++) {
        if (a_.at(-i) < b_.at(-i)) return 1
        if (a_.at(-i) > b_.at(-i)) return 2
    }
    return 0
}
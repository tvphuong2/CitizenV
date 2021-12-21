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


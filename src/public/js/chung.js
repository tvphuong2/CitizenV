var root_id = localStorage.getItem("id");
var path = document.location.pathname;
var danhsachtrang = document.getElementById("danhsachtrang").childNodes;

if (path == "/danhsach") danhsachtrang[1].childNodes[1].className = "nav-link active"
if (path == "/quanly") danhsachtrang[3].childNodes[1].className = "nav-link active"
if (path == "/tracuu") danhsachtrang[5].childNodes[1].className = "nav-link active"

if(root_id.length == 8) $("#trangquanly").hide();


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


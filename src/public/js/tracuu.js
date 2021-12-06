var root_id = localStorage.getItem("id");
var token = localStorage.getItem("token");

// $(document).ready(function() {
//     $('#mytable').DataTable({});
// });

var danhsachtinh = document.getElementById("danhsachtinh");
laycmnd = fetch("/danhsach/capduoi/?id=A01", {headers: {
        'Authorization': 'Basic '+ token
    }}).then((response) => response.json())
    .then((res) => {
        //url có dạng đường dẫn/?biến=giá trị&biến=giá trị
        for (i in res) {
            var option = document.createElement("option");
            for (j in res[i]) {
                option.innerHTML = res[i][j];
            }
            danhsachtinh.appendChild(option);
        }
    });

function Chapnhan() {
    console.log(document.getElementById("loi_cmnd"));
    var okie = true; //chua co loi
    //xoa cac thong bao loi
    document.getElementById("loi_cmnd").innerHTML = "";

    //kiem tra cac truong bat buoc nhap
    if (document.getElementById("CMND").value == "") {
        document.getElementById("loi_cmnd").innerHTML = "chưa nhập cmnd";
        document.getElementById("CMND").focus();
        okie = false;
    }
    //neu tat ca phu hop thi cho phep submit
    //submit form
    if (okie) document.getElementById("form").submit();
}

function timkiem() {
    var cmnd = document.getElementById("cmnd_").value;
    var hoten = document.getElementById("hoten_").value;
    var diaphuong = document.getElementById("diaphuong_").value;

    var url = "/tracuu/timkiem/?cmnd=" + cmnd + "&hoten=" + hoten + "&diaphuong=" + diaphuong; 
    fetch(url , {headers: {
        'Authorization': 'Basic '+ token
        }}).then(response => response.json()).then(res => {
            console.log(res);
        });
}
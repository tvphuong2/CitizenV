$("#loidangnhap").hide()
$("#loimatkhau").hide()

function reg() {
    var id = document.getElementById('id').value;
    var psw = document.getElementById('psw').value;
    var psw_repeat = document.getElementById('psw-repeat').value;

    if (psw != psw_repeat) {
        alert('Mật khẩu ko khớp');
        return;
    }

    fetch('/dangky',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({"id": id, 
                              "password": psw})
        }).then(function (response) {
            console.log(response);
            document.location.pathname = "/"
        })
}

function log() {
    var id = document.getElementById('id').value;
    var psw = document.getElementById('psw').value;
    if (id == "")  {
        $("#loidangnhap").text("Vui lòng điền tên đăng nhập")
        $("#loidangnhap").show()
        $("#id").css('border-color', 'red');
        return
    } else {
        $("#id").css('border-color', '#ced4da');
        $("#loidangnhap").hide()
    }

    if (psw == "") {
        $("#loimatkhau").text("Vui lòng điền mật khẩu")
        $("#loimatkhau").show()
        $("#psw").css('border-color', 'red');
        return
    } else {
        $("#psw").css('border-color', '#ced4da');
        $("#loimatkhau").hide()
    }

    fetch('/',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({"id": id.toUpperCase(), 
                              "password": psw})
        }).then(response => response.json()).then(res => {
            if (res.status == 'thanhcong') {
                localStorage.setItem("id", res.id);
                document.location.pathname = "/danhsach";

            } else if (res.status == 'Mật khẩu sai') {
                $("#loimatkhau").text("Mật khẩu sai")
                $("#loimatkhau").show()
                $("#psw").css('border-color', 'red');
            } else {
                $("#loidangnhap").text(res.status)
                $("#loidangnhap").show()
                $("#id").css('border-color', 'red');
            }
        });
}
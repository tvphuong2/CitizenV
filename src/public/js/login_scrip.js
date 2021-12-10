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

    fetch('/',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({"id": id, 
                              "password": psw})
        }).then(response => response.json()).then(res => {
            if (res.status == 'thanhcong') {
                localStorage.setItem("token", res.token);
                localStorage.setItem("id", res.id);
                if ([2,3,4].includes(res.id.length))
                    document.location.pathname = "/danhsach"
                else
                document.location.pathname = "/nhaplieu"
            } else {
                localStorage.setItem("token", '');
            }
        });
}
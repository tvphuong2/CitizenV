
var danhsach = document.getElementById("danhsach");
var root_id = localStorage.getItem("id");
var token = localStorage.getItem("token");

fetch("/nhaplieu/capduoi/?id=" + root_id, {
    headers: {
        'Authorization': 'Basic ' + token
    }
}).then((response) => response.json())
    .then((res) => {
        for (i in res) {
            //tạo các hàng
            var tr = document.createElement("tr");
            tr.innerHTML = '<td><input type="checkbox" class = "ck" id="ck-1"></td>';
            for (j in res[i]) {
                //tạo trường cho các hàng
                var td = document.createElement("td");
                td.innerHTML = res[i][j];
                tr.appendChild(td);
            }
            danhsach.appendChild(tr);
        }
    });

// Thêm thành viên
document.getElementById("add").onclick = function () {
    var str =
        '<label>Nhập họ tên</label><input type="text"  class="name" /><label> CMND</label><input type="text"  class="cmnd" /><label>Nghề nghiệp</label><input type="text" class="nghe_nghiep" /><label>Giới tính</label><input type="text" class="gioi_tinh" /><label> Ngày sinh</label><input type="text" name="dob" placeholder="nn/tt/nnnn"  class="ngay_sinh" /><label> Quốc tịch</label><input type="text"  class="quoc_tich" /><label> Tôn giáo</label><input type="text"  class="ton_giao" /><label> Trình độ học vấn</label><input type="text"  class="hoc_van" /><label>Địa chỉ thường trú</label><input type="text" class="thuong_tru" /><label>Địa chỉ tạm trú</label><input type="text" class="tam_tru"/>';
    var x = document.createElement("div");
    x.innerHTML = str;
    document.querySelector("#thanh_vien").appendChild(x);
};


// Xóa thành viên
document.getElementById("remove").onclick = function () {
    var myDiv = document.getElementById("thanh_vien");
    myDiv.removeChild(myDiv.lastChild);
};


// Xử lý sự kiện khi ấn submit
document.getElementById("submit").onclick = function () {
    var accept = true;
    var str = "";

    document.getElementById("err").innerHTML = "";

    var elements = document.getElementsByClassName("name");


    var list_send = new Array(elements.length);
    for (var i = 0; i < list_send.length; i++) {
        list_send[i] = new Array(11);
    }
    var elements = document.getElementsByClassName("name");
    for (var i = 0; i < elements.length; i++) {
        if (elements[i].value == "") {
            str_name = " Chưa nhập họ tên";
            str = str + str_name + '<br>';
            document.getElementById("err").innerHTML = str;
            accept = false;
            break;
        }
    }
    elements_id_ho = document.getElementsByClassName("id_ho");
    for (var i = 0; i < elements.length; i++) {
        if (elements_id_ho[0].value == "") {
            str_name = " Chưa nhập Id Hộ";
            str = str + str_name + '<br>';
            document.getElementById("err").innerHTML = str;
            accept = false;
            break;
        }
        list_send[i][1] = (elements[i].value)
        list_send[i][0] = (elements_id_ho[0].value) // day auk

    }
    elements = document.getElementsByClassName("cmnd");
    for (var i = 0; i < elements.length; i++) {
        if (elements[i].value == "") {
            str_cmnd = " Chưa nhập CMND";
            str = str + str_cmnd + '<br>';
            document.getElementById("err").innerHTML = str;
            accept = false;
            break;
        }
        list_send[i][2] = (elements[i].value)
    }

    elements = document.getElementsByClassName("nghe_nghiep");
    for (var i = 0; i < elements.length; i++) {
        if (elements[i].value == "") {
            str_cmnd = " Chưa nhập Nghề Nghiệp";
            str = str + str_cmnd + '<br>';
            document.getElementById("err").innerHTML = str;
            accept = false;
            break;
        }
        list_send[i][3] = (elements[i].value)
    }

    elements = document.getElementsByClassName("gioi_tinh");
    for (var i = 0; i < elements.length; i++) {
        if (elements[i].value == "") {
            str_dt = " Chưa nhập giới tính";
            str = str + str_dt + '<br>';
            document.getElementById("err").innerHTML = str;
            accept = false;
            break;
        }
        list_send[i][4] = (elements[i].value)
    }

    elements = document.getElementsByClassName("ngay_sinh");
    for (var i = 0; i < elements.length; i++) {
        if (elements[i].value == "") {
            str_dob = " Chưa nhập ngày sinh";
            str = str + str_dob + '<br>';
            document.getElementById("err").innerHTML = str;
            accept = false;
            break;
        } else if (!isDate(elements[i].value)) {
            str_check_dob = " Ngày sinh không đúng định dạng";
            str = str + str_check_dob + '<br>';
            document.getElementById("err").innerHTML = str;
            accept = false;
            break;
        }
        list_send[i][5] = convertDOB(elements[i].value)
    }
   
    elements = document.getElementsByClassName("quoc_tich");
    for (var i = 0; i < elements.length; i++) {
        if (elements[i].value == "") {
            str_quoc_tich = " Chưa nhập quốc tịch";
            str = str + str_quoc_tich + '<br>';
            document.getElementById("err").innerHTML = str;
            accept = false;
            break;
        }
        list_send[i][6] = (elements[i].value)
    }

    
    

    elements = document.getElementsByClassName("ton_giao");
    for (var i = 0; i < elements.length; i++) {
        if (elements[i].value == "") {
            str_ton_giao = " Chưa nhập tôn giáo";
            str = str + str_ton_giao + '<br>';
            document.getElementById("err").innerHTML = str;
            accept = false;
            break;
        }
        list_send[i][7] = (elements[i].value)
    }
    elements = document.getElementsByClassName("hoc_van");
    for (var i = 0; i < elements.length; i++) {
        if (elements[i].value == "") {
            str_hoc_van = " Chưa nhập trình độ học vấn";
            str = str + str_hoc_van + '<br>';
            document.getElementById("err").innerHTML = str;
            accept = false;
            break;
        }
        list_send[i][8] = (elements[i].value)
    }

    elements = document.getElementsByClassName("thuong_tru");
    for (var i = 0; i < elements.length; i++) {
        if (elements[i].value == "") {
            str_cmnd = " Chưa nhập địa chỉ thường trú";
            str = str + str_cmnd + '<br>';
            document.getElementById("err").innerHTML = str;
            accept = false;
            break;
        }
        list_send[i][9] = (elements[i].value)
    }

    elements = document.getElementsByClassName("tam_tru");
    for (var i = 0; i < elements.length; i++) {
        if (elements[i].value == "") {
            str_cmnd = " Chưa nhập địa chỉ tạm trú";
            str = str + str_cmnd + '<br>';
            document.getElementById("err").innerHTML = str;
            accept = false;
            break;
        }
        list_send[i][10] = (elements[i].value)
    }
    console.log(list_send);
    fetch('/nhaplieu/themnhankhau/?list_send=' + list_send, {
        headers: {
            'Authorization': 'Basic ' + token
        }
    }).then((response) => console.log(response));
};

function isDate(d) {
    s = d.split("/");

    if (s.length != 3) return false;
    if (isNaN(s[0]) || isNaN(s[1]) || isNaN(s[2])) return false;

    day = parseInt(s[0]);
    month = parseInt(s[1]);
    year = parseInt(s[2]);

    if (month > 12 || month < 1) return false;
    if (
        month == 1 ||
        month == 3 ||
        month == 5 ||
        month == 7 ||
        month == 8 ||
        month == 10 ||
        month == 12
    ) {
        if (day > 31) return false;
    } else if (month == 2) {
        if (year % 4 == 0 && year % 100 != 0) {
            if (day > 29) return false;
        } else if (day > 28) return false;
    } else if (day > 30) return false;

    if (day < 1) return false;

    date = new Date();
    if (year > date.getFullYear() || year < 1950) return false;

    return true;
}

var elements = document.getElementsByClassName("name");
for (var i = 0; i < elements.length; i++) {
    elements[i].onblur = function () {
        this.value = reName(this.value);
    }
}

function reName(name) {
    normal_name = name;
    ss = normal_name.split(" ");
    normal_name = "";
    for (i = 0; i < ss.length; i++)
        if (ss[i].length > 0) {
            if (normal_name.length > 0) normal_name = normal_name + " ";
            normal_name = normal_name + ss[i].substring(0, 1).toUpperCase();
            normal_name = normal_name + ss[i].substring(1).toLowerCase();
        }
    return normal_name;
}

function convertDOB(dob) {
    var ingre = dob.split('/');
    var day = ingre[0];
    var month = ingre[1];
    var year = ingre[2];
    return year+month+day;
}
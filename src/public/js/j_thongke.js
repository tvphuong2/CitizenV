var token = localStorage.getItem("token");

var worker = new SharedWorker('/js/share.js');
worker.port.postMessage("getData");
worker.port.onmessage = function(e) {
    document.title = e.data.type;
    var danhsach = e.data.mes;
    var ten = e.data.ten;
    var type = e.data.type;
    if(type == "Tháp tuổi") {
        $("h1").eq(0).text("Tháp tuổi của");
        $("h5").eq(0).text(ten);
        thapTuoi(danhsach)
    } else if (type == "Mật độ dân số") {
        $("h1").eq(0).text("So sánh mật độ dân số của");
        $("h5").eq(0).text(ten);
        matDoDanSo(danhsach, ten)
    } else if (type == "Tỉ lệ nghề nghiệp") {
        $("h1").eq(0).text("Tỉ lệ nghề nghiệp của");
        $("h5").eq(0).text(ten);
        tiLeNghe(danhsach)
    } else if (type == "Tỉ lệ tôn giáo") {
        $("h1").eq(0).text("Tỉ lệ tôn giáo của");
        $("h5").eq(0).text(ten);
        tiLeTonGiao(danhsach)
    }
}

function thapTuoi(danhsach) {
    fetch('/thongke/thaptuoi',{
        method: 'POST',
        headers: {'Content-Type': 'application/json',
                  'Authorization': 'Basic '+ token},
        body: JSON.stringify({"danhsach": danhsach})
        }).then(response => response.json())
        .then((res) => {
            chuanHoaThapTuoi(res.map(x => x.soluong), res.map(x => x.nu),res.map(x => x.muc));
        })
}

function matDoDanSo(danhsach, ten) {
    fetch('/thongke/matdodanso',{
        method: 'POST',
        headers: {'Content-Type': 'application/json',
                  'Authorization': 'Basic '+ token},
        body: JSON.stringify({"danhsach": danhsach})
        }).then(response => response.json())
        .then((res) => {
            chuanHoaMatDoDanSo(res, ten);
        })
}

function tiLeNghe(danhsach) {
    fetch('/thongke/tilenghe',{
        method: 'POST',
        headers: {'Content-Type': 'application/json',
                  'Authorization': 'Basic '+ token},
        body: JSON.stringify({"danhsach": danhsach})
        }).then(response => response.json())
        .then((res) => {
            chuanHoaTiLeNghe(res.map(x => x.soluong), res.map(x => x.nghe));
        })
}

function tiLeTonGiao(danhsach) {
    fetch('/thongke/tiletongiao',{
        method: 'POST',
        headers: {'Content-Type': 'application/json',
                  'Authorization': 'Basic '+ token},
        body: JSON.stringify({"danhsach": danhsach})
        }).then(response => response.json())
        .then((res) => {
            chuanHoaTiLeTonGiao(res.map(x => x.soluong), res.map(x => x.tongiao));
        })
}

function chuanHoaThapTuoi(soluong, nu, muc) {
    console.log(soluong, nu, muc);
    var labels = ['0-4','5-9','10-14','15-19','20-24','25-29','30-34','35-39','40-44','45-49','50-54','55-59','60-64','65-69','70+'];
    var index = 0;
    var d_nam = []
    var d_nu = []
    for (var i = 0; i < 70; i +=5) {
        if (muc[index] == i) {
            d_nam.push(soluong[index] - nu[index]);
            d_nu.push(-nu[index]);
            index++;
        } else {
            d_nam.push(0);
            d_nu.push(0);
        }
    }
    var n = 0;
    var m = 0;
    for (i = index; i < muc.length; i++) {
        n += soluong[index] - nu[index];
        m -= nu[index];
    }
    d_nam.push(n);
    d_nu.push(m);
    
    for (var i = 0; i < labels.length; i++) {
        $("#danhsach").append($("<tr></tr>").append($("<td></th>").text(labels[i]),
                                                    $("<td></th>").text(-d_nu[i] + " Người"),
                                                    $("<td></th>").text(d_nam[i] + " Người")))                                  
    }
    $("#cacthuoctinh").html("<th>Độ tuổi</th><th>Nữ</th><th>Nam</th>")

    hienThiThapTuoi(d_nam, d_nu, labels);
}

function chuanHoaMatDoDanSo(matdo, ten) {
    var d_matdo = []
    for (var i = 0; i < matdo.length; i++) {
        d_matdo.push(matdo[i][0].matdo)
        $("#danhsach").append($("<tr></tr>").append($("<td></th>").text(ten[i]),
                                                    $("<td></th>").text(matdo[i][0].matdo + " Người/Km2")))                                  
    }
    $("#cacthuoctinh").html("<th>Tên địa phương</th><th>Mật độ dân số</th>")
    hienThiMatDoDanSo(d_matdo,ten);
}


function chuanHoaTiLeNghe(soluong, nghe) {
    for (var i = 0; i < nghe.length; i++) {
        $("#danhsach").append($("<tr></tr>").append($("<td></th>").text(nghe[i]),
                                                    $("<td></th>").text(soluong[i] + " Người")))                                  
    }
    $("#cacthuoctinh").html("<th>Nghề nghiệp</th><th>Số lượng</th>")
    hienThiBieuDoTron(soluong, nghe)
}

function chuanHoaTiLeTonGiao(soluong, tongiao) {
    for (var i = 0; i < tongiao.length; i++) {
        $("#danhsach").append($("<tr></tr>").append($("<td></th>").text(tongiao[i]),
                                                    $("<td></th>").text(soluong[i] + " Người")))                                  
    }
    $("#cacthuoctinh").html("<th>Tôn Giáo</th><th>Số lượng</th>")
    hienThiBieuDoTron(soluong, tongiao)
}

function hienThiThapTuoi(nam, nu, label) {
    console.log(nam,nu)
    var type = 'bar'
    var label = label;
    var dataset = [{
        label: 'Nữ',
        data: nu,
        backgroundColor: 'rgba(255, 102, 102, 0.5)'
    },{
        label: 'Nam',
        data: nam,
        backgroundColor: 'rgba(102, 163, 255, 0.5)'
    }];
    option = {
        interaction: {mode: 'index'},
        indexAxis: 'y',
        scales: {
            x: {
                stacked:true,
                ticks: {callback: (value, index, values) => Math.abs(value)}
            },
            y: {
                stacked: true,
                beginAtZero: true
            }
        },
        plugins: {
            tooltip: {
                yAlign: 'center',
                titleAlign: 'center',
                callbacks: {label: (context) => (' ' + context.dataset.label + ":  " + Math.abs(context.raw) + " Người")}
            }
        }
    }

    hienThiBieuDo(type, label, dataset);
}

function hienThiMatDoDanSo(matdo,ten) {
    console.log(matdo,ten)
    var color = ['#4dc9f6','#f67019','#f53794','#537bc4','#acc236','#166a8f','#00a950','#58595b','#8549ba'];
    var type = 'bar'
    var label = ten;
    var dataset = [{
        label: 'Mật độ dân số',
        data: matdo,
        backgroundColor: color,
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 1
    }];
    option = {
        interaction: {mode: 'index'},
        scales: {
            y: {beginAtZero: true}
        },
        plugins: {
            tooltip: {
                yAlign: 'center',
                titleAlign: 'center',
                callbacks: {label: (context) => (' ' + context.dataset.label + ":  " + context.raw + "Người/Km2")}
            }
        }
    }
    hienThiBieuDo(type, label, dataset);
}

function hienThiBieuDoTron(soluong,ten) {
    $("#bieudo").css("width", "50%");
    var color = ['#4dc9f6','#f67019','#f53794','#537bc4','#acc236','#166a8f','#00a950','#58595b','#8549ba'];
    var type = 'pie'
    var label = ten;
    var dataset = [{
        label: 'số lượng',
        data: soluong,
        backgroundColor: color
    }];
    option = {
        plugins: {
            responsive: true,
            legend: {
                position: 'top',
            }
        }
      }
    hienThiBieuDo(type, label, dataset);
}

function hienThiBieuDo(type, label, dataset) {
    var config = {
        type: type,
        data: {
            labels: label,
            datasets: dataset
        },
        options: option
    };
    
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, config);
}

var dynamicColors = function() {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return "rgb(" + r + "," + g + "," + b + ")";
 };

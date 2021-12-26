// nhận yêu cầu từ share worker để xử lý
var worker = new SharedWorker('/js/share.js');
worker.port.postMessage("getData");
worker.port.onmessage = function(e) {
    document.title = e.data.type;
    var danhsach = e.data.mes;
    var ten = e.data.ten;
    var type = e.data.type;
    if(type == "Tháp tuổi") {
        $("h1").eq(0).text("Tháp tuổi");
        $("h5").eq(0).text(ten);
        thapTuoi(danhsach)
    } else if (type == "Mật độ dân số") {
        $("h1").eq(0).text("So sánh mật độ dân số");
        $("h5").eq(0).text(ten);
        matDoDanSo(danhsach, ten)
    } else if (type == "Tỉ lệ nghề nghiệp") {
        $("h1").eq(0).text("Tỉ lệ nghề nghiệp");
        $("h5").eq(0).text(ten);
        tiLeNghe(danhsach)
    } else if (type == "Tỉ lệ tôn giáo") {
        $("h1").eq(0).text("Tỉ lệ tôn giáo");
        $("h5").eq(0).text(ten);
        tiLeTonGiao(danhsach)
    }
}

/**
 * Yêu cầu dữ liệu từ server và xử lý, hiển thị tháp tuổi lên canvas
 * @param {array} danhsach mảng id của các địa phương được chọn
 */
function thapTuoi(danhsach) {
    fetch('/thongke/thaptuoi',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({"danhsach": danhsach})
        }).then(response => response.json())
        .then((res) => {
            chuanHoaThapTuoi(res.map(x => x.soluong), res.map(x => x.nu),res.map(x => x.muc));
        })
}

/**
 * Yêu cầu dữ liệu từ server và xử lý, hiển thị biểu đồ mật độ dân số lên canvas
 * @param {array} danhsach mảng id các địa phương được chọn
 * @param {array} ten mảng tên các địa phương được chọn
 */
function matDoDanSo(danhsach, ten) {
    fetch('/thongke/matdodanso',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({"danhsach": danhsach})
        }).then(response => response.json())
        .then((res) => {
            chuanHoaMatDoDanSo(res, ten);
        })
}

/**
 * Yêu cầu dữ liệu từ server và xử lý, hiển thị biểu đồ tỉ lệ nghề nghiệp lên canvas
 * @param {array} danhsach mảng id của các địa phương được chọn
 */
function tiLeNghe(danhsach) {
    fetch('/thongke/tilenghe',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({"danhsach": danhsach})
        }).then(response => response.json())
        .then((res) => {
            chuanHoaTiLeNghe(res.map(x => x.soluong), res.map(x => x.nghe));
        })
}

/**
 * Yêu cầu dữ liệu từ server và xử lý, hiển thị biểu đồ tỉ lệ tôn giáo lên canvas
 * @param {array} danhsach mảng id của các địa phương được chọn
 */
function tiLeTonGiao(danhsach) {
    fetch('/thongke/tiletongiao',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({"danhsach": danhsach})
        }).then(response => response.json())
        .then((res) => {
            chuanHoaTiLeTonGiao(res.map(x => x.soluong), res.map(x => x.tongiao));
        })
}

/**
 * Chuẩn hóa dữ liệu đưa vào thành dữ liệu để tạo biểu đồ và hiển thị dữ liệu lên bảng
 * @param {array} soluong mảng số người theo độ tuổi
 * @param {array} nu mảng số nữ theo độ tuổi
 * @param {array} muc mảng độ tuổi
 */
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

/**
 * Chuẩn hóa dữ liệu để tạo biểu đồ mật độ dân số và hiện dữ liệu lên bảng
 * @param {array} matdo Mật độ dân số theo địa phương
 * @param {array} ten Tên địa phương
 */
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

/**
 * Chuẩn hóa dữ liệu để tạo biểu đồ tỉ lệ nghề và hiện dữ liệu lên bảng
 * @param {array} soluong số lượng người theo nghề
 * @param {array} nghe nghề
 */
function chuanHoaTiLeNghe(soluong, nghe) {
    for (var i = 0; i < nghe.length; i++) {
        $("#danhsach").append($("<tr></tr>").append($("<td></th>").text(nghe[i]),
                                                    $("<td></th>").text(soluong[i] + " Người")))                                  
    }
    $("#cacthuoctinh").html("<th>Nghề nghiệp</th><th>Số lượng</th>")
    hienThiBieuDoTron(soluong, nghe)
}

/**
 * Chuẩn hóa duex liệu để tạo biểu đồ tỉ lệ tôn giáo và hiện dữ liệu lên bảng
 * @param {array} soluong số lượng người theo tôn giáo
 * @param {array} tongiao tôn giáo
 */
function chuanHoaTiLeTonGiao(soluong, tongiao) {
    for (var i = 0; i < tongiao.length; i++) {
        $("#danhsach").append($("<tr></tr>").append($("<td></th>").text(tongiao[i]),
                                                    $("<td></th>").text(soluong[i] + " Người")))                                  
    }
    $("#cacthuoctinh").html("<th>Tôn Giáo</th><th>Số lượng</th>")
    hienThiBieuDoTron(soluong, tongiao)
}

/**
 * Hiển thị tháp tuổi
 * @param {array} nam Số lượng nam giới theo tuổi
 * @param {array} nu Số lượng nữ giới theo tuổi
 * @param {array} label Nhãn của từng mức tuổi
 */
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

/**
 * Hiển thị biểu đồ mật độ đân số
 * @param {array} matdo mật độ dân số theo tên
 * @param {array} ten tên
 */
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

/**
 * Hiển thị biểu đồ tròn
 * @param {array} soluong số lượng người theo tên
 * @param {array} ten tên
 */
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

/**
 * hiển thị biểu đồ lên canvas
 * @param {string} type Kiểu biểu đồ
 * @param {array} label Nhãn
 * @param {object} dataset Dữ liệu
 */
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

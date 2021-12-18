const Chung = require('./m_chung');

class TraCuu extends Chung {
    timCapDuoi(id) {
        var tuyen = this.timTuyenDuoi(id);
        var que = "select id,ten from "+tuyen+" where tuyentren =" + id;
        if (tuyen == "ho_khau") que = "select id from "+tuyen+" where tuyentren =" + id;
        return new Promise((resolve, reject) => { //trả về promise 
            if (tuyen == "") reject('ID sai tracuu')
            this.connection.query(que, (err, rows) => { //truyền truy vấn dữ liệu vào
                if (err) //bắt lỗi
                    return reject(err);
                resolve(JSON.stringify(rows)); // trả về các hàng kết quả và chuyển dữ liệu đó về json
            });
        });
    }

    nhapLieu(list_send) {
        var last_que = "";
        var words = list_send.split(',');
        for (var i = 0; i < words.length; i += 11) {
            var name = words[i + 1];
            var id_ho = words[i];
            var cmnd = words[i + 2];
            var ngay_sinh = words[i + 5];
            var quoc_tich = words[i + 6];
            var ton_giao = words[i + 7];
            var hoc_van = words[i + 8];
            var thuong_tru = words[i + 9];
            var tam_tru = words[i + 10];
            var nghe_nghiep = words[i + 3];
            var gioi_tinh = words[i + 4]
            last_que += ('insert into nhan_khau SELECT LPAD(max(Manguoi) + 1,12,"0"),"' + id_ho + '","' + name + '","' + ngay_sinh + '","' + gioi_tinh + '","' + ton_giao + '","'
                + quoc_tich + '","' + nghe_nghiep + '",' + cmnd + ',"' + thuong_tru + '","' + tam_tru + '","' + hoc_van + '" from nhan_khau where Maho = "' + id_ho + '";');
        }
        console.log(last_que);
       
        return new Promise((resolve, reject) => {

            this.connection.query(last_que, (err, rows) => {
                if (err)
                    return reject(err);
                resolve(JSON.stringify(rows));
            });
        });

    }
}

module.exports = new TraCuu();
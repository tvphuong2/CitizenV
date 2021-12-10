const Chung = require('./chung');

class TraCuu extends Chung {
    timCapDuoi(id) {
        var tuyen = this.timTuyenDuoi(id);
        var que = "select id,ten from "+tuyen+" where tuyentren =" + id;
        if (tuyen == "ho_khau") que = "select id from "+tuyen+" where tuyentren =" + id;
        return new Promise((resolve, reject) => { //trả về promise 
            if (tuyen == "") reject('ID sai')
            this.connection.query(que, (err, rows) => { //truyền truy vấn dữ liệu vào
                if (err) //bắt lỗi
                    return reject(err);
                resolve(JSON.stringify(rows)); // trả về các hàng kết quả và chuyển dữ liệu đó về json
            });
        });
    }
}

module.exports = new TraCuu();
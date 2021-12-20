const Chung = require('./m_chung');

class DangNhap extends Chung {
    timMatKhau(id) {
        var tuyen = this.timTuyen(id);

        return new Promise((resolve, reject) => {
            this.connection.query("select matkhau from " + tuyen + " where id = '" +id+"'", (err, rows) => { //truyền truy vấn dữ liệu vào
                if (err) return reject(err);
                if (!rows.length) return reject('Tài khoản chưa được cấp');
                if (rows[0].matkhau[0] != '$') return reject('Tài khoản chưa được cấp');
                else return resolve(rows); // trả về các hàng kết quả và chuyển dữ liệu đó về json
            });
        });
    }

    taoMatKhau(id, pass) {
        var tuyen = this.timTuyen(id);

        return new Promise((resolve, reject) => { //trả về promise 
            if (tuyen == "") return reject('ID sai tmk')
            this.connection.query("UPDATE "+tuyen+" set `Matkhau` = '"+pass+"' WHERE id = '" +id+"'", (err, rows) => {
                if (err) //bắt lỗi
                    return reject(err);
                resolve("thành công");
            });
        });
    }

    xoaMatKhau(id) {
        var tuyen = this.timTuyenChinh(id);

        return new Promise((resolve, reject) => { //trả về promise 
            if (tuyen == "") return reject('ID sai xoamk')
            this.connection.query("UPDATE "+tuyen+" set `Matkhau` = 'Không' WHERE id = '" +id+"'", (err, rows) => {
                if (err) //bắt lỗi
                    return reject(err);
                resolve("thành công");
            });
        });
    }
}

module.exports = new DangNhap();
const Chung = require('./m_chung');

class DangNhap extends Chung {

    /**
     * kiểm tra một id có mật khẩu hay không
     * @param {string} id 
     * @returns thông tin mật khẩu
     */
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

    /**
     * Tạo mật khẩu cho một địa phương
     * @param {string} id 
     * @param {string} pass 
     * @returns trạng thái
     */
    taoMatKhau(id, pass) {
        var tuyen = this.timTuyen(id);

        return new Promise((resolve, reject) => { //trả về promise 
            if (tuyen == "") return reject('ID sai tmk')
            this.connection.query("UPDATE "+tuyen+" set `Matkhau` = '"+pass+"' WHERE id = '" +id+"'", (err, rows) => {
                if (err) return reject(err);
                resolve("thành công");
            });
        });
    }

    /**
     * xóa mật khẩu của một địa phương
     * @param {string} id 
     * @returns trạng thái
     */
    xoaMatKhau(id) {
        var tuyen = this.timTuyenChinh(id);

        return new Promise((resolve, reject) => { //trả về promise 
            if (tuyen == "") return reject('ID sai xoamk')
            this.connection.query("UPDATE "+tuyen+" set `Matkhau` = 'Không' WHERE id = '" +id+"'", (err, rows) => {
                if (err) return reject(err);
                resolve("thành công");
            });
        });
    }
}

module.exports = new DangNhap();
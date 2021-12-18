const Chung = require('./m_chung');

class TraCuu extends Chung {
    timKiem(cmnd, hoten, diaphuong) {
        var que = 'select cmnd, hoten, DATE_FORMAT(ngaysinh, "%d/%m/%Y"), gioitinh, quoctich, thuongtru, tamtru, tongiao, trinhdo, nghenghiep from nhan_khau where ';
        if (cmnd != "") que += "cmnd = " + cmnd
        else {
            if (diaphuong != "") {
                que += "manguoi like '" + diaphuong + "%'"
                if (hoten != "") que += "and hoten like '%" + hoten + "%'"
            }
            else if (hoten != "") que += "hoten like '%" + hoten + "%'"
            else return "";
        }
        console.log(que);
        return new Promise((resolve, reject) => { //trả về promise 
            this.connection.query(que, (err, rows) => { //truyền truy vấn dữ liệu vào
                if (err) //bắt lỗi
                    return reject(err);
                resolve(JSON.stringify(rows)); // trả về các hàng kết quả và chuyển dữ liệu đó về json
            });
        });
    }
}

module.exports = new TraCuu();
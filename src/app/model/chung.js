const mysql = require('mysql');

class chung {
    //hàm khởi tạo kết nối
    constructor() {
		this.connection = mysql.createPool({
			connectionLimit: 100,
			host: '127.0.0.1',
			user: 'root',
			password: '',
			database: 'citizenv', //tên csdl
			debug: false
		});
	}

    timCapDuoi(id) {
        if (id == '-1') { //nếu như id là -1 thì lấy tất cả các tỉnh
            return new Promise((resolve, reject) => { //trả về promise 
                this.connection.query("select matinh,ten from tinh_thanh where 1", (err, rows) => { //truyền truy vấn dữ liệu vào
                    if (err) //bắt lỗi
                        return reject(err);
                    resolve(JSON.stringify(rows)); // trả về các hàng kết quả và chuyển dữ liệu đó về json
                });
            });
        } else if (id.length <= 2) { //nếu như id có độ dài 1-2 thì sẽ lấy tất cả các huyện thuộc id đó
            return new Promise((resolve, reject) => {
                let que = "select mahuyen,ten from huyen_quan where matinh = " + id;
                this.connection.query(que, (err, rows) => {
                    if (err)
                        return reject(err);
                    resolve(JSON.stringify(rows));
                });
            });
        } else if (id.length <= 4) { //tương tự
            return new Promise((resolve, reject) => {
                let que = "select maxa,ten from xa_phuong where mahuyen = " + id;
                this.connection.query(que, (err, rows) => {
                    if (err)
                        return reject(err);
                    resolve(JSON.stringify(rows));
                });
            });
        } else if (id.length <= 6) {
            return new Promise((resolve, reject) => {
                let que = "select mathon,ten from thon_to where maxap = " + id;
                this.connection.query(que, (err, rows) => {
                    if (err)
                        return reject(err);
                    resolve(JSON.stringify(rows));
                });
            });
        }
    }
}

module.exports = new chung();
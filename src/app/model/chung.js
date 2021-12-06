const mysql = require('mysql');

class Chung {
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

    timTuyen(id) {
        var tuyen = "ho_khau";
        if (id.length ==2) {tuyen = "tinh_thanh";}
        else if (id.length ==3) {tuyen = "cuc_dan_so";}
        else if (id.length ==4) {tuyen = "huyen_quan";}
        else if (id.length ==6) {tuyen = "xa_phuong";}
        else if (id.length ==8) {tuyen = "thon_to";}
        return tuyen;
    }

    timTuyenDuoi(id) {
        var tuyen = "ho_khau";
        if (id.length ==2) {tuyen = "huyen_quan";}
        else if (id.length ==3) {tuyen = "tinh_thanh";}
        else if (id.length ==4) {tuyen = "xa_phuong";}
        else if (id.length ==6) {tuyen = "thon_to";}
        return tuyen;
    }
}

module.exports = Chung;
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
            multipleStatements: true,
			debug: false
		});
	}

    /**
     * tìm và trả về bảng cơ sở dữ liệu của id đó
     * @param {string} id 
     * @returns tuyến
     */
    timTuyen(id) {
        var tuyen = "";
        if (id.length ==2) {tuyen = "tinh_thanh";}
        else if (id.length ==3) {tuyen = "cuc_dan_so";}
        else if (id.length ==4) {tuyen = "huyen_quan";}
        else if (id.length ==6) {tuyen = "xa_phuong";}
        else if (id.length ==8) {tuyen = "thon_to";}
        else if (id.length ==10) {tuyen = "ho_khau";}
        else if (id.length ==12) {tuyen = "nhan_khau";}
        return tuyen;
    }

    /**
     * tìm và trả về bảng cơ sở dữ liệu của địa phương trực thuộc id đó
     * @param {string} id 
     * @returns tuyến
     */
    timTuyenDuoi(id) {
        var tuyen = "";
        if (id.length ==2) {tuyen = "huyen_quan";}
        else if (id.length ==3) {tuyen = "tinh_thanh";}
        else if (id.length ==4) {tuyen = "xa_phuong";}
        else if (id.length ==6) {tuyen = "thon_to";}
        else if (id.length ==8) {tuyen = "ho_khau"}
        return tuyen;
    }
}

module.exports = Chung;
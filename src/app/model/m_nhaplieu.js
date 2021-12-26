const Chung = require('./m_chung');

class TraCuu extends Chung {
    /**
     * trả về tên, id tuyến dưới
     * @param {string} id 
     * @returns thông tin
     */
    timCapDuoi(id) {
        var tuyen = this.timTuyenDuoi(id);
        var que = "select id,ten from "+tuyen+" where tuyentren =" + id;
        if (tuyen == "ho_khau") que = "select id from "+tuyen+" where tuyentren =" + id;
        return new Promise((resolve, reject) => {  
            if (tuyen == "") reject('ID sai tracuu')
            this.connection.query(que, (err, rows) => { 
                if (err) return reject(err);
                resolve(JSON.stringify(rows)); 
            });
        });
    }

    /**
     * thêm một hộ và trả về id hộ vừa thêm
     * @param {string} tenho 
     * @param {string} idthon 
     * @param {int} sothanhvien 
     * @returns id của hộ khẩu mới được thêm
     */
    themHo(tenho, idthon, sothanhvien) {
        var que = "insert into ho_khau SELECT LPAD(max(id) + 1,10,'0'), tuyentren, '"+
            sothanhvien+"', '"+tenho+"' from ho_khau where tuyentren = '" + idthon + 
            "'; select max(id) id from ho_khau where tuyentren = '" + idthon + "';";
        console.log(que);
        
        return new Promise((resolve, reject) => {
            this.connection.query(que, (err, rows) => { 
                if (err) return reject(err);
                resolve(rows[1][0].id); 
            });
        });
    }

    /**
     * sửa thông tin một hộ
     * @param {string} tenho 
     * @param {string} idho 
     * @param {int} sothanhvien 
     * @returns trạng thái
     */
    suaHo(tenho, idho, sothanhvien) {
        var que = "update ho_khau set sothanhvien = '"+
            sothanhvien+"', ten ='"+tenho+"' where id = '" + idho + "'";
        console.log(que);
        
        return new Promise((resolve, reject) => {
            this.connection.query(que, (err, rows) => { //truyền truy vấn dữ liệu vào
                if (err) return reject(err);
                resolve(JSON.stringify(rows[0])); // trả về các hàng kết quả và chuyển dữ liệu đó về json
            });
        });
    }

    /**
     * xóa một hộ
     * @param {string} id 
     * @returns trạng thái
     */
    xoaHo(id) {
        return new Promise((resolve, reject) => {
            var que = "delete from ho_khau where id = '" +id+ "'"
            this.connection.query(que, (err, rows) => { //truyền truy vấn dữ liệu vào
                if (err) return reject(err);
                resolve(JSON.stringify(rows[0])); // trả về các hàng kết quả và chuyển dữ liệu đó về json
            });
        });
    }

    /**
     * xóa nhân khẩu thuộc id hộ
     * @param {string} idho 
     * @returns trạng thái
     */
    xoaNhanKhau(idho) {
        var que = "DELETE FROM nhan_khau WHERE tuyentren = '" + idho + "'";
        return new Promise((resolve, reject) => {
            this.connection.query(que, (err, rows) => {
                if (err) return reject(err);
                resolve(JSON.stringify(rows));
            });
        });
    }

    /**
     * thêm mới nhân khẩu của một hộ
     * @param {string} idho 
     * @param {array} cacthanhvien 
     * @returns tạng thái
     */
    thayDoiNhanKhau(idho, cacthanhvien) {
        var que = "";
        for (var i = 0; i < cacthanhvien.length; i++) {
            var tv = cacthanhvien[i];
            que += ('insert into nhan_khau SELECT if(max(id),LPAD(max(id) + 1,12,"0"), "'+idho+'01"),"' + idho 
            + '","' + tv.ten 
            + '","' + tv.ngaysinh 
            + '","' + tv.gioi 
            + '","' + tv.tongiao 
            + '","' + tv.quoctich 
            + '","' + tv.nghe 
            + '","' + tv.cmnd 
            + '","' + tv.thuongtru 
            + '","' + tv.tamtru 
            + '","' + tv.trinhdo 
            + '" from nhan_khau where tuyentren = "' + idho + '";');
        }
        console.log(que);
        return new Promise((resolve, reject) => {
            this.connection.query(que, (err, rows) => {
                if (err) return reject(err);
                resolve(JSON.stringify(rows));
            });
        });
    }
}

module.exports = new TraCuu();
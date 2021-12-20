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

    themHo(tenho, idthon, sothanhvien) {
        var que = "insert into ho_khau SELECT LPAD(max(id) + 1,10,'0'), tuyentren, '"+
            sothanhvien+"', '"+tenho+"' from ho_khau where tuyentren = '" + idthon + 
            "'; select max(id) id from ho_khau where tuyentren = '" + idthon + "';";
        console.log(que);
        
        return new Promise((resolve, reject) => {
            this.connection.query(que, (err, rows) => { //truyền truy vấn dữ liệu vào
                if (err) return reject(err);
                resolve(rows[1][0].id); // trả về các hàng kết quả và chuyển dữ liệu đó về json
            });
        });
    }

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

    xoaHo(id) {
        return new Promise((resolve, reject) => {
            this.connection.query("delete from ho_khau where id = '" +id+ "'", (err, rows) => { //truyền truy vấn dữ liệu vào
                if (err) return reject(err);
                resolve(JSON.stringify(rows[0])); // trả về các hàng kết quả và chuyển dữ liệu đó về json
            });
        });
    }

    xoaNhanKhau(idho) {
        var que = "DELETE FROM nhan_khau WHERE tuyentren = '" + idho + "'";
        return new Promise((resolve, reject) => {
            this.connection.query(que, (err, rows) => {
                if (err) return reject(err);
                resolve(JSON.stringify(rows));
            });
        });
    }

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
            + '",' + tv.cmnd 
            + ',"' + tv.thuongtru 
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
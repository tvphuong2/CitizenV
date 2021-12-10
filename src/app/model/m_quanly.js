const Chung = require('./chung');

class QuanLy extends Chung {
    quanly(id) {
        var tuyen = this.timTuyenDuoi(id);
        var que = ""
        if (tuyen == "tinh_thanh") que = "select id,ten,matkhau,quyen,tiendo from "+tuyen+" where 1";
        else que = "select id,ten,matkhau,quyen,tiendo from "+tuyen+" where tuyentren =" + id;

        return new Promise((resolve, reject) => { //trả về promise 
            if (tuyen == "") reject('ID sai')
            this.connection.query(que, (err, rows) => { //truyền truy vấn dữ liệu vào
                if (err) return reject(err);

                for (var i = 0; i < rows.length; i++) {
                    if (rows[i].matkhau[0] == "$") rows[i].matkhau = "Yes";
                    else rows[i].matkhau = "No";
                    if (rows[i].quyen == "Có") rows[i].quyen = "Yes";
                    else rows[i].quyen = "No";
                    if (rows[i].tiendo == "Da xong") rows[i].tiendo = "Yes";
                    else rows[i].tiendo = "No";
                }
                resolve(JSON.stringify(rows));
            });
        }); 
    }

    doiQuyen(id, start, end) {
        var tuyen = this.timTuyenChinh(id);
        var que = "";
        var time_start = "timestart = now()";
        var time_end = "timeend = now() + INTERVAL 1 DAY";
        if (start != "") time_start = "timestart = '" + start + "'";
        if (end != "") time_end = "timeend = '" + end + "'";

        que = "UPDATE "+tuyen+" SET "+time_start+","+time_end+" WHERE id = '" +id+"'";
        return new Promise((resolve, reject) => { //trả về promise 
            if (tuyen == "") return reject('ID sai')
            this.connection.query(que, (err, rows) => { //truyền truy vấn dữ liệu vào
                if (err) return reject(err);
                resolve('Đổi quyền thành công');
            });
        });
    }

    xoaQuyen(id) {
        var tuyen = this.timTuyenChinh(id);
        return new Promise((resolve, reject) => { //trả về promise 
            if (tuyen == "") return reject('ID sai')
            this.connection.query("update "+tuyen+" SET timeend = now() - interval 1 day where id = '" +id+"'", (err, rows) => { //truyền truy vấn dữ liệu vào
                if (err) return reject(err);
                resolve('Xóa quyền thành công');
            });
        });
    }

    capNhatTienDo(id, tiendo) {
        var tuyen = this.timTuyen(id);
        var que = "";
        return new Promise((resolve, reject) => { //trả về promise 
            if (id.length == 3) reject('A1 không có tiến độ');
            if (tiendo == '0') que = "UPDATE "+tuyen+" SET `Tiendo` = 'Chưa xong' WHERE `Id` = '"+id+"'";
            else if (tiendo == '1') que = "UPDATE "+tuyen+" SET `Tiendo` = 'Đã xong' WHERE `Id` = '"+id+"'";
            else reject('Tiến độ không hợp lệ');
            this.connection.query(que, (err, rows) => { //truyền truy vấn dữ liệu vào
                if (err) return reject(err);
                resolve('Đổi tiến độ thành công');
            });
        });
    }
      
    timTenQuyenTiendo(id) {
        var tuyen = this.timTuyenChinh(id);
        var que = "";
        return new Promise((resolve, reject) => { //trả về promise 
            if (tuyen == "") return reject('ID sai');
            if (id.length == 3) que = "select ten,quyen from "+tuyen+" where id= '" + id + "'";
            else que = "select ten,quyen,tiendo from "+tuyen+" where id= '" + id + "'";
            this.connection.query(que, (err, rows) => { //truyền truy vấn dữ liệu vào
                if (err) //bắt lỗi
                    return reject(err);
                resolve(JSON.stringify(rows[0])); // trả về các hàng kết quả và chuyển dữ liệu đó về json
            });
        });
    }
}

module.exports = new QuanLy();
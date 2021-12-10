const Chung = require('./chung');

class DanhSach extends Chung {
    timCapDuoi(id) {
        var tuyen = this.timTuyenDuoi(id);
        var que = ""
        if (tuyen == "tinh_thanh") que = "select id,ten from "+tuyen+" where 1";
        else que = "select id,ten from "+tuyen+" where tuyentren =" + id;

        return new Promise((resolve, reject) => { //trả về promise 
            if (tuyen == "") reject('ID sai')
            this.connection.query(que, (err, rows) => { //truyền truy vấn dữ liệu vào
                if (err) //bắt lỗi
                    return reject(err);
                resolve(JSON.stringify(rows)); // trả về các hàng kết quả và chuyển dữ liệu đó về json
            });
        });
    }

    timTen(id) {
        var tuyen = this.timTuyen(id);
        return new Promise((resolve, reject) => { //trả về promise 
            if (tuyen == "") reject('ID sai')
            this.connection.query("select ten from "+tuyen+" where id= '" + id + "'", (err, rows) => { //truyền truy vấn dữ liệu vào
                if (err)  return reject(err);
                if (!rows.length) resolve('');
                resolve(JSON.stringify(rows[0])); // trả về các hàng kết quả và chuyển dữ liệu đó về json
            });
        });
    }

    taoMoi(userid,ten,dientich) {
        var tuyen = this.timTuyenDuoi(userid);
        if (dientich == "") dientich = 0;

        return new Promise((resolve, reject) => {   
            let que = "insert into "+ tuyen +
                    " SELECT MAX(id) + 1,'"+userid+"','" +ten+"','Không','Không',now(),now(),'Chua xong',"+dientich+
                    " FROM " +tuyen+" WHERE tuyentren = '" +userid+"'";
            this.connection.query(que, (err, rows) => {
                if (tuyen == "") return reject('ID sai')
                if (err) return reject(err);
                resolve("thêm địa phương thành công");
            })
        })
    }

    xoa(id) {
        var tuyen = this.timTuyen(id);

        return new Promise((resolve, reject) => {   
            let que = "DELETE FROM "+tuyen+" WHERE id = '"+id+"'";
            this.connection.query(que, (err, rows) => {
                if (tuyen == "") return reject('ID sai')
                if (err) return reject(err);
                resolve("xóa địa phương thành công");
            })

        })
    }

    chinhSua(id, ten, dientich) {
        var tuyen = this.timTuyen(id);
        let que = "";
        if (ten =="" && dientich == "") return "Yêu cầu trống"
        else if (ten !="" && dientich != "") que = "UPDATE "+tuyen+" SET Ten = '"+ten+"', dientich = '"+dientich+"' WHERE id = '"+id+"'";
        else if (ten != "") que = "UPDATE "+tuyen+" SET Ten = '"+ten+"' WHERE id = '"+id+"'";
        else que = "UPDATE "+tuyen+" SET dientich = '"+dientich+"' WHERE id = '"+id+"'";
        return new Promise((resolve, reject) => {
            if (tuyen == "") return reject('ID sai')
            this.connection.query(que, (err, rows) => {
                if (err) return reject(err);
                resolve("Chỉnh sửa thành công");
            })

        })
    }
}

module.exports = new DanhSach();
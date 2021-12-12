const Chung = require('./chung');

class DanhSach extends Chung {
    timCapDuoi(id) {
        var tuyen = this.timTuyenDuoi(id);
        var que = ""
        if (tuyen == "tinh_thanh") que = "select id,ten from "+tuyen+" where 1";
        else que = "select id,ten from "+tuyen+" where tuyentren =" + id;

        return new Promise((resolve, reject) => { //trả về promise 
            if (tuyen == "") return resolve('ID sai timcapduoi')
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
            if (tuyen == "") {return resolve('ID sai timten')}
            this.connection.query("select ten from "+tuyen+" where id= '" + id + "'", (err, rows) => { //truyền truy vấn dữ liệu vào
                if (err)  return reject(err);
                if (!rows.length) resolve('');
                resolve(JSON.stringify(rows[0])); // trả về các hàng kết quả và chuyển dữ liệu đó về json
            });
        });
    }

    taoMoi(userid, ten, dientich) {

        var do_dai_id = 0;
        var tuyen = this.timTuyenDuoi(userid);
        if (tuyen == "tinh_thanh") {
            do_dai_id = 2;
        } else if (tuyen == "huyen_quan") {
            do_dai_id = 4;
        } else if (tuyen == "xa_phuong") {
            do_dai_id = 6;
        } else if (tuyen == "thon_to") {
            do_dai_id = 8;
        } else if (tuyen == "ho_khau") {
            do_dai_id = 10;
        }
        if (dientich == "") dientich = 0;

        return new Promise((resolve, reject) => {
            let que = "insert into " + tuyen +
                " SELECT LPAD(max(id) + 1," + do_dai_id + ",'0'),'" + userid + "','" + ten + "','Không','Không',now(),now(),'Chua xong'," + dientich +
                " FROM " + tuyen + " WHERE tuyentren = '" + userid + "'";
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
                if (tuyen == "") return reject('ID sai xoa')
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
            if (tuyen == "") return reject('ID sai chinhsua')
            this.connection.query(que, (err, rows) => {
                if (err) return reject(err);
                resolve("Chỉnh sửa thành công");
            })

        })
    }

    thongKe(arr_id, type) {

        var cac_dia_phuong_id = arr_id.split(',');

        var tuyen = this.timTuyen(cac_dia_phuong_id[0]);
        console.log(tuyen);
        var join_huyen = " LEFT JOIN huyen_quan on huyen_quan.Tuyentren = tinh_thanh.Id ";
        var join_phuong = " LEFT JOIN xa_phuong on xa_phuong.Tuyentren = huyen_quan.Id ";
        var join_thon = " LEFT JOIN thon_to ON thon_to.Tuyentren = xa_phuong.Id ";
        var join_ho = " LEFT JOIN ho_khau ON ho_khau.Tuyentren = thon_to.Id ";
        var where = "";
        for (var i = 0; i < cac_dia_phuong_id.length; i++) {
            if (i > 0) {
                where += " OR ";
            }
            where += (" " + tuyen + ".Id = '" + cac_dia_phuong_id[i] + "'");
        }
        if (type == "nam/nu") {
            var que = "SELECT nhan_khau.Gioitinh FROM " + tuyen
                + (tuyen == "tinh_thanh" ? join_huyen : "")
                + (tuyen == "huyen_quan" || tuyen == "tinh_thanh" ? join_phuong : "")
                + (tuyen == "xa_phuong" || tuyen == "huyen_quan" || tuyen == "tinh_thanh" ? join_thon : "")
                + (tuyen == "ho_khau" || tuyen == "xa_phuong" || tuyen == "huyen_quan" || tuyen == "tinh_thanh" ? join_ho : "")
                + " LEFT JOIN nhan_khau ON nhan_khau.Maho = ho_khau.Id "
                + "WHERE " + where + " AND nhan_khau.Gioitinh is not null ORDER BY nhan_khau.Gioitinh;";
            console.log('Cau truy van:')
            console.log(que);
            return new Promise((resolve, reject) => {
                this.connection.query(que, (err, rows) => {
                    if (err)
                        return reject(err);
                    resolve(JSON.stringify(rows));
                })
            })
        }
        if (type == 'thap_tuoi') {
            var que = "SELECT  DATEDIFF(now() , (nhan_khau.Ngaysinh))/365 as Tuoi, nhan_khau.Gioitinh FROM " + tuyen
                + (tuyen == "tinh_thanh" ? join_huyen : "")
                + (tuyen == "huyen_quan" || tuyen == "tinh_thanh" ? join_phuong : "")
                + (tuyen == "xa_phuong" || tuyen == "huyen_quan" || tuyen == "tinh_thanh" ? join_thon : "")
                + (tuyen == "ho_khau" || tuyen == "xa_phuong" || tuyen == "huyen_quan" || tuyen == "tinh_thanh" ? join_ho : "")
                + " LEFT JOIN nhan_khau ON nhan_khau.Maho = ho_khau.Id "
                + "WHERE " + where + " AND nhan_khau.Gioitinh is not null  ORDER BY nhan_khau.Gioitinh, Tuoi";
            console.log('Cau truy van:')
            console.log(que);
            return new Promise((resolve, reject) => {
                this.connection.query(que, (err, rows) => {
                    if (err)
                        return reject(err);
                    resolve(JSON.stringify(rows));
                })
            })
        }
        if (type == 'mat_do') {
            var que = "SELECT " + tuyen + ".Ten, COUNT(nhan_khau.Manguoi) / "+tuyen+".Dientich   as Matdo FROM " + tuyen
                + (tuyen == "tinh_thanh" ? join_huyen : "")
                + (tuyen == "huyen_quan" || tuyen == "tinh_thanh" ? join_phuong : "")
                + (tuyen == "xa_phuong" || tuyen == "huyen_quan" || tuyen == "tinh_thanh" ? join_thon : "")
                + (tuyen == "thon_to" || tuyen == "xa_phuong" || tuyen == "huyen_quan" || tuyen == "tinh_thanh" ? join_ho : "")
                + " LEFT JOIN nhan_khau ON nhan_khau.Maho = ho_khau.Id "
                + "WHERE " + where + " AND nhan_khau.Gioitinh is not null GROUP BY " + tuyen + ".Id; ";
            console.log(que);
            return new Promise((resolve, reject) => {
                this.connection.query(que, (err, rows) => {
                    if (err)
                        return reject(err);
                    resolve(JSON.stringify(rows));
                })
            })
        }
    }
}

module.exports = new DanhSach();
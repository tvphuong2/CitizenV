const Chung = require('./m_chung');

class DanhSach extends Chung {
    tenQuyen(id) {
        var tuyen = this.timTuyen(id);
        return new Promise((resolve, reject) => {
            this.connection.query("select ten, quyen from "+tuyen+" where id= '" + id + "'", (err, rows) => { //truyền truy vấn dữ liệu vào
                if (err)  return reject(err);
                if (!rows.length) resolve('');
                resolve(rows[0]); // trả về các hàng kết quả và chuyển dữ liệu đó về json
            });
        });
    }

    thongTin(id, ten, quyen) {
        var tuyen = this.timTuyenDuoi(id);
        var que = "SELECT  DATE_FORMAT(max(Timeend), '%d/%m/%Y') han, count(id) dangkhaibao, sum(Tiendo) tiendo FROM "+tuyen+" WHERE quyen = '1' and Tuyentren = '" + id + "'";

        return new Promise((resolve, reject) => {
            this.connection.query(que, (err, rows) => { //truyền truy vấn dữ liệu vào
                if (err)  return reject(err);
                if (!rows.length) resolve('');
                else {
                    var j = {
                        han: rows[0].han, 
                        dangkhaibao: rows[0].dangkhaibao, 
                        tiendo: rows[0].tiendo,
                        ten: ten,
                        quyen: quyen
                    }
                    resolve(JSON.stringify(j)); // trả về các hàng kết quả và chuyển dữ liệu đó về json
                }

            });
        });
    }

    timCapDuoi(id) {
        var tuyen = this.timTuyenDuoi(id);
        var que = ""
        if (tuyen == "tinh_thanh") que = "select id, ten, quyen, dientich from "+tuyen+" where 1";
        else que = "select id,ten, quyen, dientich from "+tuyen+" where tuyentren =" + id;

        return new Promise((resolve, reject) => {
            this.connection.query(que, (err, rows) => { //truyền truy vấn dữ liệu vào
                if (err) //bắt lỗi
                    return reject(err);
                resolve(JSON.stringify(rows)); // trả về các hàng kết quả và chuyển dữ liệu đó về json
            });
        });
    }

    timHoKhau(id) {
        var tuyen = this.timTuyenDuoi(id);

        return new Promise((resolve, reject) => {
            this.connection.query("select id,ten,sothanhvien from "+tuyen+" where tuyentren =" + id, (err, rows) => { //truyền truy vấn dữ liệu vào
                if (err) //bắt lỗi
                    return reject(err);
                resolve(JSON.stringify(rows)); // trả về các hàng kết quả và chuyển dữ liệu đó về json
            });
        });
    }

    thongTinNhanKhau(id) {
        return new Promise((resolve, reject) => {
            this.connection.query(
                "select hoten, DATE_FORMAT(ngaysinh, '%Y-%m-%d') ngaysinh, gioitinh, tongiao, quoctich, nghenghiep, cmnd, thuongtru, tamtru, trinhdo from nhan_khau where tuyentren= '" +
                id + "'", (err, rows) => {
                if (err) return reject(err);
                resolve(JSON.stringify(rows));
                }
            );
        });
    }

    taoMoi(id, ten, dientich) {
        var tuyen = this.timTuyenDuoi(id);
        var do_dai_id = 2;
        if (id.length != 3) do_dai_id = id.length + 2;

        return new Promise((resolve, reject) => {
            let que = "insert into " + tuyen +
                " SELECT LPAD(max(id) + 1," + do_dai_id + ",'0'),'" + id + "','" + ten + "','Không','Không',now(),now(),'Chua xong'," + dientich +
                " FROM " + tuyen + " WHERE tuyentren = '" + id + "'";
            this.connection.query(que, (err, rows) => {
                if (err) return reject(err);
                resolve("Thêm địa phương thành công");
            })
        })
    }

    chinhSua(id, ten, dientich) {
        var tuyen = this.timTuyen(id);
        let que = "UPDATE "+tuyen+" SET Ten = '"+ten+"', dientich = '"+dientich+"' WHERE id = '"+id+"'";
        return new Promise((resolve, reject) => {
            this.connection.query(que, (err, rows) => {
                if (err) return reject(err);
                resolve("Chỉnh sửa thành công");
            })
        })
    }

    xoa(id) {
        var tuyen = this.timTuyen(id);

        return new Promise((resolve, reject) => {   
            let que = "DELETE FROM "+tuyen+" WHERE id = '"+id+"'";
            this.connection.query(que, (err, rows) => {
                if (err) return reject(err);
                resolve("xóa địa phương thành công");
            })

        })
    }
    //............................


    timTen(id) {
        var tuyen = this.timTuyen(id);
        return new Promise((resolve, reject) => {
            this.connection.query("select ten from "+tuyen+" where id= '" + id + "'", (err, rows) => { //truyền truy vấn dữ liệu vào
                if (err)  return reject(err);
                if (!rows.length) resolve('');
                resolve(JSON.stringify(rows[0])); // trả về các hàng kết quả và chuyển dữ liệu đó về json
            });
        });
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
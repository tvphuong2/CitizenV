const Chung = require('./m_chung');

class DanhSach extends Chung {
    /**
     * tìm tên và quyền của một địa phương
     * @param {string} id 
     * @returns danh sách tên và quyền
     */
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

    /**
     * tìm hạn, số địa phương đang khai báo, tiến độ, tên và quyền
     * @param {string} id 
     * @param {string} ten 
     * @param {string} quyen 
     * @returns thông tin
     */
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

    /**
     * trả vê tất cả thông tin về tuyến dưới
     * @param {string} id 
     * @returns thông tin
     */
    timCapDuoi(id) {
        var tuyen = this.timTuyenDuoi(id);
        var que = ""
        if (tuyen == "tinh_thanh") que = "select id, ten, quyen, dientich from "+tuyen+" where 1";
        else que = "select id,ten, quyen, dientich from "+tuyen+" where tuyentren =" + id;

        return new Promise((resolve, reject) => {
            this.connection.query(que, (err, rows) => {
                if (err) return reject(err);
                resolve(JSON.stringify(rows)); 
            });
        });
    }

    /**
     * tìm thông tin về một hộ khẩu
     * @param {string} id 
     * @returns thông tin
     */
    timHoKhau(id) {
        var tuyen = this.timTuyenDuoi(id);

        return new Promise((resolve, reject) => {
            this.connection.query("select id,ten,sothanhvien from "+tuyen+" where tuyentren =" + id, (err, rows) => { 
                if (err) return reject(err);
                resolve(JSON.stringify(rows)); 
            });
        });
    }

    /**
     * trả về thông tin của một nhân khẩu
     * @param {string} id 
     * @returns thông tin
     */
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

    /**
     * tạo mới một địa phương trực thuộc
     * @param {string} id 
     * @param {string} ten 
     * @param {string} dientich 
     * @returns trạng thái
     */
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

    /**
     * Chỉnh sửa một địa phương
     * @param {string} id 
     * @param {string} ten 
     * @param {string} dientich 
     * @returns trạng thái
     */
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

    /**
     * xóa một địa phương
     * @param {string} id 
     * @returns trạng thái
     */
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

    /**
     * tìm tên một địa phương
     * @param {string} id 
     * @returns tên địa phương
     */
    timTen(id) {
        var tuyen = this.timTuyen(id);
        return new Promise((resolve, reject) => {
            this.connection.query("select ten, id from "+tuyen+" where id= '" + id + "'", (err, rows) => { //truyền truy vấn dữ liệu vào
                if (err)  return reject(err);
                if (!rows.length) reject("không tìm thấy");
                resolve(JSON.stringify(rows[0])); // trả về các hàng kết quả và chuyển dữ liệu đó về json
            });
        });
    }

    /**
     * Tìm tiến độ của một địa phương
     * @param {string} id 
     * @returns tiến độ
     */
    timTienDo(id) {
        var tuyen = this.timTuyen(id);
        return new Promise((resolve, reject) => {
            this.connection.query("select tiendo, DATE_FORMAT(timeend, '%d/%m/%Y') han from "+tuyen+" where id= '" + id + "'", (err, rows) => { //truyền truy vấn dữ liệu vào
                if (err)  return reject(err);
                if (!rows.length) reject("không tìm thấy");
                resolve(JSON.stringify(rows[0])); // trả về các hàng kết quả và chuyển dữ liệu đó về json
            });
        });
    }

    /**
     * tìm tên, id địa phương cấp dưới id truyền vào
     * @param {string} id 
     * @returns tên địa phương
     */
    timTenCapDuoi(id) {
        var tuyen = this.timTuyenDuoi(id);
        var que = "select ten, id from "+tuyen;
        if (id.length != 3) que += " where tuyentren= '" + id + "'";
        return new Promise((resolve, reject) => {
            this.connection.query(que, (err, rows) => { //truyền truy vấn dữ liệu vào
                if (err)  return reject(err);
                if (!rows.length) reject("không tìm thấy");
                resolve(JSON.stringify(rows)); // trả về các hàng kết quả và chuyển dữ liệu đó về json
            });
        });
    }
}

module.exports = new DanhSach();
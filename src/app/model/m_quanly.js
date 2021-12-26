const Chung = require('./m_chung');

class QuanLy extends Chung {
    /**
     * trả về id, tên, trạng thái mật khẩu, quyền, tiến độ, ngày bắt đầu, kết thúc khai báo, ngày hiện tại
     * @param {string} id 
     * @returns thông tin
     */
    capDuoi(id) {
        var tuyen = this.timTuyenDuoi(id);
        var que = ""
        if (tuyen == "tinh_thanh") 
        que = "select id,ten,matkhau,quyen,tiendo ,DATE_FORMAT(timestart, '%Y-%m-%d') batdau,DATE_FORMAT(timeend, '%Y-%m-%d') ketthuc, DATE_FORMAT(now(), '%Y-%m-%d') homnay, tiendo  from "+tuyen+" where 1";
        else 
        que = "select id,ten,matkhau,quyen,tiendo ,DATE_FORMAT(timestart, '%Y-%m-%d') batdau,DATE_FORMAT(timeend, '%Y-%m-%d') ketthuc, DATE_FORMAT(now(), '%Y-%m-%d') homnay, tiendo  from "+tuyen+" where tuyentren =" + id;

        return new Promise((resolve, reject) => {
            this.connection.query(que, (err, rows) => { //truyền truy vấn dữ liệu vào
                if (err) return reject(err);

                for (var i = 0; i < rows.length; i++) {
                    if (!rows[i].matkhau) rows[i].matkhau = "Không";
                    else if (rows[i].matkhau[0] == "$") rows[i].matkhau = "Có";
                    else rows[i].matkhau = "Không";
                }
                resolve(JSON.stringify(rows));
            });
        }); 
    }

    /**
     * kiểm tra user có quyền không, nếu có truyền tiếp id
     * @param {string} user 
     * @param {string} id 
     * @returns id truyền vào
     */
    timQuyen(user, id) {
        var tuyen = this.timTuyen(user);
        return new Promise((resolve, reject) => {
            var que = "select quyen from "+tuyen+" where id= '" + user + "'";
            this.connection.query(que, (err, rows) => { //truyền truy vấn dữ liệu vào
                if (err) return reject("Lỗi tìm quyền");
                if(rows[0].quyen == "0") reject("Bạn không có quyền chỉnh sửa");
                resolve(id);
            });
        });
    }

    /**
     * thay đổi thời hạn khai báo của một địa phương
     * @param {string} id 
     * @param {string} start 
     * @param {string} end 
     * @returns trạng thái
     */
    doiQuyen(id, start, end) {
        var tuyen = this.timTuyen(id);
        var que = "UPDATE "+tuyen+" SET timestart ='"+start+"', timeend ='"+end+"' WHERE id = '" +id+"'";
        return new Promise((resolve, reject) => {
            this.connection.query(que, (err, rows) => { //truyền truy vấn dữ liệu vào
                if (err) return reject(err);
                resolve('Đổi quyền thành công');
            });
        });
    }

    /**
     * đưa ngày kết thúc quyền về ngày hôm nay
     * @param {string} id 
     * @returns trạng thái
     */
    xoaQuyen(id) {
        var tuyen = this.timTuyen(id);
        return new Promise((resolve, reject) => {
            this.connection.query("update "+tuyen+" SET timeend = now() - interval 1 day where id = '" +id+"'", (err, rows) => { //truyền truy vấn dữ liệu vào
                if (err) return reject(err);
                resolve('Xóa quyền thành công');
            });
        });
    }

    /**
     * thay đổi tiến độ của địa phương
     * @param {string} id 
     * @param {string} tiendo 
     * @returns trạng thái
     */
    capNhatTienDo(id, tiendo) {
        var tuyen = this.timTuyen(id);
        var que = "";
        return new Promise((resolve, reject) => { 
            if (id.length == 3) reject('A1 không có tiến độ');
            if (tiendo == '0') que = "UPDATE "+tuyen+" SET `Tiendo` = '0' WHERE `Id` = '"+id+"'";
            else if (tiendo == '1') que = "UPDATE "+tuyen+" SET `Tiendo` = '1' WHERE `Id` = '"+id+"'";
            else reject('Tiến độ không hợp lệ');
            this.connection.query(que, (err, rows) => { 
                if (err) return reject(err);
                resolve('Đổi tiến độ thành công');
            });
        });
    }

    /**
     * trả về tên, quyền, tiến độ (nếu có) của một địa phương
     * @param {string} id 
     * @returns thông tin
     */  
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
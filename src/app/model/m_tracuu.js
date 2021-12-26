const Chung = require('./m_chung');

class TraCuu extends Chung {
    /**
     * tìm kiếm nhân khẩu thỏa mãn các điều kiện tìm kiếm
     */
    timKiem(cmnd,ten,tuoi,gioi,tongiao,quoctich,trinhdo,id) {
        var dautien = false;
        var que = 'select cmnd, hoten, DATE_FORMAT(ngaysinh, "%d/%m/%Y") ngaysinh, gioitinh, quoctich, thuongtru, tamtru, tongiao, trinhdo, nghenghiep from nhan_khau where ';
        if (cmnd != "") que += "cmnd = " + cmnd
        else {
            if (id != "") {
                if (id.length == 3) que += " 1 "
                else que += "id like '" + id + "%'"
                dautien = true;
            }
            if (ten != "") {
                if (dautien) que += " and ";
                else dautien = true;
                que += "hoten like '%" + ten + "%'"
            }
            if (tuoi != "") {
                if (dautien) que += " and ";
                else dautien = true;
                que += " year(ngaysinh) = year(now()) - " + tuoi
            }
            if (gioi != "") {
                if (dautien) que += " and ";
                else dautien = true;
                if (gioi =="Nam") que += " gioitinh = 0 "
                else que += " gioitinh = 1 "
            }
            if (tongiao != "") {
                if (dautien) que += " and ";
                else dautien = true;
                que += " tongiao = '" + tongiao + "'"
            }
            if (quoctich != "") {
                if (dautien) que += " and ";
                else dautien = true;
                que += " quoctich = '" + quoctich + "'"
            }
            if (trinhdo != "") {
                if (dautien) que += " and ";
                else dautien = true;
                que += " trinhdo = '" + trinhdo + "'"
            }
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
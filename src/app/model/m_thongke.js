const Chung = require('./m_chung');

class TraCuu extends Chung {
    thapTuoi(danhsach) {
        var where = ""
        var dautien = true;
        for (var i = 0; i < danhsach.length; i++) {
            if (!dautien) where += " or "
            else dautien = false
            where += "id like '" + danhsach[i] + "%' ";
        }
        var que = "SELECT count(*) soluong, sum(Gioitinh) nu, FLOOR((year(now())-year(Ngaysinh))/5)*5 muc " +
        "FROM nhan_khau WHERE " + where + "GROUP BY muc;"

        console.log(que);
        return new Promise((resolve, reject) => {
            this.connection.query(que, (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }

    matDoDanSo(danhsach) {
        var que = "";
        for (var i = 0; i <danhsach.length; i++) {
            let tuyen = this.timTuyen(danhsach[i]);
            que += "SELECT count(*)/ dientich.dt matdo FROM `nhan_khau`, (SELECT h.Dientich dt FROM "+
                tuyen +" h WHERE id = '"+danhsach[i]+"') dientich WHERE id like '"+danhsach[i]+"%';"
        }
        console.log(que);
        return new Promise((resolve, reject) => {
            this.connection.query(que, (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }

    tiLeNghe(danhsach) {
        var where = ""
        var dautien = true;
        for (var i = 0; i < danhsach.length; i++) {
            if (!dautien) where += " or "
            else dautien = false
            where += "id like '" + danhsach[i] + "%' ";
        }
        var que = "SELECT count(*) soluong, Nghenghiep nghe FROM `nhan_khau` WHERE " + where + "GROUP BY Nghenghiep;"

        console.log(que);
        return new Promise((resolve, reject) => {
            this.connection.query(que, (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }

    tiLeTonGiao(danhsach) {
        var where = ""
        var dautien = true;
        for (var i = 0; i < danhsach.length; i++) {
            if (!dautien) where += " or "
            else dautien = false
            where += "id like '" + danhsach[i] + "%' ";
        }
        var que = "SELECT count(*) soluong, tongiao FROM `nhan_khau` WHERE " + where + "GROUP BY tongiao;"

        console.log(que);
        return new Promise((resolve, reject) => {
            this.connection.query(que, (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }
}

module.exports = new TraCuu();
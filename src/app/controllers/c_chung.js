var moment = require('moment');
var m_danhsach = require('../model/m_danhsach');

class Chung {
    chuanHoaSo(i) {
        if (isNaN(i)) return ""
        return i.trim()
    }

    chuanHoaNgay(date) {
        var d = moment(date.trim(), "YYYY-MM-DD", true);
        if (d.isValid()) return date.trim();
        return ""
    }

    kiemTraNgay(date) {
        if (date != "" && !moment(date, "YYYY-MM-DD", true).isValid()) {
            return false
        } else return true;
    }

    chuanHoaID(id) {
        id = id.trim();
        if(![2,3,4,6,8,10,12].includes(id.length)) return "";
        return id;
    }

    chuanHoaIDDenHo(id) {
        id = id.trim();
        if(![2,3,4,6,8,10].includes(id.length)) return "";
        return id;
    }

    chuanHoaIDDenThon(id) {
        id = id.trim();
        if(![2,3,4,6,8].includes(id.length)) return "";
        return id;
    }

    chuanHoaIDDenXa(id) {
        id = id.trim();
        if(![2,3,4,6].includes(id.length)) return "";
        return id;
    }

    chuanHoaTen(ten) {
        var t = ten.trim();
        return t.replace(/(^\w|\s\w)/g, m => m.toUpperCase());
    }

    dinhDangSo(array) {
        for (var i = 0; i <array.length; i++) {
            if (isNaN(array[i])) {
                return false;
            }
        }
        return true;
    }

    trim(s){
        return ( s || '' ).replace( /^\s+|\s+$/g, '' ); 
    }

    gioiHanQuyen(user, id) {
        return new Promise((resolve, reject) => {
            m_danhsach.timTen(id).then(data => {
                if (data == "") {
                    reject('ID không tồn tại');
                } else {
                    if (id.startsWith(user) || user[0] == 'A') {
                        resolve(id)
                    } else {
                        reject('ID trái tuyến');
                    }
                }
            })
        });
    }
    
}

module.exports = new Chung;
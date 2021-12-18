var moment = require('moment');
var m_danhsach = require('../model/m_danhsach');

class Chung {
    chuanHoaSo(i) {
        if (isNaN(i)) return ""
        return i.trim()
    }

    chuanHoaNgay(date) {
        var d = moment(array[i], "DD/MM/YYYY", true);
        if (!d.isValid()) return d.format('YYYY/MM/DD');
        return ""
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


    
    dinhDangNgay(array){
        for (var i = 0; i <array.length ; i++) {
            if (array[i] != "" && !moment(array[i], "DD/MM/YYYY", true).isValid()) {
                return false;
            }
        }
        return true;
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

    chuanHoaNgay(day) {
        return day = moment(day, "DD/MM/YYYY", true).format('YYYY/MM/DD');
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
var moment = require('moment');
var m_danhsach = require('../model/m_danhsach');

class Chung {
    dinhDangNgay(array){
        for (var i = 0; i <array.lengthl ; i++) {
            if (!moment(array[i], "YYYY/MM/DD", true).isValid()) {
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

    gioiHanQuyen(user, id) {
        return new Promise((resolve, reject) => {
            if(![2,3,4,6,8,10].includes(id.length)) reject('ID không hợp lệ');
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
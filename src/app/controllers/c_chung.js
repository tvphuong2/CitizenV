var moment = require('moment');
var m_danhsach = require('../model/m_danhsach');

class Chung {
    /**
     * kiểm tra một chuỗi có phải dạng số không nếu không trả về ""
     * @param {string} i 
     * @returns Số đã được chuẩn hóa
     */
    chuanHoaSo(i) {
        if (isNaN(i)) return ""
        return i.trim()
    }

    /**
     * Kiểm tra một chuỗi có định dạng ngày không nếu không trả về trống
     * @param {string} date 
     * @returns Ngày đã được chuẩn hóa
     */
    chuanHoaNgay(date) {
        var d = moment(date.trim(), "YYYY-MM-DD", true);
        if (d.isValid()) return date.trim();
        return ""
    }

    /**
     * Kiểm tra chuỗi có phải dạng ngày không
     * @param {string} date 
     * @returns boolean: kết quả kiểm tra
     */
    kiemTraNgay(date) {
        if (date != "" && !moment(date, "YYYY-MM-DD", true).isValid()) {
            return false
        } else return true;
    }

    /**
     * Kiểm tra id có hợp lệ không, nếu không thì trả về trống
     * @param {int} id 
     * @returns id đã được chuẩn hóa
     */
    chuanHoaID(id) {
        id = id.trim();
        if(![2,3,4,6,8,10,12].includes(id.length)) return "";
        return id;
    }

    /**
     * Kiểm tra id có thuộc tuyến từ hộ trở lên hay không, nếu không trả về trống
     * @param {int} id 
     * @returns id đã được chuẩn hóa
     */
    chuanHoaIDDenHo(id) {
        id = id.trim();
        if(![2,3,4,6,8,10].includes(id.length)) return "";
        return id;
    }

        /**
     * Kiểm tra id có thuộc tuyến từ thôn trở lên hay không, nếu không trả về trống
     * @param {int} id 
     * @returns id đã được chuẩn hóa
     */
    chuanHoaIDDenThon(id) {
        id = id.trim();
        if(![2,3,4,6,8].includes(id.length)) return "";
        return id;
    }

    /**
     * Kiểm tra id có thuộc tuyến từ xã trở lên hay không, nếu không trả về trống
     * @param {int} id 
     * @returns id đã được chuẩn hóa
     */
    chuanHoaIDDenXa(id) {
        id = id.trim();
        if(![2,3,4,6].includes(id.length)) return "";
        return id;
    }

    /**
     * Trả về tên đã được chuẩn hóa
     * @param {string} ten 
     * @returns tên đã được chuẩn hóa
     */
    chuanHoaTen(ten) {
        var t = ten.trim();
        return t.replace(/(^\w|\s\w)/g, m => m.toUpperCase());
    }

    /**
     * lược bỏ dấu cách thừa
     * @param {string} s 
     * @returns chuỗi đã cắt
     */
    trim(s){
        return ( s || '' ).replace( /^\s+|\s+$/g, '' ); 
    }

    /**
     * Kiểm tra một id có thuộc địa phương mà user quản lý hay không
     * @param {int} user mã khách
     * @param {int} id mã muốn kiểm tra
     * @returns kết quả kiểm tra
     */
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
var m_danhsach = require('../model/m_danhsach'); //sử dụng csdl model chung tất cả các bảng (mỗi bảng 1 file js trong model)
const Chung = require('./c_chung');

class Data {
    index(req, res) {
        res.render('danhsach', {layout: 'main'}); // trả về vews/danhsach với layout: main
    }

    /* chỉnh sửa tên của một địa phương
    input id, new_name, dientich
    output 'no' nếu như id và name mới không bị trùng. Nếu hợp lệ trả về 'yes'
    */
    chinhSua(req, res) {
        var id = Chung.trim(req.query.id);
        var ten = Chung.trim(req.query.name);
        var dientich = req.query.dientich;
        if (!Chung.dinhDangSo([dientich])) 
            return res.status(400).json({status: 'Diện tích không hợp lệ'})

        Chung.gioiHanQuyen(req.user, id)
        .then(id => m_danhsach.chinhSua(id, ten, dientich))
        .then(s => res.json({status: s}))
        .catch(err => res.status(403).json({status: err}))

    }

    xoa(req, res) {
        var id = Chung.trim(req.query.id);

        Chung.gioiHanQuyen(req.user, id)
        .then(id => m_danhsach.xoa(id))
        .then(s => res.json({status: s}))
        .catch(err => res.status(403).json({status: err}))
    }

    /* tạo một địa phương mới
    input id, new_name, dientich
    output 'no' nếu như id và name mới không bị trùng. Nếu hợp lệ trả về 'yes'
    */
    taoMoi(req, res) {
        var name = Chung.trim(req.query.name);
        var dientich = req.query.dientich;
        if (!Chung.dinhDangSo([dientich])) 
            return res.status(400).json({status: 'Diện tích không hợp lệ'})

        m_danhsach.taoMoi(req.user,name,dientich)
        .then(s => res.json({status: s}))
    }

    /* thống kê (để làm cuối cùng, sử dụng react)
    input: chuỗi các id cách nhau bằng dẫu cách
    output một trang mới chứa các lược đồ thống kê
    */
    thongKe(req, res) {
        var arr_id = req.query.arr_id;
        var type = req.query.type;
        m_danhsach.thongKe(arr_id,type).then(function(s){
            if (s=="") res.status(403).json({status: ''})
            else res.send(s);   
        })

    }

    /* lấy các địa phương thuộc địa phương đó nếu id ='-1' lấy hết tất cả các tỉnh
    input: id
    output mảng các id địa phương
    */
    capDuoi(req, res) {
        var id = Chung.trim(req.query.id); // lấy trường id từ request (xem trong public/js/data_syn.js)

        m_danhsach.timCapDuoi(id) //gọi hàm timcapduoi trong model/chung.js, gửi dữ liệu sau khi hàm này được hoàn thành
        .then(s => { 
            if (s=="") res.status(403).json({status: 'mã không hợp lệ'})
            else res.send(s); //gửi dữ liệu
        })
    }


    /* Tìm tên của 1 id
    input: id
    output: tên của id đó
     */
    timTen(req, res) {
        var id = Chung.trim(req.query.id); 
        m_danhsach.timTen(id)
        .then(s => { //gọi hàm timcapduoi trong model/chung.js, gửi dữ liệu sau khi hàm này được hoàn thành
            if (s=="") res.status(403).json({status: 'mã không hợp lệ'})
            else res.send(s); //gửi dữ liệu
        }).catch(err =>res.status(404).json({status: err}))
    }

    danhSachNhanKhau(req, res) {
        var id = req.query.id; // lấy trường id từ request (xem trong public/js/data_syn.js)
        m_danhsach.thongTinNhanKhau(id).then(function (s) {
          //gọi hàm timcapduoi trong model/chung.js, gửi dữ liệu sau khi hàm này được hoàn thành
          if (s == "") res.status(403).json({ status: "mã không hợp lệ" });
          else res.send(s); //gửi dữ liệu
        });
      }
}

module.exports = new Data;
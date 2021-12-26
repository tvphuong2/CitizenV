var m_danhsach = require('../model/m_danhsach'); //sử dụng csdl model chung tất cả các bảng (mỗi bảng 1 file js trong model)
const Chung = require('./c_chung');

class Data {
    index(req, res) {
        res.render('w_trangchu', {layout: 'l_main'}); // trả về vews/danhsach với layout: main
    }

    /**
     * chỉnh sửa một địa phương trực thuộc
     * input: id, ten, dientich
     * output: trả về trạng thái chỉnh sửa (thất bại hoặc thành công)
     */
    chinhSua(req, res) {
        var id = Chung.chuanHoaIDDenThon(req.query.id);
        var ten = Chung.chuanHoaTen(req.query.name);
        var dientich = Chung.chuanHoaSo(req.query.dientich);

        if (id == "") return res.status(404).json({status: 'ID không tồn tại'});
        if (ten =="" || dientich == "") return res.status(400).json({status: 'Tên hoặc diện tích không hợp lệ'});

        Chung.gioiHanQuyen(req.user, id)
        .then(id => m_danhsach.chinhSua(id, ten, dientich))
        .then(s => res.json({status: s}))
        .catch(err => res.status(403).json({status: err}))

    }

    /**
     * xóa một địa phương trực thuộc
     * input: id
     * output: trả về trạng thái xóa địa phương (thất bại hoặc thành công)
     */
    xoa(req, res) {
        var id = Chung.chuanHoaIDDenHo(req.query.id);
        if (id == "") return res.status(404).json({status: 'ID không tồn tại'});

        Chung.gioiHanQuyen(req.user, id)
        .then(id => m_danhsach.xoa(id))
        .then(s => res.json({status: s}))
        .catch(err => res.status(403).json({status: err}))
    }

    /**
     * tạo mới một địa phương
     * input: name, dientich
     * output: trả về trạng thái tạo mới (thất bại hoặc thành công)
     */
    taoMoi(req, res) {
        var name = Chung.chuanHoaTen(req.query.name);
        var dientich = Chung.chuanHoaSo(req.query.dientich);

        if (name == "" || dientich == "") return res.status(400).json({status: 'Tên hoặc diện tích không hợp lệ'});
        m_danhsach.taoMoi(req.user,name,dientich)
        .then(s => res.json({status: s}))
    }

    /**
     * trả về một bản báo cáo ngắn về tài khoản khách
     * output: trả về tên và quyền nếu có quyền trả thêm tiến độ tuyến dưới, số địa phương đang khai báo, hạn
     */
    thongTin(req, res) {
        m_danhsach.tenQuyen(req.user)
        .then(ten_quyen => {
            if (ten_quyen.quyen == "1" && req.user.length < 8) {
                return m_danhsach.thongTin(req.user, ten_quyen.ten, ten_quyen.quyen)
            } else {
                return JSON.stringify(ten_quyen);
            }
        })
        .then(s => res.send(s))
        .catch(err => res.status(403).json({loi: "Truy vấn không hợp lệ"}))
    }

    /**
     * trả về danh sách tuyến dưới
     * input: id
     */
    capDuoi(req, res) {
        var id = Chung.chuanHoaIDDenThon(req.query.id);
        if (id == "") return res.status(404).json({status: 'ID không tồn tại'});

        Chung.gioiHanQuyen(req.user, id)
        .then(id => {
            if (id.length == 8)
                return m_danhsach.timHoKhau(id)
            else
                return m_danhsach.timCapDuoi(id)
        })
        .then(s => res.send(s))
        .catch(err => res.status(403).json({loi: "Truy vấn không hợp lệ"}))
    }

    /**
     * trả về danh sách nhân khẩu thộc id
     */
    danhSachNhanKhau(req, res) {
        var id = Chung.chuanHoaIDDenHo(req.query.id);
        if (id == "") return res.status(404).json({status: 'ID không tồn tại'});

        Chung.gioiHanQuyen(req.user, id)
        .then(id => m_danhsach.thongTinNhanKhau(id))
        .then(s => res.send(s))
        .catch(err => res.status(403).json({loi: "Truy vấn không hợp lệ"}))
    }

    /* Tìm tên của 1 id
    input: id
    output: tên của id đó
     */
    timTen(req, res) {
        var id = Chung.chuanHoaIDDenThon(req.query.id);
        if (id == "") return res.status(404).json({status: 'ID không tồn tại'});

        m_danhsach.timTen(id)
        .then(s => res.send(s))
        .catch(err =>res.status(404).json({loi: "Không tìm thấy địa phương"}))
    }

    timTienDo(req, res) {
        var id = Chung.chuanHoaIDDenThon(req.query.id);
        if (id == "") return res.status(404).json({status: 'ID không tồn tại'});

        m_danhsach.timTienDo(id)
        .then(s => res.send(s))
        .catch(err =>res.status(404).json({loi: "Không tìm thấy địa phương"}))
    }

    timTenCapDuoi(req, res) {
        var id = Chung.chuanHoaIDDenXa(req.query.id);
        if (id == "") return res.status(404).json({status: 'ID không tồn tại'});

        m_danhsach.timTenCapDuoi(id)
        .then(s => res.send(s))
        .catch(err =>res.status(404).json({loi: "Không tìm thấy địa phương"}))
    }
}

module.exports = new Data;
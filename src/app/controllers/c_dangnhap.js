class Login {

    index(req, res) {
        res.render('dangnhap', {layout: 'login_layout'}); // trả về view/dangnhap với layout là login_layout
    }
}

module.exports = new Login;
const path = require('path'); //để thao tác với địa chỉ
const express = require('express'); //khung chương trình
const handlebars = require('express-handlebars'); // để tách file html
const session = require('express-session') // sử dụng phiên
const hbs = handlebars.create({extname: '.hbs'})
const app = express(); // chương trình
const port = 3000; //cổng

const route = require('./routes'); //nơi điều hướng url

// sử dụng phiên
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'sieucapbaomat',
    cookie: {maxAge: 3600 * 24 * 60 * 60}
}))
//những file tĩnh như html, css, img,... sẽ được điều hướng vào public
app.use(express.static(path.join(__dirname, 'public')));

//để nhận các đối tượng từ POST và PUT
app.use(express.urlencoded({
    extended:true
}));
app.use(express.json());

//ta sẽ không sử dụng html thuần mà sẽ sử dụng handlebars cho view nhưng đổi đuôi thành hbs cho gọn
// mọi người có thể đổi thành bất cứ đuôi gì mình muốn
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

//định tuyến
route(app);

//Thiết lập cổng
app.listen(port, () => console.log('listening on port: 3000'));
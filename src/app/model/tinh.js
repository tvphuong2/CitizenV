const mysql = require('mysql');

class tinh {
    constructor() {
		this.connection = mysql.createPool({
			connectionLimit: 100,
			host: '127.0.0.1',
			user: 'root',
			password: '',
			database: 'citizenv',
			debug: false
		});
	}

    layTatCa() {
        return new Promise((resolve, reject) => {
			this.connection.query("select tentinh from tinh where 1", (err, rows) => {
				if (err)
					return reject(err);
				resolve(JSON.stringify(rows));
			});
		});
    }
}

module.exports = new tinh();
const mysql = require('mysql');

class huyen {
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

    timHuyen() {
        return new Promise((resolve, reject) => {
			this.connection.query("select tenhuyen from huyen_quan where 1", (err, rows) => {
				if (err)
					return reject(err);
				resolve(JSON.stringify(rows[0]));
			});
		});
    }
}

module.exports = new huyen();
const mysql = require('mysql');

class store {
    constructor() {
		this.connection = mysql.createPool({
			connectionLimit: 100,
			host: '127.0.0.1',
			user: 'root',
			password: '',
			database: 'sakila',
			debug: false
		});
	}

    getStore() {
        return new Promise((resolve, reject) => {
			this.connection.query("select * from store where 1", (err, rows) => {
				if (err)
					return reject(err);
				resolve(JSON.stringify(rows[0]));
			});
		});
    }
}

module.exports = new store();
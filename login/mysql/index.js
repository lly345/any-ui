const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123321",
    database: "db_1702f"
});

connection.connect();

const query = ($sql, option) => {
    return new Promise((resolve, reject) => {
        let callback = (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        };
        option = option ? option : callback;
        callback = option ? callback : null;
        connection.query($sql, option, callback);
    });
};

module.exports = query;

const mysql = require('mysql');


//Create connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodemysql'

});

//Connect
db.connect((err) => {
    if (err) {
        console.log('err is', err);
    }
    console.log('Mysql Connected......');
});

module.exports = db;
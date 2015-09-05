var mysqlConfig = require('../../mysql-util-config.json')
var mysql = require('mysql');

/*
 Example ./mysql-util-config.json
 {
 "connectionLimit": 20,
 "host": "localhost",
 "database": "nfcMap",
 "user": "mushketera",
 "password": "mushketera"
 }
 */
module.exports = {

    pool : mysql.createPool(mysqlConfig),

    go : function go(method) {
        this.pool.getConnection(function (err, c) {
            console.log("Connection obtained");
            if (!err) {
                try {
                    method(c);
                    c.release();
                    console.log("Connection released");
                    return null;

                } catch (e) {
                    console.dir(e);
                    c.release();
                    return e;
                }
            } else {
                console.dir(err);
                c.release();
                return err;
            }
        });
    }
};

var mssql = require('mssql');
var db = {};
var config = {
    user: 'sa',
    password: 'sql20190103',
    server: 'localhost',
    database: 'sql_test',
    multipleStatements: true
}
var query = function (sql, callBack) {
    var connection = new mssql.ConnectionPool(config, function (err) {
        if (err) {
            console.log(err);
            return;
        }
        var ps = new mssql.PreparedStatement(connection);
        ps.prepare(sql, function (err) {
            if (err) {
                console.log(err);
                return;
            }
            ps.execute('', function (err, result) {
                if (err) {
                    console.log(err);
                    return;
                }
                ps.unprepare(function (err) {
                    if (err) {
                        console.log(err);
                        callback(err, null);
                        mssql.close();
                        return;
                    }
                    callBack(err, result);
                    mssql.close();
                });
            });
        });
    })
    
};
exports.query = query;
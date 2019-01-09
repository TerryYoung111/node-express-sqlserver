var db = require("./database");

module.exports.reduce = function (collection, operate, param, func) {
    find(collection, param, func);
};

module.exports.queryById = function (req, func) {
    var sql = `select * from student where id = '${req.body.id}'`;
    db.query(sql, func);
};

//  查找所有学生
module.exports.findAll = function (req, func) {
    var sql = "select id,name,account,gender,tel from student";
    db.query(sql, func);
};

// 插入新学生
module.exports.addNew = function (req, func) {
    var sql = `
    DECLARE @myid uniqueidentifier 
    SET @myid = NEWID()
    insert into student (id,name,account,password,gender,tel) values(@myid,'${req.body.name}' ,'${req.body.account}','${req.body.password}','${req.body.gender}','${req.body.tel}')
    `;
    db.query(sql, func);
};

// 根据name查找数据
module.exports.queryByName = function (req, func) {
    var sql = `SELECT id FROM student WHERE name = '${req.body.name}'`;
    db.query(sql, func);
}

//  根据id删除数据
module.exports.deleteById = function (req, func) {
    var sql = `DELETE FROM student WHERE id = '${req.body.id}'`;
    db.query(sql, func);
}

//  更新数据
module.exports.updateData = function (req, func) {
    var sql = `UPDATE student SET name = '${req.body.name.trim()}',account = '${req.body.account.trim()}',password = '${req.body.password.trim()}',gender='${req.body.gender.trim()}',
    tel = '${req.body.tel.trim()}' WHERE id = '${req.body.id.trim()}'`;
    db.query(sql, func);
}
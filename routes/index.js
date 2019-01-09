var express = require('express');
var router = express.Router();
var studentDao = require('../dao/studentDao');
var tools = require('../public/javascripts/tools');
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});


router.get('/students/all', function (req, res, next) {
  studentDao.findAll('req', function (err, data) {
    if (err) {
      res.send({
        success: false,
        datas: err
      });
    } else {
      res.send({
        success: true,
        datas: tools.customTrim(data.recordset)
      });
    }
  })
});

router.post('/students/add', function (req, res, next) {
  studentDao.queryByName(req, function (err, data) {
    if (err) {
      res.send({
        success: false,
        datas: err
      });
      return;
    }
    if (data.rowsAffected[0] == 0) {
      studentDao.addNew(req, function (err, data) {
        if (err) {
          res.send({
            success: false,
            datas: err
          });
          return;
        }
        res.send({
          success: true,
          datas: []
        });
      })
    } else {
      res.send({
        success: false,
        datas: {
          messages: '姓名已经存在！'
        }
      });
    }
  })
})

router.post('/students/delete', function (req, res, next) {
  studentDao.deleteById(req, function (err, data) {
    if (err) {
      res.send({
        success: false,
        datas: err
      });
      return;
    }
    res.send({
      success: true,
      datas: []
    });
  })
})

router.post('/students/queryById', function (req, res, next) {
  studentDao.queryById(req, function (err, data) {
    if (err) {
      res.send({
        success: false,
        datas: err
      })
      return;
    }
    res.send({
      success: true,
      datas: tools.customTrim(data.recordset[0])
    })
  })
})

router.post('/students/update', function (req, res, next) {
  studentDao.updateData(req, function (err, data) {
    if (err) {
      res.send({
        success: false,
        datas: err
      })
      return;
    }
    res.send({
      success: true,
      datas: []
    })
  })
})

module.exports = router;
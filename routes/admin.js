var express = require('express');
var router = express.Router();
var userMgr = require('../app/user').userMgr;


/* GET home page. */
router.get('/', function(req, res) {
  userMgr.getManager(function(results){
    res.render('admin',{title: 'المدراء', users : results});
  })
});

/* Get user by level form for admin */
router.get('/getManager/:level', function(req, res) {
  console.log("got here level");
  userMgr.getManager(function(result){
    res.send(result);
  })
});


/* Edit manager*/
router.get('/editmanager/:id', function(req, res) {
  userMgr.getUser(req.params.id,function(result){
    res.render('editmanager',{title: 'تعديل المدراء', user : result});
  })
});
/* POST Add manager form for abmin */
router.get('/addmanager', function(req, res) {
  userHelpers.addUser(req, function (results){
    userMgr.getUsers(function(results){
      res.render('admin', { title: 'اضافة مدير' , users : results});
    });
  });
});
/* Delete manager by id */
router.get('/deleteUser/:id', function(req, res) {
  userMgr.delUser(req.params.id,function(result){
    res.send(result);
  })
});


module.exports = router;
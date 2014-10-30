var mysqlMgr = require('./mysql').mysqlMgr,
    util=require('util');

exports.userMgr = {
  /* adding a new user to the system */
  addUser : function(body,cb){
    mysqlMgr.connect(function (conn) {
      conn.query('INSERT INTO `user` SET ?',  body,  function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(body.name); 
        }
      });
    });
  },
  /* editing user's table field by field */
  editUser : function(body,cb){
    mysqlMgr.connect(function (conn) {
      conn.query('UPDATE `user` SET '+body.name+' = ? WHERE `iduser` = ?',  [body.value,body.pk],  function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(body.name); 
        }
      });
    });
  },
  /* check if email exists */
  checkEmail : function(email,cb){
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT `status` FROM `user` WHERE `email` = ? ',  email,  function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(result);
        }
      });
    });
  },
  /* get all users*/
  getUsers : function(cb){
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT * FROM `user` WHERE status = 1 ',  function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(result);
        }
      });
    });
  },
  /* get user by id*/
  getUser : function(id,cb){
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT `iduser`,`name`,`email`,`level`,`phone` FROM `user` WHERE iduser = ?',id,  function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(result);
        }
      });
    });
  },
    /* delete user by id*/
  delUser : function(id,cb){
    mysqlMgr.connect(function (conn) {
      conn.query('UPDATE `user` SET status = 0 WHERE iduser = ?',id,  function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(result);
        }
      });
    });
  },
    /* get Manager*/
  getManager : function(cb){
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT `iduser`,`name`,`email`,`level`,`phone` FROM `user` WHERE status = 1 AND level = ?', 2 ,  function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(result);
        }
      });
    });
  },
  /* getting user by email */
  getUserByEmail : function(email,cb){
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT * FROM `user` WHERE email = ?',email,  function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(result[0]);
        }
      });
    });
  },
  /* getting user by ID */
  getUserById : function(id,cb){
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT * FROM `user` WHERE iduser = ?',id,  function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(result[0]);
        }
      });
    });
  }
};
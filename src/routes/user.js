const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../database.js');

// GET all Users
router.get('/', (req, res) => {
  mysqlConnection.query('CALL SP_READ_USERS', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });  
});

// GET An Users
router.get('/:id', (req, res) => {
  const { id } = req.params; 
  mysqlConnection.query('SELECT * FROM Users WHERE Id_User = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
    }
  });
});

// Delete An Users
router.delete('/:id', (req, res) => {
  const { Id_User } = req.params;
  const query=`SET @Id_User = ?;
  CALL SP_DELETE_USERS(@Id_User);
  `;
  //DELETE FROM Users WHERE Id_User = ?
  mysqlConnection.query(query, [Id_User], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'USER DELETED'});
    } else {
      console.log(err);
    }
  });
});

// Add An User
router.post('/', (req, res) => {
  const {User_Name, Email, rol,Status} = req.body;
  console.log(User_Name, Email, rol,Status);
  const query = `
    SET @User_Name = ?;
    SET @Email = ?;
    SET @rol = ?;
    SET @Status = ?;
    CALL SP_CREATE_USER(@User_Name, @Email, @rol,@Status);
  `;
  mysqlConnection.query(query, [User_Name, Email, rol,Status], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'USER SAVED'});
    } else {
      console.log(err);
    }
  });

});


//Update An Users
router.put('/:Id_User', (req, res) => {
  const {User_Name, Email, rol,Status} = req.body;
  const { Id_User } = req.params;
  const query = `
    SET @Id_User = ? ;
    SET @User_Name = ?;
    SET @Email = ?;
    SET @rol = ?;
    SET @Status = ?;    
    CALL Update_Usuario(@Id_User, @User_Name, @Email,@rol,Status);
  `;
  mysqlConnection.query(query, [Id_User,User_Name, Email, rol,Status], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'USER UPDATED'});
    } else {
      console.log(err);
    }
  });
});

module.exports = router;

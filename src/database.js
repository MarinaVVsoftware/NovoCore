const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
  host: '66.117.0.76',
  user: 'marina32',
  password: 'MarinA13..',
  database: 'marina32_novo_db',
  multipleStatements: true
});

mysqlConnection.connect(function (err) {
  if (err) {
    console.error(err);
    return;
  } else {
    console.log('db is connected');
  }
});

module.exports = mysqlConnection;

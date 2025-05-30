var mysql = require('mysql2');
var { faker } = require('@faker-js/faker'); 
var express = require('express');
const bodyParser = require('body-parser');

var app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Noor@786',
  database: 'join_us'
});

app.get("/", function(req, res){
  var q = 'SELECT COUNT(*) as count FROM users';
  connection.query(q, function (error, results) {
  if (error) throw error;
  var msg = "We have " + results[0].count + " users";
  res.render('home', {count: msg});
  });
  // connection.end();
});

app.post('/register', function(req,res){
  var person = {email: req.body.email};
  connection.query('INSERT INTO users SET ?', person, function(err, result) {
  console.log(err);
  console.log(result);
  res.redirect("/");
  // connection.end();
  });
});
 
const port = process.env.PORT || 8080; // Uses environment variable or defaults to 8080

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

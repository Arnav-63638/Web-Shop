const express = require('express');
const session = require('express-session');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const bodyParser = require("body-parser");
const mysql = require('mysql2')


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(session({
  secret : 'my secret',
  resave : false,
  saveUninitialized : true,
  cookie: {
    httpOnly : true,
    maxAge: 3600000
  }
}))



let db = mysql.createConnection({
    host: "localhost",
    user: "Arnav_63638",
    password: "pass123",
    database: 'user_authentication'
  });

let sql = ''

app.post('/login', (req, res)=>{
  const username = req.body.username;
  const password = req.body.password;

  sql = `
    select * 
    from users
    where users.username='${username}' and users.password='${password}'
  `
  db.connect((err)=>{
    if(err) throw err;
    db.query(sql, (err, data)=>{
      if(err) throw err;
      if(data.length==1){
        req.session.user = {username: username, password: password}
        res.json({auth: true})
      }
      else{
        res.json({auth: false})
      }
    })
  })  
})

const reqauth = (req, res, next)=>{
  if(req.session.user) next();
  else res.json({auth:false});
}


app.get('/', reqauth, (req, res)=>{
  res.json({auth:true, username: req.session.user.username});
})

app.listen(8080)
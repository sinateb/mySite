var express = require('express');
var path = require('path');
var bodyParser =require('body-parser');
var expressValidator = require('express-validator');
var mongojs = require('mongojs')
var db = mongojs('mongodb://sinateb:269578@cluster0-shard-00-00-w5m3k.mongodb.net:27017,cluster0-shard-00-01-w5m3k.mongodb.net:27017,cluster0-shard-00-02-w5m3k.mongodb.net:27017/mydb?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin',['myCollection']);
var app = express();
var GoogleUrl = require( 'google-url' );
googleUrl = new GoogleUrl( { key: 'AIzaSyCxGfJytbI-7TDaYU9TIFsOskRZI_CKj_U' });

//set view engine

app.set('view engine','ejs');
app.set('views', path.join(__dirname,'views'));

//set static path
app.use(express.static(path.join(__dirname,'public')));

//Global Vars
app.use(function(req,res,next){
res.locals.errors= null;
next();
});
//express validator Middleware
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));


//body parser midddle ware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', function(req, res) {
   res.render('index');
});

app.get('/shortenLink',function(req,res){
  res.render('shortenLink');
});


app.post('/submition',function(req,res){

req.checkBody('fname','first name required').notEmpty();
req.checkBody('lname','last name required').notEmpty();
req.checkBody('email','email required').notEmpty();

var errors = req.validationErrors();
if(errors){
 console.log('ERRORS');
}else{

var newUser = {
   first_name: req.body.fname,
   last_name: req.body.lname,
   email: req.body.email,
   username:req.body.username,
   password: req.body.signpassword,
   link: ''
 }

 db.myCollection.insert(newUser,function(err,result){
    if(err){
      console.log(err);
    }
    res.render('/');
 });

 console.log('Success');
}
 
});

app.post('/login',function(req,res){
    
    username=req.body.username;
    password=req.body.password;
    db.myCollection.find({ $and :[{username:username,password:password}]} ,function(err,items) {
       if(items.length != 0) {
           res.render('shortenLink',{
            link:'links',
            users:items
           });
         console.log('exist');
         console.log(items);
       } else{
         res.render('index');
         console.log('not exist');
        
       }
    });  
  });



app.post('/shorten',function(req,res){
      url=req.body.link;
      email=req.body.email; 
      googleUrl.shorten( url , function( err, shortUrl ) {            
      res.render('shortenLink',{
        link:shortUrl,
    });
  });
   
  console.log(email);
});

app.listen(5000, function() {
  console.log('Node app is running on port 5000 ...');
});

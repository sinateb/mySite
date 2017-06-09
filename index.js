var express = require('express');
var app = express();
var path = require('path');
var mongo=require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var formidable = require('formidable');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var cookieParser = require('cookie-parser');
var GoogleUrl = require( 'google-url' );
var fs = require('fs');
var dt = require('./index.js');
var googleUrl = new GoogleUrl( { key: 'AIzaSyCxGfJytbI-7TDaYU9TIFsOskRZI_CKj_U' });
var list=[];

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname));
app.use(express.static( __dirname + '/userShortner'));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

var url='mongodb://sinateb:269578@cluster0-shard-00-00-w5m3k.mongodb.net:27017,cluster0-shard-00-01-w5m3k.mongodb.net:27017,cluster0-shard-00-02-w5m3k.mongodb.net:27017/mydb?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin';


var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/*app.post('/', urlencodedParser, function (req, res) {
  if (!req.body) return res.sendStatus(400)
  var fname=req.body.fname;
  var lname=req.body.lname;
  res.sendFile(__dirname + '/home.html');
  mongo.connect(url, function(err,db){
    if(err) throw err;
    console.log("Connected to DB") ;
  db.collection('myCollection').insert({name:fname,lname:lname},function(err,res){
          if (err) throw err;
          console.log("1 record inserted");  
          db.close();
        });
  });
});*/

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/home.html');
});

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/userShortner/shortner.html');
});

app.post('/login',urlencodedParser,function(req,res){
    if(!req.body) return res.sendStatus(400);
    var username=req.body.Username;
    var password=req.body.password;
    mongo.connect(url, function(err,db){
    if(err) throw err;
    console.log("Connected to DB") ;
    
  db.collection('myCollection',function(err,myCollection){
    if(err) throw err;
   myCollection.find({Username:username,Password:password}).toArray(function(err,items){
       if(err) throw err;
       if(items.length!=0){
          res.redirect('/userShortner/shortner.html');
          console.log(items.length+' items found');
       }          
       else{
              res.sendFile(__dirname + '/home.html');
              console.log('not found');        
       }
      
   });
          db.close();         
         });
      });        
  });

  app.post('/register',urlencodedParser,function(req,response){
    if(!req.body) return res.sendStatus(400);
    var Username=req.body.Username;
    var Password=req.body.password;
    mongo.connect(url, function(err,db){
    if(err) throw err;
    console.log("Connected to DB") ;
    
  db.collection('myCollection',function(err,myCollection){
    if(err) throw err;
    var fname=req.body.fname;
    var lname=req.body.lname;
    var email=req.body.email;
    var username=req.body.user;
    var password=req.body.password;  
    var myobj={firstName:fname,lastName:lname,Email:email,Username:username,Password:password}
    myCollection.insertOne(myobj,function(err,res){
       if(err) throw err;
       console.log("1 record inserted");
       response.sendFile(__dirname + '/home.html');
        db.close();
         });          
      });
   });        
});


app.post('/userShortner/shortner.html',urlencodedParser,function(req,res){
  if(!req.body) return res.sendStatus(400);
    var shortner=req.body.shortner;
    googleUrl.shorten( shortner, function( err, shortUrl ) {
       if(err) throw err;
       list=shortUrl;
       console.log();
      
} );
   
});

/*mongo.connect(url, function(err,db){
    if(err) throw err;
    console.log("Connected to DB") 
    db.collection('myCollection', function (err, myCollection) {
        myCollection.find().toArray(function(err, items) {
            if(err) throw err;
            app.get('/',function(req,res){
                res.send(items);
             }); 
            console.log(items);          
        });
        
    });

    db.close();
});*/
/*MongoClient.connect(url, function(err, db) {
     if(err) throw err;
  console.log("Connected to DB") ;
  
  /*db.collection('myCollection').insertOne({name:"Baku"},function(err,res){
          if (err) throw err;
          console.log("1 record inserted");  
          db.close();
        });
  });*/

  function hello(){
    console.log(list);
  }
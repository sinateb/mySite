var express = require('express');
var app = express();
var path = require('path');
var mongo=require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var formidable = require('formidable');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var cookieParser = require('cookie-parser');


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

app.post('/',urlencodedParser,function(req,res){
    if(!req.body) return res.sendStatus(400);
    var Username=req.body.Username;
    var Password=req.body.password;
    mongo.connect(url, function(err,db){
    if(err) throw err;
    console.log("Connected to DB") ;
    
  db.collection('myCollection',function(err,myCollection){
    if(err) throw err;
   myCollection.find({username:Username,password:Password}).toArray(function(err,items){
       if(err) throw err;
       if(items.length!=0){
          res.redirect('/userShortner/shortner.html');
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


app.post('/userShortner/shortner.html',urlencodedParser,function(req,res){
  if(!req.body) return res.sendStatus(400);
    res.redirect('..')
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
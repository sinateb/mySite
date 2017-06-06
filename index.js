var express = require('express');
var app = express();
var mongo=require('mongodb');
var MongoClient = require('mongodb').MongoClient;

app.set('port', (process.env.PORT || 5000));

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/home.html');
});
app.use(express.static(__dirname));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


var url='mongodb://sinateb:269578@cluster0-shard-00-00-w5m3k.mongodb.net:27017,cluster0-shard-00-01-w5m3k.mongodb.net:27017,cluster0-shard-00-02-w5m3k.mongodb.net:27017/mydb?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin';

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
  console.log("Connected to DB") ;
  db.collection('myCollection', function (err, myCollection) {
        myCollection.find().toArray(function(err, items) {
            if(err) throw err;
           console.log(items);
        });
  db.close();
  });
});*/
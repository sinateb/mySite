var express = require('express');
var app = express();
var mongo=require('mongodb');

app.set('port', (process.env.PORT || 5000));

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/home.html');
});
app.use(express.static(__dirname));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


var url='mongodb://localhost/mydb';

mongo.connect(url, function(err,db){
    if(err) throw err;
    console.log("Connected to DB") 
    db.collection('myCollection', function (err, myCollection) {
        myCollection.find().toArray(function(err, items) {
            if(err) throw err;
            app.get('/',function(req,res){
                res.send(items[0]);
             }); 
            console.log(items);          
        });
        
    });

    db.close();
});
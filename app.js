
var express=require('express');
var app=express();
var router=express.Router();
var bodyParser=require('body-parser');
var mongo=require('mongodb');
var assert=require('assert');



var url='mongodb://localhost/mydb';


app.listen(3000,function(){
console.log('Server running on port 3000');
});


mongo.connect(url, function(err,db){
    if(err) throw err;
    console.log("Connected to DB")
    app.get('/',function(req,res){

        res.sendFile(__dirname + '/index.html');
    });
    app.use(express.static(__dirname));
    
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


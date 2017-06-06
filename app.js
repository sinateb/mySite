
var express=require('express');
var app=express();
var router=express.Router();
var bodyParser=require('body-parser');
var mongo=require('mongodb');
var assert=require('assert');
var port=process.env.port || 3000;


//var url='mongodb://localhost/mydb';


app.listen(port,function(){
console.log('Server running on port 3000');
});
app.get('/',function(req,res){

        res.sendFile(__dirname + '/index.html');
    });
app.use(express.static(__dirname));
/*mongo.connect(url, function(err,db){
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
});*/


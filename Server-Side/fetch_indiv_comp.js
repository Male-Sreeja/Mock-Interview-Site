var express=require('express');
var bodyParser=require('body-parser');

let mongodb=require("mongodb");
let talentsprint=mongodb.MongoClient;

let fetch = express.Router().get("/:cmpName",(req,res)=>{
    // console.log(req.params.cmpName);
    talentsprint.connect("mongodb://localhost:27017/mockInterv",(err,db)=>{
        if(err){
            throw err;
        }
        else{
            db.collection(req.params.cmpName).find({}).toArray((err,array)=>{
                if(err){
                    throw err;
                }
                else{
                    if(array.length > 0){
                        res.send(array);
                    }else{
                        res.send({message:"Record Not Found..."});
                    }
                }
            });
        }
    });
});

module.exports=fetch;
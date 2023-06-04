let mongodb = require("mongodb");
let talentsprint = mongodb.MongoClient;

let register  = require("express").Router().post("/",(req,res)=>{
    console.log(req.body.role);
        talentsprint.connect("mongodb://localhost:27017/mockInterv",(err,db)=>
        {
            if(err)
                throw err;
            else{
    db.collection(req.body.role).insertOne({"email":req.body.email,"password":req.body.password,"name":req.body.name},
                (err, result)=> {
                    if (err) throw err;
                    res.send({message:"1 document inserted"});
                    db.close();
                  });
                }
            });
        });
module.exports = register;
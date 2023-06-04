let mongodb = require("mongodb");
let talentsprint = mongodb.MongoClient;

let register  = require("express").Router().post("/",(req,res)=>{
        talentsprint.connect("mongodb://localhost:27017/mockInterv",(err,db)=>
        {
            if(err)
                throw err;
            else{
    db.collection('stu_slots').insertOne({"email":req.body.email,"name":req.body.name,"slot":req.body.slot,"fac_name":req.body.fac_name},
                (err, result)=> {
                    if (err) throw err;
                    res.send({message:"1 document inserted"});
                    db.close();
                  });
                }
            });
        });
module.exports = register;
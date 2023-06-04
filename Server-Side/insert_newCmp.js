let mongodb = require("mongodb");
let talentsprint = mongodb.MongoClient;

let register  = require("express").Router().post("/",(req,res)=>{
    console.log(req.body.newCmp);
        talentsprint.connect("mongodb://localhost:27017/mockInterv",(err,db)=>
        {
            if(err)
                throw err;
            else{
    db.collection('companies').insertOne({"comp_name":req.body.newCmp},
                (err, result)=> {
                    if (err) throw err;
                    res.send({message:"1 document inserted"});
                    db.close();
                  });
                }
            });
        });
module.exports = register;
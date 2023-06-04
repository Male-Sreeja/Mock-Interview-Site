let mongodb = require("mongodb");
let talentsprint = mongodb.MongoClient;

let register  = require("express").Router().post("/",(req,res)=>{
    console.log(req.body.cmpName);
        talentsprint.connect("mongodb://localhost:27017/mockInterv",(err,db)=>
        {
            if(err)
                throw err;
            else{
    db.collection(req.body.cmpName).insertOne({"rollno":req.body.rollno,"domains":req.body.domains,"questions":req.body.questions,"Sugg":req.body.Sugg},
                (err, result)=> {
                    if (err) throw err;
                    res.send({message:"1 document inserted"});
                    db.close();
                  });
                }
            });
        });
module.exports = register;
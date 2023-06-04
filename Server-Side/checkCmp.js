let mongodb = require("mongodb");
let talentsprint = mongodb.MongoClient;  

let login  = require("express").Router().get("/:newCmp",(req,res)=>{
    console.log(req.params.newCmp);
        talentsprint.connect("mongodb://localhost:27017/mockInterv",(err,db)=>{
            if(err){
                throw err;
            }
            else{
                db.collection("companies").findOne({"comp_name":req.params.newCmp}, 
                (err, result) => {
                    if (err) {
                        throw err;
                    }
                    else{
                            console.log(result);
                            res.send(result);                    
                        }
                });
            }
        });
});
module.exports = login;
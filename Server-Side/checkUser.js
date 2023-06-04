let mongodb = require("mongodb");
let talentsprint = mongodb.MongoClient;  

let login  = require("express").Router().get("/:role/:email",(req,res)=>{
    console.log(req.params.email);
    console.log(req.params.role);
        talentsprint.connect("mongodb://localhost:27017/mockInterv",(err,db)=>{
            if(err){
                throw err;
            }
            else{
                db.collection(req.params.role).findOne({"email":req.params.email}, 
                (err, result) => {
                    if (err) {
                        throw err;
                    }
                    else{
                            // console.log(result);
                            res.send(result);                    
                        }
                });
            }
        });
});
module.exports = login;
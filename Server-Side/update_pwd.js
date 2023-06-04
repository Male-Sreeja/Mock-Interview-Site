let mongodb = require("mongodb");
let talentsprint = mongodb.MongoClient;
let updatePwd  = require("express").Router().put("/:email/:password",(req,res)=>{
		console.log("Inside updatePwd.js: "+req.params.email); 
		talentsprint.connect("mongodb://localhost:27017/mockInterv",(err,db)=>
		{
			if(err)
				throw err;
			else{ 
				console.log("Inside updatePwd.js: "+req.params.password); 
				console.log("Inside update.js bodyPwd: "+req.body.newPwd);              
				var newvalues = { $set: {password:req.body.newPwd} };
				db.collection("student").updateOne({email: req.params.email},newvalues, (err, result)=> {
						if (err) 
						throw err;
						else
						res.send({message:"1 document updated"});
						db.close();
				});
			}
		});
});
	
module.exports = updatePwd;
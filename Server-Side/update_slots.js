let mongodb = require("mongodb");
let talentsprint = mongodb.MongoClient;
let updateSlot  = require("express").Router().put("/:email",(req,res)=>{
		talentsprint.connect("mongodb://localhost:27017/mockInterv",(err,db)=>
		{
			if(err)
				throw err;
			else{           
				var newvalues = { $push: {slots:req.body.slots} };
				db.collection("fac_slots").updateOne({email: req.params.email},newvalues, (err, result)=> {
						if (err) 
						throw err;
						else
						res.send({message:"1 document updated"});
						db.close();
				});
			}
		});
});
	
module.exports = updateSlot;
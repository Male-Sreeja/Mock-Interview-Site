let mongodb = require("mongodb");
let talentsprint = mongodb.MongoClient;
let updateSlot  = require("express").Router().put("/:email/:slot",(req,res)=>{
    var slot_time=req.params.slot;
    console.log(req.params.email);
    console.log(slot_time);
		talentsprint.connect("mongodb://localhost:27017/mockInterv",(err,db)=>
		{
			if(err)
				throw err;
			else{           
				var newvalues ={ $set: {'slots.$.isBooked':true}};
				db.collection("fac_slots").updateOne({email: req.params.email,'slots.datetime':req.params.slot},newvalues ,(err, result)=> {
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
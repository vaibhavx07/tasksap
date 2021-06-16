const fs = require('fs');
const taskform = ["name","notes","assignee","status","due_date"];
const path = require('path')
const filepath = "public/taskdata.json";

function insertData(formdata,next){
	
	fs.readFile(filepath, function (err, data) {
  		let tempdata = JSON.parse(data);
  		let lastid = 0;
  		if(tempdata.length>0){

  			 lastid = Number(tempdata[tempdata.length-1].id)+1
  		}else{
  			 lastid = 1;
  		}
  		formdata.id = lastid;
  		tempdata.push(formdata);
  		fs.writeFile(filepath, JSON.stringify(tempdata), (err, response) => {
  			if(!err){
  				return next(err);
  			}
            next(null,response);
        });
  	});
}

function updatetask(id,fromdata,next){
	fs.readFile(filepath, function (err, data) {
  		let tempdata = JSON.parse(data);
  		let task = tempdata.filter(arr=>arr.id == id);
  		let taskindex = tempdata.findIndex(arr=>arr.id == id);
		tempdata[taskindex] = fromdata;
		fs.writeFile(filepath, JSON.stringify(tempdata), (err, response) => {
  			if(!err){
  				return next(err);
  			}
            res.send({success:true,message:"Task is updated"})
        });
  	});
}

exports.createtask = function(req,res){
	let reqpayload = req.body;
	var reqpayloadarr = Object.keys(reqpayload); 
	console.log('reqpayloadarr',reqpayloadarr,taskform.sort())
	if(JSON.stringify(reqpayloadarr.sort()) == JSON.stringify(taskform.sort())){
		if(req.params.id){
			updatetask(req.params.id,reqpayload,function(err,resp){
				if(!err){
					res.send({success:true,response:resp,message:'Task Updated'});	
				}else{
					res.send({success:false,response:err})
				}
			})
		}else{
			insertData(reqpayload,function(err,successrep){
				if(!err){
					res.send({success:true,response:successrep,message:'Task Created'});	
				}else{
					res.send({success:false,response:err})
				}
			
			})	
		}
		
	}else{
		res.send({success:false,message:"Fields validation error"})
	}
}



exports.takslist = function(req,res){
	fs.readFile(filepath, function (err, data) {
		if(err){
			return res.send({success:false,message:err});
		}
		let tempdata = JSON.parse(data);
		if(req.params.id){
			
			let filterdata = tempdata.filter(arr=>arr.id == req.params.id);
			res.send({success:true,data:filterdata})
		}else{
			res.send({success:true,data:tempdata})
		}
	});
}


exports.deletetask = function(req,res){
	fs.readFile(filepath, function (err, data) {
		if(err){
			return res.send({success:false,message:err});
		}
		let tempdata = JSON.parse(data);
		console.log('tempdata',tempdata,req.params.id)
		if(req.params.id){
			let taskindex = tempdata.findIndex(arr=>arr.id == req.params.id);
			console.log('taskindex',taskindex)
			tempdata.splice(taskindex,1);
			fs.writeFile(filepath, JSON.stringify(tempdata), (err, response) => {
  				if(!err){
  					return res.send({success:true,message:'Task Deleted'})
  				}else{
  					return res.send({success:false,message:err})
  				}
            
        	});
		}else{
			return res.send({success:false,message:'Id is missing'})
		}
	});
}

exports.markdone = function(req,res){
	fs.readFile(filepath, function (err, data) {
		if(err){
			return res.send({success:false,message:err});
		}
		let tempdata = JSON.parse(data);
		if(req.params.id){
			let task = tempdata.filter(arr=>arr.id == req.params.id);
			if(task.due_date<new Date()){
				return res.send({success:false,message:'Task due date reached. Can not be mark done'})
			}

			let taskindex = tempdata.findIndex(arr=>arr.id == req.params.id);
			tempdata[taskindex].status = 1;
			fs.writeFile(filepath, JSON.stringify(tempdata), (err, response) => {
  				if(!err){
  					return next(err);
  				}
            	res.send({success:true,message:"Task is marked done"})
        	});
		}else{
			res.send({success:false,message:'Id is missing'})
		}
	});
}
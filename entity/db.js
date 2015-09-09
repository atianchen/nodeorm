var db = require('mysql');
var mysql = require('mysql');
var Seq = require('seq');
var pool  = null;
exports.initdb=function(options)
{
	pool  = mysql.createPool(options);
};
exports.execute=function(sql,callback,autoclose,connection)
{	
	if (connection)
	{
		connection.query(sql,function(err,res,fields){
				callback(err,res,fields,connection);
			});
			if (autoclose)
			{
				connection.end();
			}
	}
	else
	{
		pool.getConnection(function(err, connection) {
			if (err!=null)
			{
				throw err;
			}
			connection.query(sql,function(err,res,fields){
				callback(err,res,fields,connection);
			});
			if (autoclose)
			{
				connection.end();
			}
		});
	}
};
exports.executeSync=function(sql,callback,autoclose,connection)
{
	Seq()
	.seq(function(){pool.getConnection(this);})
	.seq(function(connection){
		this.vars["connection"] = connection;
		var that = this;
		console.log("execute sql:"+sql);
		connection.query(sql,function(err,res,fields){
			if (err)
			{
				that.vars["exception"]=error
			}
			else
			{
				that.vars["res"] = res;
				that.vars["fields"] = fields;
			}
			that.next();
		});
	}).seq(function(){
		if (this.vars["exception"])
		{
			callback(this.vars["exception"]);
		}
		else
		{
			callback(null,this.vars["res"],this.vars["fields"],this.vars["connection"]);
		}
		if (autoclose)
		{
			this.vars["connection"].end();
		}
		this.next();
	}).catch(function (err) {
		callback(err);
	});
};
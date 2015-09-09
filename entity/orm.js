var db = require('./db.js');
var domain = require('./domain.js');
var utils = require('./utils.js');
var fst = require('fs');
var Seq = require('seq');

function buildInsertSegment(entity,f)
{
	var conf = entity.fields[f];
	if (entity[f])
	{
		if (conf.type=="string")
		{
			return "'"+entity[f]+"'";
		}
		else if (conf.type=="date")
		{
			return "'"+utils.formatDate(entity[f])+"'";
		}
		else
		{
			return entity[f];
		}
	}
	else
	{
		return "null";
	}
}
exports.insert = function(entity,callback)
{
	var fl = null;
	var vl = null;
	var fs = entity.fields;
	for (var f in fs )
	{
		if (fs[f].ai)
		{
			continue;
		}
		fl = (fl!=null)?fl+","+f:f;
		if (entity[f])
		{
			vl = (vl!=null)?vl+","+buildInsertSegment(entity,f):buildInsertSegment(entity,f);
		}
		else
		{
			vl = (vl!=null)?vl+",null":"null";
		}
	}
	var sql = "insert into "+entity.getTableName()+" ("+fl+") values ("+vl+")";
	

	db.executeSync(sql,function(err,res,fields,connection){
		if (err)
		{
			callback(err,entity);
		}
		else
		{
			entity.id = res["insertId"];
			callback(err,entity);
		}
		
	},true,null);


};
exports.get=function(cls,id,callback)
{
	var entity = eval("new domain."+cls+"()");
	db.executeSync("select * from "+entity.getTableName()+" where id="+id,function(err,res,fields,connection){
		if (err)
		{
			callback(err,null);
		}
		else
		{
			if (res.length<1)
			{
				callback(new Error("Not Found Special "+cls+" Object"),null);
			}
			else
			{
				
				var rs = res[0];
				var fs = entity.fields;
				for (var f in fs )
				{
					entity[f] = rs[f];
				}
				callback(null,entity);
			}
		}
	},true,null);
};
exports.update=function(entity)
{

};
exports.query = function(sql)
{
};
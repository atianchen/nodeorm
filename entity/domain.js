var builder = require('./builder.js');
function baseObj()
{
	this.className="baseObj";
}
/**∑µªÿ¿‡√˚**/
baseObj.prototype.getClassName=function(){return this.className;}
baseObj.prototype.getTableName=function(){return this.tableName;}
function user()
{
	this.className = "user";
	this.tableName = "user";
	this.fields={
		id:{type:"int",ai:true},
		name:{type:"string",len:200},
		createTime:{type:"date"}
	};
}
builder.extend(user,baseObj);
exports.user = user;

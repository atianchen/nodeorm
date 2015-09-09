var mysql = require('mysql');
var domain = require('./entity/domain');
var db = require('./entity/db.js');
var orm = require('./entity/orm');

db.initdb({  
    host: '192.168.0.119',  
    port: 3306,  
    user: 'db2inst1',  
    password: '1',  
    database: 'treesensor_new'  
});
orm.get("user",8,function(err,entity){console.log(err+":"+entity.name);})
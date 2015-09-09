
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var domain = require('./entity/domain');
var db = require('./entity/db.js');
var orm = require('./entity/orm');
var http = require('http');
var path = require('path');

var app = express();
db.initdb({  
    host: '192.168.0.119',  
    port: 3306,  
    user: 'db2inst1',  
    password: '12',  
    database: 'treesensor_new'  
});
var u = new domain.user();
u.name="chenzhi";
u.createTime=new Date();
orm.insert(u,function(err,u){console.log(u.id);});

//var u =eval("new domain.user()");
//console.log(u.getTableName());
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

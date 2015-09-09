
/*
 * GET home page.
 */
var utils = require('./');
exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};
exports.user = function()
{
	this.id = utils.prompt();;
};
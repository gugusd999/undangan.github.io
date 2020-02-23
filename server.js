var liveServer = require('live-server');

var param = {
	port : 8000,
	host : '0.0.0.0',
	root : 'www/',
	open : true,
	ignore : 'scss.my/templates',
	file : 'index.html',
	wait : 100,
	mount : [['/components', './node_modules']],
	logLevel : 2,
	middleware: [function(req, res, next) { next() }]
};

if (liveServer.start(param)) {
	console.log("live server run");	
}

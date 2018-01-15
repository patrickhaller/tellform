'use strict';

var config = require('../../config/config');
var url = require('url');

/**cd
 * Module dependencies.
 */
exports.index = function(req, res) {
	res.render('index', {
		user: req.user || null,
		request: req
	});
};

exports.form = function(req, res) {
	
	//Allow form to be embedded
	res.removeHeader('X-Frame-Options');
	
	console.log('XXX req is ' + req.url );
	var urlPath = url.parse(req.url).path.split('/');
	var idx =  urlPath.indexOf('meeps');
	/* if (idx !== -1) { 
		urlPath.splice(idx, 1);
		req.url = urlPath.join('/');
		console.log('-> req is ' + req.url);
	}
	*/

	res.render('form', {
		user: req.user || null,
		request: req
	});
};


exports.redoc = function(req, res) {
	res.render('redoc', {
		request: req
	});
};


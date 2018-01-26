'use strict';

/**
 * Module dependencies.
 */
var forms = require('../../app/controllers/forms.server.controller'),
	config = require('../../config/config'),
	core = require('../../app/controllers/core.server.controller');

module.exports = function(app) {
	// Core routing
	app.route(config.urlPrefix)
		.get(core.index);

	app.route('/subdomain/api/')
		.get(core.redoc);
};


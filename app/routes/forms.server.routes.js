'use strict';

/**
 * Module dependencies.
 */
var forms = require('../../app/controllers/forms.server.controller'),
	auth = require('../../config/passport_helpers'),
	config = require('../../config/config'),
	core = require('../../app/controllers/core.server.controller');

module.exports = function(app) {
	// Form Routes
	if(!config.subdomainsDisabled) {
		app.route('/subdomain/:userSubdomain((?!api$)[A-Za-z0-9]+)/')
		 .get(core.form);

		app.route('/subdomain/:userSubdomain((?!api$)[A-Za-z0-9]+)/forms/([a-zA-Z0-9]+)')
		 .post(forms.createSubmission);

		app.route('/subdomain/:userSubdomain((?!api$)[A-Za-z0-9]+)/forms/:formIdFast([a-zA-Z0-9]+)/render')
		 .get(forms.readForRender);

		app.route('/forms/:formId([a-zA-Z0-9]+)/render')
			.get(auth.isAuthenticatedOrApiKey, forms.hasAuthorization, forms.readForRender);
	} else {
		app.route(config.urlPrefix + '/forms/:formIdFast([a-zA-Z0-9]+)/render')
			.get(forms.readForRender);

		app.route(config.urlPrefix + '/view/')
		 	.get(core.form);
	}

   	app.route(config.urlPrefix+'/forms/:formIdFast([a-zA-Z0-9]+)')
        .post(forms.createSubmission);
	
	app.route(config.urlPrefix+'/forms')
		.get(auth.isAuthenticatedOrApiKey, forms.list)
		.post(auth.isAuthenticatedOrApiKey, forms.create);

	app.route(config.urlPrefix+'/forms/:formId([a-zA-Z0-9]+)')
		.get(forms.read)
		.put(auth.isAuthenticatedOrApiKey, forms.hasAuthorization, forms.update)
		.delete(auth.isAuthenticatedOrApiKey, forms.hasAuthorization, forms.delete);

	app.route(config.urlPrefix+'/forms/:formId([a-zA-Z0-9]+)/submissions')
		.get(auth.isAuthenticatedOrApiKey, forms.hasAuthorization, forms.listSubmissions)
		.put(forms.createSubmission)
		.delete(auth.isAuthenticatedOrApiKey, forms.hasAuthorization, forms.deleteSubmissions);

	app.route(config.urlPrefix+'/forms/:formId([a-zA-Z0-9]+)/visitors')
		.get(auth.isAuthenticatedOrApiKey, forms.hasAuthorization, forms.addVisitor);

	// Slower formId middleware
	app.param('formId', forms.formByID);

	// Fast formId middleware
	app.param('formIdFast', forms.formByIDFast);

};

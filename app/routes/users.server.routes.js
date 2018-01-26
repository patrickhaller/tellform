'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport'),
	config = require('../../config/config'),
	auth = require('../../config/passport_helpers');

module.exports = function(app) {
	// User Routes
	var users = require('../../app/controllers/users.server.controller');
	
	// Setting up the users profile api
	app.route(config.urlPrefix+'/users/me').get(auth.isAuthenticatedOrApiKey, users.getUser);
	app.route(config.urlPrefix+'/users').put(auth.isAuthenticatedOrApiKey, users.update);

	// Setting up the users account verification api
	app.route(config.urlPrefix+'/auth/verify/:token').get(users.validateVerificationToken);
	app.route(config.urlPrefix+'/auth/verify').post(users.resendVerificationEmail);

	// Setting up the users password api
	app.route(config.urlPrefix+'/users/password').post(users.requiresLogin, users.changePassword);
	app.route(config.urlPrefix+'/auth/forgot').post(users.forgot);
	app.route(config.urlPrefix+'/auth/reset/:token').get(users.validateResetToken);
	app.route(config.urlPrefix+'/auth/reset/:token').post(users.reset);

	// Setting up the users authentication api
	if(!config.signupDisabled) {
        app.route(config.urlPrefix+'/auth/signup').post(users.signup);
	}
        app.route(config.urlPrefix+'/auth/signin_make_user').post(users.signin_make_user);
        app.route(config.urlPrefix+'/auth/signin_session').post(users.signin_session);
        app.route(config.urlPrefix+'/auth/signin').post(users.signin);
	app.route(config.urlPrefix+'/auth/signout').get(users.signout);

	app.route(config.urlPrefix+'/auth/genkey').get(users.requiresLogin, users.generateAPIKey);
	
	// Finish by binding the user middleware
	app.param('userId', users.userByID);
};

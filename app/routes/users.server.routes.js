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
	var config_base = '/meeps/';
	
	// Setting up the users profile api
	app.route(config_base+'users/me').get(auth.isAuthenticatedOrApiKey, users.getUser);
	app.route(config_base+'users').put(auth.isAuthenticatedOrApiKey, users.update);

	// Setting up the users account verification api
	app.route(config_base+'auth/verify/:token').get(users.validateVerificationToken);
	app.route(config_base+'auth/verify').post(users.resendVerificationEmail);

	// Setting up the users password api
	app.route(config_base+'users/password').post(users.requiresLogin, users.changePassword);
	app.route(config_base+'auth/forgot').post(users.forgot);
	app.route(config_base+'auth/reset/:token').get(users.validateResetToken);
	app.route(config_base+'auth/reset/:token').post(users.reset);

	// Setting up the users authentication api
	if(!config.signupDisabled) {
        app.route(config_base+'auth/signup').post(users.signup);
	}
        app.route(config_base+'auth/signin').post(users.signin);
	app.route(config_base+'auth/signout').get(users.signout);

	app.route(config_base+'auth/genkey').get(users.requiresLogin, users.generateAPIKey);
	
	// Finish by binding the user middleware
	app.param('userId', users.userByID);
};

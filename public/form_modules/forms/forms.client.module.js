'use strict';

// Use Application configuration module to register a new module
ApplicationConfiguration.registerModule('view-form', [
	'ngFileUpload', 'ui.date', 'angular-input-stars'
]);

angular.module('view-form').constant('URL_PREFIX', '/surveys');
angular.module('view-form').constant('VIEW_FORM_URL', '/surveys/forms/:formId/render'); 

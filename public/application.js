'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider',
	function($locationProvider) {
		$locationProvider.html5Mode(false).hashPrefix('!');
	}
]);

angular.module(ApplicationConfiguration.applicationModuleName).config(['$compileProvider', function ($compileProvider) {
  $compileProvider.debugInfoEnabled(true);
}]);

angular.module(ApplicationConfiguration.applicationModuleName).config(['$logProvider', function ($logProvider) {
  $logProvider.debugEnabled(true);
}]);

//Permission Constants
angular.module(ApplicationConfiguration.applicationModuleName).constant('APP_PERMISSIONS', {
  viewAdminSettings: 'viewAdminSettings',
  editAdminSettings: 'editAdminSettings',
  editForm: 'editForm',
  viewPrivateForm: 'viewPrivateForm'
});

//User Role constants
angular.module(ApplicationConfiguration.applicationModuleName).constant('USER_ROLES', {
  admin: 'admin',
  normal: 'user',
  superuser: 'superuser'
});

//form url
angular.module(ApplicationConfiguration.applicationModuleName).constant('URL_PREFIX', '/surveys');
angular.module(ApplicationConfiguration.applicationModuleName).constant('FORM_URL', '/surveys/forms/:formId');

angular.module(ApplicationConfiguration.applicationModuleName).run([
  '$rootScope', 'URL_PREFIX',
  function($rootScope, URL_PREFIX) {
    $rootScope.URL_PREFIX = URL_PREFIX;
  }
]);

/*
angular.module(ApplicationConfiguration.applicationModuleName).config(['$logProvider', 
  function($logProvider){
    $logProvider.debugEnabled(true);
}]);

angular.module(ApplicationConfiguration.applicationModuleName).run([
  '$rootScope', 
  function($rootScope) {
    $rootScope.$on('$locationChangeStart', function(event, newUrl, oldUrl) {
      // both newUrl and oldUrl are strings
      console.log('Location: Starting to leave %s to go to %s', oldUrl, newUrl);
    });
    // see what's going on when the route tries to change
    $rootScope.$on('$routeChangeStart', function(event, next, current) {
      // next is an object that is the route that we are starting to go to
      // current is an object that is the route where we are currently
      var currentPath = current.originalPath;
      var nextPath = next.originalPath;

      console.log('Route: Starting to leave %s to go to %s', currentPath, nextPath);
    });
  }
]);
*/

//Then define the init function for starting up the application
angular.element(document).ready(function() {
	//Fixing facebook bug with redirect
	if (window.location.hash === '#_=_') window.location.hash = '#!';

	//Then init the app
	angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});

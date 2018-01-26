'use strict';

// Config HTTP Error Handling
angular.module('users').config(['$httpProvider', 'URL_PREFIX',
	function($httpProvider, URL_PREFIX) {
    $httpProvider.interceptors.push(function($q, $location) {
      return {
        responseError: function(response) {
          if( $location.path() !== URL_PREFIX + '/users/me' && response.config){
            if(response.config.url !== URL_PREFIX + '/users/me'){
              if (response.status === 401) {
                // save the current location so that login can redirect back
                $location.nextAfterLogin = $location.path();
                $location.path('/signin');
              }else if(response.status === 403){
                $location.path('/access_denied');
              }
            }

          }
          return $q.reject(response);
        }
      };
    });
}]);

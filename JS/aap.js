var app = angular.module('WebApp', ['ui.router','ui.bootstrap']);

app.run(['$rootScope', '$location', '$interval', '$timeout', 
	       function ($rootScope, $location, $interval, $timeout) {
}]);

app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
            function($stateProvider, $urlRouterProvider, $httpProvider) {

	if (!$httpProvider.defaults.headers.common) {
        $httpProvider.defaults.headers.common = {};
    }
    $httpProvider.defaults.headers.common["Cache-Control"] = "no-cache, no-store, must-revalidate";
    $httpProvider.defaults.headers.common['Pragma'] = 'no-cache';
    $httpProvider.defaults.headers.common["If-Modified-Since"] = "0";
    $httpProvider.defaults.headers.common['Expires'] = -1; 

	$urlRouterProvider.otherwise("/");
	$stateProvider.state('disclaimer', {
		url: "/",
        templateUrl: 'views/login.html' 
	}).state('welcome', {
		templateUrl: 'views/welcome.html'
	}).state('pin', {
		templateUrl: 'views/pin.html'
	}).state('faceScan', {
        templateUrl: 'views/FaceScan.html' 
	})
}]);

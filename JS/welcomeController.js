app.controller("welcomeController", ['$scope','$rootScope', '$state',function($scope, $rootScope,$state) {
	
	$scope.welcome = {};
	$scope.welcome.show = true;
	$scope.welcome.name = $rootScope.name;
	$scope.goToTansac = function(){
		$scope.welcome.show = false;
	}
	$scope.scanFace = function(){
		$scope.welcome.show = false;
		$rootScope.mob = $scope.welcome.mobileNumber;
		$state.go('faceScan');
	}
	
	$scope.goBack = function(){
		$rootScope.mob = null;
		$scope.welcome.show = true;
	}
	
	
	
}]);
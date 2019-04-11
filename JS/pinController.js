app.controller("pinController", ['$scope', '$state','$http','$rootScope',function($scope, $state, $http,$rootScope) {
	
	$scope.pinData = {};
	
	$scope.closeDialog = function() {
		$scope.pinData.error = false;
		$scope.pinData.errorMsg = "";
   	};
   	
	$scope.cancel = function(){
		$state.go('welcome');
	}
	
	$scope.validatePin = function(){
		var data = {
			"mobile" :$rootScope.mob,
			"passcode":$scope.pinData.pin,
			"amount":$scope.pinData.amount
		};
		$http.post('http://BLR1-LTJHHMQN2:4344/frsEngine/veifyPin',JSON.stringify(data)).then(function (response) {
			if(response.data.success_status){
				$scope.face.success = true;
				$scope.face.successMsg = "Amount has been debitted successfully !!";
			} else {
				$scope.face.error = true;
				$scope.face.errorMsg = "Unable to process your request. Please try after sometime !!";
			}
		})
	}
	
	
}]);
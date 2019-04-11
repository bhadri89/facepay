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
		$.ajax({
            method:"POST",
            url:$rootScope.urlFirstpart+"/veifyPin",
            data:data,
            contentType:"application/json;charset=UTF-8"
    	}).done(function(response) {
			if(response.data.success){
				$scope.face.success = true;
				$scope.face.successMsg = "Amount has been debitted successfully !!";
			} else {
				$scope.face.error = true;
				$scope.face.errorMsg = "Unable to process your request. Please try after sometime !!";
			}
		})
	}
	
	
}]);
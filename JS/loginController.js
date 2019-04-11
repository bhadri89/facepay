app.controller("loginController", ['$scope', '$state','$http','$rootScope',function($scope, $state,$http,$rootScope) {
	$scope.user = {};
	$scope.user.autherror = "";
	$scope.user.authenticationError = false;
	$rootScope.urlFirstpart = 'http://BLR1-LTJHHMQN2:4344/frsEngine'
	$scope.submitForLogin = function(){
		$scope.user.autherror = "";
		$scope.user.authenticationError = false;
		$.ajax({
            method:"POST",
            url:$rootScope.urlFirstpart+'/merchent/login',
            data:JSON.stringify({
				"user_id" : $scope.user.userName,
				"pwd" : $scope.user.password
			}),
            contentType:"application/json;charset=UTF-8"
    	}).done(function(response) {
			if(response.success_status){
				$scope.user.user_id = response.user_id;
        			$scope.user.business_name = response.business_name;
        			$scope.user.owner_name = response.owner_name;
        			$scope.user.bank_acc = response.bank_acc;
        			$rootScope.name =  $scope.user.owner_name;
				$state.go('welcome');
			} else {
				$scope.user.autherror = "Invalid User ID or Password";
				$scope.user.authenticationError = true;
			}
		})
		
	} 
	
	$scope.closeDialog = function() {
		$scope.user.autherror = "";
		$scope.user.authenticationError = false;
   	};
	
}]);
				

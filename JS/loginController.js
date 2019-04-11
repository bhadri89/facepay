app.controller("loginController", ['$scope', '$state','$http','$rootScope',function($scope, $state,$http,$rootScope) {
	$scope.user = {};
	$scope.user.autherror = "";
	$scope.user.authenticationError = false;
	$rootScope.urlFirstpart = 'http://BLR1-LTJHHMQN2:4344/frsEngine'
	$scope.submitForLogin = function(){
		$scope.user.autherror = "";
		$scope.user.authenticationError = false;
		var data = {
				"user_id" : $scope.user.userName,
				"pwd" : $scope.user.password
			};
		$.ajax({
            method:"POST",
            url:$rootScope.urlFirstpart+'/merchent/login',
            data:data,
            contentType:"application/json;charset=UTF-8"
    	}).done(function(response) {
			if(response.data.success_status){
				$scope.user.user_id = response.data.user_id;
        		$scope.user.business_name = response.data.business_name;
        		$scope.user.owner_name = response.data.owner_name;
        		$scope.user.bank_acc = response.data.bank_acc;
        		$rootScope.name =  $scope.user.owner_name;
			} else {
				$scope.user.autherror = "Invalid User ID or Password";
				$scope.user.authenticationError = false;
			}
		})
		
	} 
	
	$scope.closeDialog = function() {
		$scope.user.autherror = "";
		$scope.user.authenticationError = false;
   	};
	
}]);
				

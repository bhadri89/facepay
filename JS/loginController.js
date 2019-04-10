app.controller("loginController", ['$scope', '$state','$http',function($scope, $state,$http) {
	$scope.user = {};
	$scope.user.autherror = "";
	$scope.user.authenticationError = false;
	$scope.submitForLogin = function(){
		$scope.user.autherror = "";
		$scope.user.authenticationError = false;
		var data = {
				"user_id" : $scope.user.userName,
				"pwd" : $scope.user.password
		}
		$http.post('http://BLR1-LTJHHMQN2:4344/frsEngine/merchent/login',data).then(function (response) {
			if(response.success){
			 	$scope.user.user_id = response.user_id;
        		$scope.user.business_name = response.business_name;
        		$scope.user.owner_name = response.owner_name;
        		$scope.user.bank_acc = response.bank_acc;
			} else {
				$scope.user.autherror = "Invalid User ID or Password";
				$scope.user.authenticationError = false;
			}
		})
		/*if($scope.user.userName === "2" && $scope.user.password === "1"){
			$state.go('welcome');
		} else {
			$scope.user.authenticationError = true;
			$scope.user.autherror = "Invalid Username or Password";
		}*/
	} 
	
	$scope.closeDialog = function() {
		$scope.user.autherror = "";
		$scope.user.authenticationError = false;
   	};
	
}]);
				
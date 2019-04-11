app.controller("loginController", ['$scope', '$state','$http','$rootScope',function($scope, $state,$http,$rootScope) {
	$scope.user = {};
	$scope.user.autherror = "";
	$scope.user.authenticationError = false;
	$scope.submitForLogin = function(){
		$scope.user.autherror = "";
		$scope.user.authenticationError = false;
		var myMap = new Map();
        myMap.set('user_id', $scope.user.userName);
        myMap.set('pwd', $scope.user.password);
		$http.post('http://BLR1-LTJHHMQN2:4344/frsEngine/merchent/login',myMap).then(function (response) {
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
				

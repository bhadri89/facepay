app.controller("accSummaryController", ['$scope','$rootScope','$state',
                                        function($scope,$rootScope,$state) {
	$scope.cancel = function() {
		$scope.showResultSection = false;
		$state.go('welcome');
	}

	$scope.model = {};
	$scope.stItemsByPageCount = 10;
	var tranSearchCriteria = [];
	$scope.showError = false;
	var fromDt;
	var toDt;
	/*tranSearchCriteria = {
			accountNumber : enc_acct_num,
			accountType : $scope.model.accountTypeModel,
			fromAmount : null,
			fromDate : fromDt,
			toDate : toDt,
			type : null,
			totalrows : "10",
			beginValue : "1",
			cacheKey : "SEARCH_TRANSACTION",
			printRoutine : "true",
			stmtType : radioType
	};*/
	$scope.urlToSend = "http://10.74.212.59:8313/WebClientRest/public/accountTranList/" + $rootScope.bank_acc;
	$.ajax({
		url :$scope.urlToSend,
		type : "GET",
		headers : {
			'Authorization': 'Basic MTp4eHg=',
			 'Content-type' : 'application/json'
		}       
         
	}).done(function(response) {

		if (!response.acctTranList
				|| response.acctTranList.length == 0) {
			$scope.showError = true;
			$scope.showTable = false;
		} else {
			$scope.showTable = true;
			$scope.showError = false;
			$scope.tranDataSafeSrc = response.transaclist;
			$scope.displaytranData = []
			.concat(response.transaclist);
		}
	});
	
}]);
app.controller("faceScanController", ['$scope', '$state','$http','$rootScope',function($scope, $state, $http,$rootScope) {
	
	$scope.face = {};
	$scope.face.error = false;
	$scope.face.errorMsg = "";
	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d');
	var video = document.getElementById('video');
	var dataURL = null;
	
	$scope.showStartCam = false;
	$scope.showSnap = true;
	$scope.showSubmit = true;
	
	$scope.startScan = function(){
		$scope.showStartCam = true;
		$scope.showSnap = false;
		// Get access to the camera!
		if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
		    // Not adding `{ audio: true }` since we only want video now
		    navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
		        //video.src = window.URL.createObjectURL(stream);
		        video.srcObject = stream;
		        video.play();
		    });
		}
	}
	
	$scope.takeSnap = function(){
		$scope.showStartCam = false;
		$scope.showSnap = true;
		$scope.showSubmit = false;
	}
		document.getElementById("snap").addEventListener("click", function() {
			context.drawImage(video, 0, 0, 300, 200);
			dataURL = canvas.toDataURL('image/jpeg');
			console.log(dataURL);
		});
	
	$scope.sendData = function(){
		$scope.face.error = false;
		$scope.face.errorMsg = "";
		var randNum = Math.floor((Math.random() * 10000)+1);
		file = "Pic" + randNum + ".jpg";
		var data = {
			"mobile" : $rootScope.mob,
			"imgdata" : dataURL,
			"fileName" : file
		};
		//$state.go('pin');
		$http.post('http://BLR1-LTJHHMQN2:4344/frsEngine/veifyImage',data).then(function (response) {
			if(response.success){
				$state.go('pin');
			} else {
				$scope.face.error = true;
				$scope.face.errorMsg = response.desciption;
			}
		})
		
	}
	$scope.closeDialog = function() {
		$scope.face.error = false;
		$scope.face.errorMsg = "";
   	};
	
	
}]);
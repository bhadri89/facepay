app.controller("faceScanController", ['$scope', '$state','$http','$rootScope',function($scope, $state, $http,$rootScope) {
	
	$scope.face = {};
	$scope.face.error = false;
	$scope.face.errorMsg = "";
	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d');
	var video = document.getElementById('video');
	var intArray = null;
	
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
			dataURL = canvas.toDataURL();
			dataURI = dataURL.split(',');
			var type = dataURI[0].split(':')[1].split(';')[0],
			byteString = atob(dataURI[1]),
		byteStringLength = byteString.length,
        arrayBuffer = new ArrayBuffer(byteStringLength),
        intArray = new Uint8Array(arrayBuffer);
		for (var i = 0; i < byteStringLength; i++) {
			intArray[i] = byteString.charCodeAt(i);
		}
		});
	
	$scope.sendData = function(){
		$scope.face.error = false;
		$scope.face.errorMsg = "";
		var randNum = Math.floor((Math.random() * 10000)+1);
		file = "Pic" + randNum + ".jpg";
		$.ajax({
            method:"POST",
            url:$rootScope.urlFirstpart+"/veifyImage",
            data:JSON.stringify({"mobile" : $rootScope.mob,"imgdata" : intArray,"fileName" : file}),
            contentType:"application/json;charset=UTF-8"
    	}).done(function(response) {
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

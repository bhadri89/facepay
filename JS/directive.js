'use strict';

app.directive('numbersOnly', function() {
	return {
		require : 'ngModel',
		scope: {
			options: '@numbersOnly'
		},
		link : function(scope, element, attrs, ngModelCtrl) {
			var options = {};
			if (scope.options != null) {
				options = scope.$eval(scope.options);
			} 
			ngModelCtrl.$parsers.push(function(val) {
				if (angular.isUndefined(val)) {
					val = '';
				}
				var clean = val.replace(/[^0-9]/g, '');
				if(angular.isDefined(options)) {
					clean = clean.slice(0, options.length != null ? options.length : clean.length);
					if(!ngModelCtrl.$isEmpty(clean)) {
						if (options.length !== null && clean.length !== options.length) {
							ngModelCtrl.$setValidity('length', false);
						} else {
							ngModelCtrl.$setValidity('length', true);
						}
					}
				}
				if (val !== clean) {
					ngModelCtrl.$setViewValue(clean);
					ngModelCtrl.$render();
				}	
				return clean;
			});

			element.bind('keypress', function(event) {
				if (event.keyCode === 32) {
					event.preventDefault();
				}
			});
		}
	};
});

/*
To format input data as indian currency with min and max validations
eg 1: data-currency-format="{ }" - with out options
eg 1: data-currency-format="{max: 500000, min: 1, maxDecimals: 2,maxlength:15}" - with all options
*/
app.directive('currencyFormat', function() {
	function isNumber(val) {
		return !isNaN(parseFloat(val)) && isFinite(val);
	}
	function addCommasToInteger(val) {
		var commas, decimals, wholeNumbers;
		if (angular.isUndefined(val) || !isNumber(val)) {
			return null;
		}
		decimals = val.indexOf('.') === -1 ? '.00' : val.replace(/^\d+(?=\.)/,'') === '.' ? '.00' : val.replace(/^\d+(?=\.)/, '');
		wholeNumbers = val.replace(/(\.\d+)$/, '').indexOf('.') !== -1 ? val.substring(0, val.length - 1) : val.replace(/(\.\d+)$/, '');
		wholeNumbers = wholeNumbers.replace(/^0+/, '');
		if(wholeNumbers.length === 0) {
			wholeNumbers = '0';
		}
		commas = wholeNumbers.replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
		return "" + commas + decimals;
	}
	return {
		restrict : 'A',
		require : 'ngModel',
		scope : {
			options : '@currencyFormat'
		},
		link : function(scope, elem, attrs, ngModelCtrl) {
			var options = {};
			
			scope.$watch(function() {
				options = scope.$eval(scope.options);
			    });
			
			ngModelCtrl.$parsers.push(function(val) {
				if (angular.isUndefined(val) || !isNumber(val)) {
					if(val.substr(0, 1) !== '₹'){
						val = '';
						ngModelCtrl.$setViewValue(val);
						ngModelCtrl.$render();
					}
				}
				var clean = val.replace(/[^0-9\.]/g, '');
				var decimalCheck = clean.split('.');

				if (!angular.isUndefined(decimalCheck[1])) {
					decimalCheck[1] = decimalCheck[1].slice(0, options.maxDecimals != null ? options.maxDecimals : 2); // options.maxDecimals
					clean = decimalCheck[0] + '.' + decimalCheck[1];
				}
				if (val !== clean) {
					ngModelCtrl.$setViewValue(clean);
					//ngModelCtrl.$render();
				}
				if(clean === '.') {
					clean = '0';
				}
				var maxlength = options.maxlength != null ? options.maxlength : 15; // options.maxlength
				if(angular.isUndefined(decimalCheck[1])) { //length value calculated with . + 2 decimal if decimals not defined
					maxlength = maxlength - 3;
				}
				var number = Number(clean);
				if ((number.toString().length > maxlength) || (options.max != null && number > options.max)) {
					ngModelCtrl.$setValidity('max', false);
					ngModelCtrl.$setValidity('min', true);
				} else if (options.min != null && number < options.min) {
					ngModelCtrl.$setValidity('min', false);
					ngModelCtrl.$setValidity('max', true);
				} else {
					ngModelCtrl.$setValidity('max', true);
					ngModelCtrl.$setValidity('min', true);
				}
				return clean;
			});

			ngModelCtrl.$formatters.push(function(val) {
				if ((options.nullDisplay != null) && (!val || val === '')) {
					return options.nullDisplay;
				}
				if (val == null) {
					return val;
				}
				val = addCommasToInteger(val.toString());
				if (val != null) {
					val = '₹' + val; // appending the currency symbol
				}
				return val;
			});

			elem.on('blur', function() {
				var formatter, viewValue, _i, _len, _ref;
				viewValue = ngModelCtrl.$modelValue;
				if (viewValue == null) {
					return;
				}
				_ref = ngModelCtrl.$formatters;
				for (_i = 0, _len = _ref.length; _i < _len; _i++) {
					formatter = _ref[_i];
					viewValue = formatter(viewValue);
				}
				ngModelCtrl.$viewValue = viewValue;
				return ngModelCtrl.$render();
			});

			elem.on('focus', function() {
				var val;
				val = elem.val();
				if (options.prepend != null) {
					val = val.replace(options.prepend, '');
				}
				if (options.append != null) {
					val = val.replace(options.append, '');
				}
				elem.val(val.replace(/,/g, ''));
				return elem[0].select();
			});

			elem.bind('keypress', function(event) {
				if (event.keyCode === 32) {
					event.preventDefault();
				}
			});
		}
	};
});

app.directive('formElementFocus', function () {
    return {
        restrict: 'A',
        link: function (scope, elem) {

            // set up event handler on the form element
            elem.on('submit', function () {

                // find the first invalid element
                var firstInvalid = elem[0].querySelector('.ng-invalid-required');

                // if we find one, set focus
                if (firstInvalid) {
                    firstInvalid.focus();
                }
            });
        }
    };
});

app.directive("formOnChange", ['$parse', function($parse){
	  return {
	    require: "form",
	    link: function(scope, element, attrs){
	       var cb = $parse(attrs.formOnChange);
	       element.on("change", function(){
	          cb(scope);
	       });
	    }
	  }
}]);


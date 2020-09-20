var app = angular.module('kywd', []);

app.controller('MainCtrl', function($scope,$timeout) {
	$scope.name = '';
	$scope.prefix = '';
	$scope.output=''
	$scope.$watch('[name,prefix]', function() {
        $scope.output = TextDefine($scope.prefix.toLowerCase().replace(/[^a-zA-Z0-9_]/g,'_'),$scope.name.toLowerCase().replace(/[^a-zA-Z0-9_\r\n]/g,'_'));
	});
});

function TextDefine(prefix,val) {
	if(!(prefix && val))
		return "";
	var i = 0;
	var array1 = val.split("\n");
	for (i = 0; i < array1.length; i++) {
		array1[i] = (prefix +'_'+ array1[i]).trim();
	}
	return array1.join("\n");
}
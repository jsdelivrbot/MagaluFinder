//Execução do AngularJS no div
var magaluFinder = angular.module('MagaluFinder', []);

//magaluFinder.controller('geoCode', ['$scope', '$http', function($scope, $http)
magaluFinder.controller('geoCode', ['$scope','$http', function($scope,$http) {
	$scope.myFunc = function(){
		var endereco = (document.getElementById("Endereco").value)+' ' +(document.getElementById("Cidade").value)
		$scope.json;
		
		var baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address='+endereco+',+CA&key=AIzaSyDRrW9xU9wXRS67yz-vGYPihbn2cUDsGhg';
		$http.get(baseUrl).then(function(response) {
		$scope.json = response.data;

		}, function(err) {
		console.log(err);
		});
	} 
}]);




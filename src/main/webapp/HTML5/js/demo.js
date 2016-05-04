

var app = angular.module('indexdb',[]);
app.controller('IndexdbController', ctrlFactory);
ctrlFactory.$inject = ['$scope','$templateCache','$log'];
//ctrl
function ctrlFactory ($scope,$templateCache,$log) {
  $scope.word = 'Hello!';
  var tmp = '<tr><td >	<span ng-bind="r.id"></span> </td>	<td > <span ng-bind="r.name"></span> </td> <td > <a href="#"><span ng-bind="r.email"></span></a> </td></tr>';
  $templateCache.put('tableContent.html',tmp);
  $templateCache.put('templateTest.html','<p> Here is template </p>');
  
  $scope.header = [{
  	text:"id"
  },
  {
  	text:"name"
  },
  {
  	text:"email"
  }];

  $scope.datasource = [];
  $scope.datasource.push({id:1 , name:'test1' , email:'test1@gmail.com'});
  $scope.datasource.push({id:2 , name:'test2' , email:'test1@gmail.com'});
  $log.log($scope.datasource);

};
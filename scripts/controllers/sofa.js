'use strict';

angular.module('mainApp')
    .controller('SofaCtrl', ['$scope', '$http', function ($scope, $http) {
        $http.get('product.json').success(function(response){
            console.log(response);
        }).error(function(){
            
        });
    }]);

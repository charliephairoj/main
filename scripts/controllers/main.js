'use strict';

angular.module('mainApp')
    .controller('MainCtrl', ['$scope', '$http', 'background', function ($scope, $http, background) {
        $http.get('home.json').success(function(response){
            console.log(response);
            background.loadImages(response);
            background.start();
        });
        
        $scope.$on('$destroy', function(){
            background.stop();
            $scope.$emit('deconstruction-complete');
        })
    }]);

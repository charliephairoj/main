'use strict';

angular.module('mainApp')
    .controller('ShowroomCtrl', ['$scope', '$http', 'background', function ($scope, $http, background) {
        $http.get('showroom.json').success(function(response){
            background.loadImages(response);
            background.onInitialTransition = function(){
                $scope.modal.fadeIn();
            }
            background.start();
        });
        
        $scope.$on('$destroy', function(){
            background.stop();
            $scope.modal.fadeOut(function(){
                $scope.$apply(function(){
                    $scope.$emit('deconstruction-complete');
                });
            }); 
        });
    }]);

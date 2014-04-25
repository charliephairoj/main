'use strict';

angular.module('mainApp')
    .controller('DesignCtrl', ['$scope', '$timeout', function ($scope, $timeout) {
        console.log($scope);
        $timeout(function(){
            $scope.modal.fadeIn();
        }, 500);
        
        $scope.$on('$destroy', function(){
            $scope.modal.fadeOut(function(){
                $scope.$apply(function(){
                    $scope.$emit('deconstruction-complete');
                });
            }); 
        });
    }]);

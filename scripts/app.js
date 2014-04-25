'use strict';

angular.module('mainApp.services', []);
angular.module('mainApp.directives', []);
angular.module('mainApp', ['mainApp.services', 'mainApp.directives', 'ngRoute'])
    .config(['$routeProvider', function ($routeProvider, $rootScope, $q) {
        var delay = function($rootScope, $q){
            var deferred = $q.defer();
            if(!window.pageMarker){
                deferred.resolve();
                window.pageMarker = true;
            }else{
                $rootScope.$on('deconstruction-complete', function(val){
                    deferred.resolve();
                });
                
                $rootScope.$broadcast('$destroy');
            }
            
            return deferred.promise;
        }
        
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl',
                resolve: {
                    delay:delay
                }
            })
            .when('/contact', {
                templateUrl: 'views/contact.html',
                controller: 'ContactCtrl',
                resolve: {
                    delay:delay
                }
            })
            .when('/company', {
                templateUrl: 'views/company.html',
                controller: 'CompanyCtrl',
                resolve: {
                    delay:delay
                }
            })
            .when('/contract', {
                templateUrl: 'views/contract.html',
                controller: 'ContractCtrl',
                resolve: {
                    delay:delay
                }
            })
            .when('/showroom', {
                templateUrl: 'views/showroom.html',
                controller: 'ShowroomCtrl',
                resolve: {
                    delay:delay
                }
            })
            .when('/design', {
                templateUrl: 'views/design.html',
                controller: 'DesignCtrl',
                resolve: {
                    delay:delay
                }
            })
            .when('/sofa', {
              templateUrl: 'views/sofa.html',
              controller: 'SofaCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    }]);

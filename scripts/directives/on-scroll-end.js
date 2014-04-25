'use strict';

angular.module('mainApp')
  .directive('onScrollEnd', [function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the onScrollEnd directive');
      }
    };
  }]);

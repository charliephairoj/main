'use strict';

angular.module('mainApp.directives')
    .directive('modal', [function () {
        
        function createCloseButton(){
            var outer = angular.element('<div class="modal-close-button"></div>');
            outer.append(angular.element('<div></div>'))
            return outer;
        }
        
        function center(element){
            var parent = element.parent(),
                pWidth = parent.width(),
                pHeight = parent.height(),
                eWidth = element.outerWidth(),
                eHeight = element.outerHeight(),
                left,
                top;
                 
            //Determoine the horizontal left
            left = (eWidth)/2;
            //Dertermin the top
            top = (eHeight)/2;
          
            //Set the parent position to relative if static
            if(parent.css('position')=='static'){
                parent.css('position', 'relative');
            }
            /*
            element.css('position', 'absolute');
            element.css('margin-left', -left);
            element.css('margin-top', -top);*/
        }
        return {
            restrict: 'A',
            link: function postLink(scope, element, attrs) {
                
                
                /*
                 * Construct the modal
                 * 
                 * First we set the class then we add the background to the modal.
                 * We then determine if we should add a close button based on 
                 * the attrs
                 */
                //Add classes
                element.addClass('modal');
                
                //Set default Styles
                element.css('opacity', 0);
                
                //Create container
                 var container = angular.element('<div class="modal_background"></div>');
                 //element.append(background);
                
                //Add Close Button
                if(scope.$eval(attrs.modalCloseButton) === true){
                    var closeButton = createCloseButton()
                    closeButton.bind('click', function(){
                        element.fadeTo(1000, 0);
                    });
                    element.append(closeButton);
                }
                
                //Center the Modal
                if(scope.$eval(attrs.modalCenter) !== false){
                    center(element);
                }
                
                scope.$watch(attrs.modal, function(value){
                    if(value){
                        element.fadeTo(1000, 1);
                    }else{
                        element.fadeTo(1000, 0);
                    }
                });
                
                
              /*
              * Create an api via the scope for the controller to 
              * interact with
              * 
              * -fadeIn
              * -fadeOut
              */
             scope.modal = {};
             
             /*
              * Fade In
              * 
              * -1 callback argument
              */
             scope.modal.fadeIn = function(callback){
                 element.fadeTo(1000, 1, function(){
                     (callback || angular.noop)();
                 });
             }
             
             /*
              * Fade Out
              * 
              * -1 callback argument
              */
             scope.modal.fadeOut = function(callback){
                 element.fadeTo(1000, 0, function(){
                     (callback || angular.noop)();
                 });
             }
             
             
            }
        };
    }]);

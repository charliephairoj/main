'use strict';

angular.module('mainApp.services')
    .factory('backgroundContainer', [function() {
        function Container(element){
            this._status = 'inactive'
            this._element = element;
            this._image;
        }
        
        Object.defineProperties(Container.prototype, {
             status:{
                 get:function(){
                     return this._status;
                 },
                 set:function(status){
                     this._status = (status == true || status == "active") ? true : false;
                 }
             },
             height:{
                 get:function(){
                     return this._element.outerHeight();
                 }
             },
             width:{
                 get:function(){
                     return this._element.outerWidth();
                 }
             },
             visible: {
                 get: function(){
                     return this._element.css('opacity') > 0 ? true : false;
                 }
             },
             src: {
                 get: function(){
                     return $(this._image).attr('src');
                 }
             }
             
        });
        
        Container.prototype._prep = function(){
         
            //Get Window and Image dimensions
            var cHeight = this._element.height(),
                cWidth = this._element.width(),
                iHeight = this._image.height(),
                iWidth = this._image.width();
            /*
             * Calculates the raio of height:width 
             * for both image and window. if ratio for 
             * is less than, if it has a longer width
             * proportionally, so make it height based;
             * And vice versa for greater than. 
             */
            if((iHeight/iWidth)<(cHeight/cWidth)){
                this._image.addClass('heightBased');
                this._image.removeClass('widthBased');
            }else{
                this._image.removeClass('heightBased');
                this._image.addClass('widthBased');
            }
             
        }
        
        Container.prototype.append = function(element){
            if(this.visible){
                throw Error("Cannot append when visible");
            }
            this._element.append(element);
            this._image = $(element);
            this._prep();
        };
        
        Container.prototype.replace = function(element){
            if(this.visible){
                throw Error("Cannot replace when visible");
            }
            this._element.empty();
            this._element.append(element);
            this._image = $(element);
            this._prep();
        };
        
        Container.prototype.empty = function(){
            if(this.visible){
                throw Error("Cannot empty when visible");
            }
            this._element.empty();
            this._image = null;
        };
        
        Container.prototype.fadeIn= function(callback){
            if(this.visible){
                throw Error("Cannnot fade in. Aready visible.");
            }
            this._status = 'active';
            this._element.fadeTo(2500, 1, function(){
                console.log(this.visible);
                (callback || angular.noop)();
            }.bind(this))
        }
        
        Container.prototype.fadeOut= function(callback){
            this._element.fadeTo(2500, 0, function(){
                this._status = 'inactive';
                (callback || angular.noop)();
            }.bind(this))
        }
        
        return Container
    }]);

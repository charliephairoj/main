'use strict';

angular.module('mainApp.services')
    .factory('background', ['$timeout', 'backgroundContainer', function($timeout, backgroundContainer) {
        
        
        
        
        var Background = {
            "index": 0,
            "images": [],
            "loadedImages": [],
            "_background": angular.element('#background'),
            "_container1": new backgroundContainer(angular.element('#background-container1')),
            "_container2": new backgroundContainer(angular.element('#background-container2')),
            "_onInitialTransition": []
        };
        
        Object.defineProperties(Background, {
            onInitialTransition:{
                set: function(fn){
                    this._onInitialTransition.push(fn);
                }
            }
        });
        
        Background._cycle= function(){
            if(this.loadedImages.length>0){
                var currentContainer = this._container1.status == 'active' ? this._container1 : this._container2;
                var nextContainer = this._container1.status == 'active' ? this._container2 : this._container1;
                var image = this.loadedImages[this.index];
                console.log($(image).attr('src'));
                console.log(currentContainer.src);
                if($(image).attr('src') != currentContainer.src){
                    nextContainer.replace(image);
                    currentContainer.fadeOut();
                    nextContainer.fadeIn(function(){
                        for(var i in this._onInitialTransition){
                            (this._onInitialTransition.pop())()
                        }
                        this.index = this.index + 1 < this.loadedImages.length ? this.index + 1 : 0;
                        
                        if(this.images.length > 1){
                            this.timeoutVar = $timeout(this._cycle.bind(this), 3000);
                        }
                    }.bind(this));
                }else{
                    this.timeoutVar = $timeout(this._cycle.bind(this), 3000);
                }
                
                
            }else{
                this.timeoutVar = $timeout(this._cycle.bind(this), 100);
            }
        }
        
        Background.loadImages = function(arg){
            this.index = 0;
            this.images.length = 0;
            this.loadedImages.length = 0;
            if(angular.isArray(arg)){
                angular.forEach(arg, function(item){
                    var img = angular.element(new Image())
                    img.bind('load', function(){
                        Background.loadedImages.push(this);
                    });
                    img.attr('src', item.url);
                    this.images.push(img);
                    /*
                    switch(typeof(item)){
                        default:
                            throw TypeError("Only accepts urls and images");
                    }
                    */
                }.bind(this))
            }
        }
        
        Background.start = function(){
            this._cycle();
        }
        
        Background.stop = function(){
            $timeout.cancel(this.timeoutVar);   
        }
        
        
        return Background;
    }]);

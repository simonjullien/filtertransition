define([
    "jquery",
    "underscore",
    "backbone",
    "config",
    "handlebars",
    "tweenMax",
    "view/common/base_view"
], function (
    $,
    _,
    Backbone,
    Config,
    Handlebars,
    TweenMax,
    BaseView
) {

    "use strict";

  return BaseView.extend({

        data: null,
        $node: null,
        $img:null,

        tweenObj:null,

        initialize: function(options) {
            _.bindAll(this, 'updateBrightness', 'onHideComplete', 'onStartImg');
            this.data = options.data;
            this.tweenObj = {'progress':0, 'contrast': 160, 'opacity':0};
            this.init();
        },

        init:function(){
            this.$node = $('<div class="gallery-item"><img class="img-item-js img-item" src="'+this.data.path+this.data.name+'"></div>');
            this.$img = $('.img-item-js',this.$node);
            this.show();
        },

        show: function(){
            this.updateBrightness();
            this.$el.prepend(this.$node);
            TweenMax.to(this.tweenObj,4,{progress:99, contrast:101, opacity:1, delay:2, onStart:this.onStartImg, onUpdate:this.updateBrightness, ease:Expo.easeOut});
            
        },

        hide: function(){
            TweenMax. killTweensOf(this.tweenObj);
            TweenMax.to(this.tweenObj,2,{progress:0, contrast:160, opacity:0, onUpdate:this.updateBrightness, ease:Expo.easeIn, onComplete: this.onHideComplete});
        },

        onStartImg: function(){
            this.onResize();
        },

        onHideComplete: function(){
            this.$node.detach();
        },

        updateBrightness: function(){
            var prog = this.tweenObj.progress;
            var contrast = this.tweenObj.contrast;
            var opacity = this.tweenObj.opacity;
            this.$img.css({
                '-webkit-filter': 'brightness('+prog+'%) '+'contrast('+contrast+'%)'//+'opacity('+opacity+')'
            });
        },

        onResize: function (evt) {
            var $rd = $(window);
            this.w = $rd.width();
            this.h = $rd.height();
            if(this.$node){
                var newSize = this.manageSize({'width':this.$img[0].naturalWidth, 'height':this.$img[0].naturalHeight});
                this.$img.css({'width':newSize.imageWidth, 'height':newSize.imageHeight});
                this.$img.css({
                    'left':(this.w-newSize.imageWidth)/2 +'px',
                    'top':((this.h-newSize.imageHeight)/2)+'px'
                });
            }
        },

        manageSize: function(originalSize){
            var scale = 1/(originalSize.width / (this.w*0.7));
            var newH = originalSize.height * scale;

                scale = 1/(originalSize.height / (this.h*0.7));
                return {'imageWidth':originalSize.width * scale, 'imageHeight':originalSize.height * scale};
            
        },

		render: function() {

            this.$el.append('What an awesome about page!!');
		}
	});
});

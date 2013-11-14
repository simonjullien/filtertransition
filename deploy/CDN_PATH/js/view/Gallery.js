define([
    "jquery",
    "underscore",
    "backbone",
    "config",
    "handlebars",
    "view/common/base_view",
    "view/GalleryItem"
], function (
    $,
    _,
    Backbone,
    Config,
    Handlebars,
    BaseView,
    GalleryItem
) {

    "use strict";

  return BaseView.extend({

        list: null,
        index: 0,

        currentItem: null,

        initialize: function() {
            _.bindAll(this, 'selectNextItem');
            //# Load HTML template
            require(["text!"+Config.BASE_URL+"templates/gallery.html!strip"], _.bind(this.onTemplateLoaded, this) );

        },

        onTemplateLoaded: function( template ) {
            var templateFunction = Handlebars.compile( template );

            this.$el.append(
                $( templateFunction( {  } ) )
            );

            this.init();
        },

        init:function(){
            this.list = [];
            /*for (var i = 0; i < Config.getImageData().length; i++) {
                var item = Config.getImageData()[i];
                var tmp = new GalleryItem({el:$('.gallery', this.el),'data':item});
                this.list.push(tmp);
            }*/
            this.$el.on('click', this.selectNextItem);

            this.createAndAddItem();
        },

        selectNextItem: function(){
            if(this.index < Config.getImageData().length - 1){
                this.index++;
            }else{
                this.index = 0;
            }
            this.createAndAddItem();
        },

        createAndAddItem:function(){
            if(this.currentItem){
                this.currentItem.hide();
            }
            this.currentItem = this.getNextGalleryItem();
            this.onResize();
        },

        getNextGalleryItem:function(){
            var item = Config.getImageData()[this.index];
            return new GalleryItem({el:$('.gallery', this.el),'data':item});
        },

        onResize: function (evt) {
            if(this.currentItem){
                this.currentItem.onResize(evt);
            }
        },

		render: function() {
		}
	});
});

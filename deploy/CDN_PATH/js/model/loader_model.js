define([
		"underscore",
		"backbone",
		"config",
		"libs/createjs/preloadjs",
		"libs/createjs/soundjs"
], function (
		_,
		Backbone,
		Config,
		PreloadJS,
		SoundJS
) {
	"use strict";
var Model = Backbone.Collection.extend({

    preloader: null,
    loadDone: false,


    initialize: function() {

		this.preloader = new PreloadJS();
		this.preloader.installPlugin(SoundJS);
		this.preloader.setMaxConnections(4);
		this.preloader.maintainScriptOrder = false;
		this.preloader.addEventListener("fileload", _.bind( this.onFileLoaded, this ) );
		this.preloader.addEventListener("complete", _.bind( this.onComplete, this ) );
		this.preloader.addEventListener("progress", _.bind( this.onProgress, this ) );
		this.preloader.addEventListener("error", _.bind( this.onError, this ) );




		this.on('add', this.onAdded, this);
		this.on('change:loaded', this.onLoaded, this);
	},

	onLoaded: function(model, loaded) {
		if( !loaded ) {
			throw new Error("Load set to false");
		}
	},

	onProgress: function( evt ) {
		this.trigger('progress', evt );
	},

	onAdded: function( item ) {
		if (!item.has('id')){ item.set({id: item.get('src')});}
        item.set({loaded: false}, {silent: true});

        var json=item.toJSON();
       // json.callback='maps';
        this.preloader.loadFile(json, false, Config.CDN);

    },

	onFileLoaded: function( evt ) {
        ////console.log("evt.item.id: "+evt.item.id)
		this.get( evt.item.id ).set( _.extend(evt.item,{'loaded':true} ) );

		this.trigger('loaded',evt);
	},

	onComplete: function( evt ) {
        this.loadDone = true;
		this.trigger('complete',evt);
	},

	start: function() {
		this.preloader.load();

	},

	hasLoaded: function() {
		return this.preloader.loaded;
	},

	getResult:function(filename) {
		return this.preloader.getResult(filename);
	},


	onError: function( evt ) {
		//console.error( "ASSET ERROR: "+evt.item.src );
		this.get( evt.item.id ).set({'loaded':true, 'error':true});

		this.trigger('load_error',evt);
	}

});

return new Model();

});
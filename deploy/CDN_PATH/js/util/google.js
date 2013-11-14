/**
 * ...
 * @author emlyn@resn.co.nz
 */
 
define([
	"config",
	"underscore",
	"backbone"
	],function(
	Config,
	_,
	Backbone
) {
	
	var gog = {
		
		gapi: null,
		ready: false,
		
		onLoadCallback: function() {
			
			this.gapi = window.gapi;			
			this.ready = true;
			
			this.trigger('ready');
		},
		
		renderAllInContainer:function (container){
			this.gapi.plusone.go(container);
			
		}
		
	};
	
	
	var onLoadCallback=_.uniqueId('googleOnComplete');
	window[onLoadCallback] =_.bind(gog.onLoadCallback,gog);
	
	 _.extend(gog,Backbone.Events);
	 
	//# Google + async embed code.
	window.___gcfg = {
		lang: 'en-US',
		parsetags:'explicit'
		};

		(function() {
		var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
		po.src = 'https://apis.google.com/js/plusone.js?onload='+onLoadCallback;
		var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
	})();
	 
	 
	
	return gog;
	
	
});
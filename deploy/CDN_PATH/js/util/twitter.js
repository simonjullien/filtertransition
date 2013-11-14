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
	
	var twit = {
		
		twttr: null,
		ready: false,
		
		onReady: function(twttr) {
			
			this.twttr = twttr;
			
			//# Proxy twitter events
			twttr.events.bind('click',    _.bind( function(e) { this.trigger('click',e); },this) );
			twttr.events.bind('tweet',    _.bind( function(e) { this.trigger('tweet',e); },this) );
			twttr.events.bind('retweet',  _.bind( function(e) { this.trigger('retweet',e); },this) );
			twttr.events.bind('favorite', _.bind( function(e) { this.trigger('favorite',e); },this) );
			twttr.events.bind('follow',   _.bind( function(e) { this.trigger('follow',e); },this) );
			
			
			this.ready = true;
			
			this.trigger('ready');
		},
		
		renderAllTweetButtons:function(){
			 this.twttr.widgets.load();
		}
		
	};
	
	 _.extend(twit,Backbone.Events);
	 
	//# Twitter async embed code.
	 window.twttr = (function (d,s,id) {
	var t, js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) {
		return;
	} js=d.createElement(s); js.id=id;
	js.src="//platform.twitter.com/widgets.js"; fjs.parentNode.insertBefore(js, fjs);
	return window.twttr || (t = { _e: [], ready: function(f){ t._e.push(f); } });
	}(document, "script", "twitter-wjs"));
	 
	 
	window.twttr.ready(_.bind(twit.onReady, twit));
    
	return twit;
	
	
});
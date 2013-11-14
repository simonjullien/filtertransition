define([
    "jquery",
    "underscore",
    "view/common/base_view",
    "backbone",
    "config",
    "model/app_model",
    "libs/swfobject",
    "libs/swffit",
    "libs/swfmacmousewheel"

], function (
    $,
    _,
    BaseView,
    Backbone,
    Config,
    AppModel,
    swfobject


) {

    "use strict";

  return BaseView.extend({

		globalName: null,
		deeplink: null,

		initialize: function ( options ) {

			this.id = 'flashcontent';

			//this.deeplink = options.deeplink || null;

			this.globalName = _.uniqueId('FlashView');

			window[this.globalName] = this;

		},

		getFlash: function() {
			return document.getElementById(this.id);
		},

		render: function() {
			if(this.el) {

                    if( !this.$el.find('#'+this.id).length ) {
                        this.$el.append( this.make('div',{id: this.id}) );
                    }

                    var siteRoot = Config.CDN + '/flash/';

                    var swfURL = siteRoot + "launcher.swf";
                    var targetSwfURL = siteRoot + "main.swf";
                    var expressInstallURL = siteRoot + "expressInstall.swf";
                    var swfID = this.id;

                    var flashvars = {};
                    flashvars.as_swf_name = swfID;
                    flashvars.siteRoot = siteRoot;
                    flashvars.targetSwf = targetSwfURL;
                    flashvars.viewId = this.globalName;
                    flashvars.env = Config.ENV;
                    flashvars.deeplink = this.deeplink;

                    var params = {};
                    params.scale = "noscale";
                    params.allowfullscreen = "true";'flas'
                    params.allowscriptaccess = "always";
                    params.wmode="opaque";

                    var attributes = {
                        width: AppModel.has('pageOptions') && AppModel.get('pageOptions')[0] || "100%",
                        height:AppModel.has('pageOptions') && AppModel.get('pageOptions')[1] || "100%",
                        bgcolor:"#000000",
                        name: swfID
                    };

                    swfobject.embedSWF(
                        swfURL,
                        swfID,
                        attributes.width, attributes.height,
                        Config.FLASH_VESRION,
                        expressInstallURL,
                        flashvars,
                        params,
                        attributes,
                        _.bind(this.onSwfResult,this)
                    );
                }
			},

        onSwfResult: function( e ) {
            //# Show no flash message
            if(e.id === this.id && !e.success) {
                this.$el.html( '<div><div id="noflash"><p><strong>You need to upgrade your Flash Player</strong></p><p><a href="?bypass">Bypass the detection</a></p></div></div>' );
            }
		}
	});
});

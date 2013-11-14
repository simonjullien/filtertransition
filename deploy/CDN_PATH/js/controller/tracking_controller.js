/**
 * User: emlyn
 * Date: 27/06/12
 * Time: 2:14 PM
 */
define([
	"jquery",
	"underscore",
	"router",
	"model/app_model",
	"libs/jquery.mousewheel",
	"libs/jquerypp.swipe",
    "ga"

],function (
	$,
	_,
	Router,
	AppModel,
	jQueryMouseWheel,
    jQuerySwipe,
    GA
) {
	"use strict";
	var controller = {

init: function () {

    AppModel.on("change:page", this.onAppModelPage, this);

    $('.btn-download-dd').on('click', _.bind(this.clickDownload, this));

},

clickDownload: function (event) {
    //   console.log('clicked download');
    GA('send', 'event', 'downloadButton', 'click');
},
onAppModelPage: function (model, page) {

    GA('send', 'pageview', page);
}



};

controller.init();

return controller;
});
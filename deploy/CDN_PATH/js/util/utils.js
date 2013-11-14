define([
	"jquery",
	"config",
	"underscore"

],function(
		$,
		Config,
		_
	) {
	"use strict";
	return {

	   //#usage  Util.centerAndScale(div,window.innerWidth,this.originalWidth,this.originalHeight);
	   //# div : the jquery element of the div
	   //# desiredWidth : the new width
	   //# originalWidth : the original width
	   //# originalHeight : the original height
	   //# centerWidth : the width  where the div will be centered in

		centerAndScale: function (div, desiredWidth, originalWidth, originalHeight, centerWidth) {
			if (!centerWidth) {
				centerWidth = desiredWidth;
			}
			var screenWidth = desiredWidth;
			var scale = (screenWidth / originalWidth);
			var scaleString = "scale(" + scale + "," + scale + ")";

			var overflow = centerWidth - (scale * originalWidth);

			var offsetX = (overflow) / 2;
			var offsetY = (scale * originalHeight) / 2;




			div.css("left", offsetX);
			div.css("transform", scaleString);
			div.css("margin-top", -offsetY);
			div.css("top","50%");

		}



	};
});
define([
	"jquery",
	"underscore",
	"backbone"


], function (
	$,
	_,
	Backbone


) {
	"use strict";
    return Backbone.View.extend({


        initialize: function () {

        },


        render: function () {

        },


        onResize: function (evt) {

        },


        destroy: function () {
            this.stopListening();
            this.off();
        }
    });
});

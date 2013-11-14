define([
    "jquery",
    "underscore",
    "backbone",
    "config",
    "handlebars",
    "view/common/base_view"
], function (
    $,
    _,
    Backbone,
    Config,
    Handlebars,
    BaseView
) {

    "use strict";

  return BaseView.extend({

        initialize: function() {

            //# Load HTML template
            require(["text!"+Config.BASE_URL+"templates/example.html!strip"], _.bind(this.onTemplateLoaded, this) );

        },

        onTemplateLoaded: function( template ) {

            var templateFunction = Handlebars.compile( template );

            this.$el.append(
                $( templateFunction( { 'title': 'Awesome!', 'time': new Date().toString() } ) )
            );

        },

		render: function() {

            this.$el.append('What an awesome about page!!');
		}
	});
});

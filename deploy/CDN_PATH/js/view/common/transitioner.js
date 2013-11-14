define([
	"jquery",
	"underscore",
	"config",
	"backbone",
	"controller/app_controller",
	"controller/loader_controller",
	"model/app_model",
	"model/loader_model",
	"view/loader",
	"view/Gallery",
	"view/about"

], function (
    $,
    _,
    Config,
    Backbone,
    AppController,
    LoaderController,
    AppModel,
    LoaderModel,

    LoaderView,
    GalleryView,
    AboutView


	) {

	"use strict";

	var viewMap = {};
	viewMap[AppModel.PAGES.LOADER] = LoaderView;
	viewMap[AppModel.PAGES.HOME] = GalleryView;
	viewMap[AppModel.PAGES.ABOUT] = AboutView;


    return Backbone.View.extend({

        currentSection: null,

        initialize: function () {

            AppModel.on("change:page", this.onAppModelPage, this);

        },

        onResize: function (evt) {
            if (this.currentSection) {
                this.currentSection.onResize(evt);
            }
        },


        onAppModelPage: function (model, page) {


            this.$el.empty();

            var pageId = page;
            var view;

            if (page != AppModel.PAGES.LOADER && !LoaderModel.hasLoaded()) {
                AppModel.set('postLoaderPage', pageId);
                AppModel.set('page', AppModel.PAGES.LOADER);
                return;
            }


            //# If the view is already displayed, abort.
            if (this.currentViewId == pageId) {
                return;
            }


            var ViewClass = viewMap[pageId];

            if (ViewClass) {

                this.currentViewId = pageId;

                this.currentSection = new ViewClass({el:this.$el});

                this.currentSection.render();
                this.currentSection.onResize();


            }

        }




	});
});

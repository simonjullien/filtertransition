define([
    "jquery",
    "config",
    "router",
    "controller/app_controller",
    "controller/loader_controller",
    "model/app_model",
    "model/loader_model",
    "view/common/transitioner"

],function(
    $,
    Config,
    Router,
    AppController,
    LoaderController,
    AppModel,
    LoaderModel,
    Transitioner

) {


    "use strict";

    Router.setRoutes([
        ["", AppModel.PAGES.HOME],
        ["home", AppModel.PAGES.HOME],
        ["about", AppModel.PAGES.ABOUT]
    ]);



LoaderModel.add([
    { src: '/css/all.css' }
]);

return {

    rootNode: $('#rootNode'),
    transitioner: null,

    start: function () {

        this.transitioner = new Transitioner({el: this.rootNode });

        window.onresize = _.bind(this.onResize, this);
        LoaderModel.on('complete', this.onLoaderComplete, this);

        LoaderController.start();
        Router.start();

    },

    onLoaderComplete: function () {
        this.startMain();
    },

    startMain: function () {

        var postLoaderPage = AppModel.get('postLoaderPage');
        AppModel.unset('postLoaderPage');
        AppModel.set('page', postLoaderPage);
    },

    onResize: function (evt) {

        this.transitioner.onResize(evt);
    }



};

});
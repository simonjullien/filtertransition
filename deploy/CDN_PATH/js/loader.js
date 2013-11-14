/**
 * ...
 * @author emlyn@resn.co.nz
 */

require.config({

	paths: {
		"jquery": "libs/jquery-1.8.3",
		"underscore": "libs/underscore",
		"backbone": "libs/backbone",
		"swfobject": "libs/swfobject",
		"handlebars": "libs/handlebars-1.0.rc.3",
		"text": "libs/text",
		"console": "libs/console-shim",
		"tweenMax": "libs/tweenmax/TweenMax",
        "libs/createjs/preloadjs": "libs/createjs/preloadjs-0.3.1.min",
        "libs/createjs/tweenjs": "libs/createjs/tweenjs-0.4.1.min",
        "libs/createjs/easeljs": "libs/createjs/easeljs-0.6.1.min",
        "libs/createjs/movieclip": "libs/createjs/movieclip-0.6.1.min",
        "libs/createjs/soundjs": "libs/createjs/soundjs-0.4.1.min",
        //"libs/createjs/soundjs": "libs/createjs/soundjs-NEXT.min",
       // "ga": "util/google_analytics",
       // "raphael": "libs/raphael.min"
	},

	shim: {
		'jquery': {
			exports: 'jQuery'
		},
		'underscore': {
			exports: '_'
		},
		'backbone': {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		},
		'handlebars': {
			exports: 'Handlebars'
		},
		'tweenMax': {
			exports: 'TweenMax'
		},
		'console': {
			exports: 'console'
		},
        'libs/createjs/preloadjs': {
            exports: 'createjs.LoadQueue'
        },
        'libs/createjs/tweenjs': {
            exports: 'createjs.Tween',
            deps: ['libs/createjs/easeljs']
        },
        'libs/createjs/movieclip': {
            deps: ['libs/createjs/easeljs','libs/createjs/tweenjs'],
            exports: 'createjs'
        },
        'libs/createjs/soundjs': {
            deps: ['libs/createjs/preloadjs'],
            exports: 'createjs.Sound'
        },


		'libs/swfobject': {
			deps: ['jquery'],
			exports: 'swfobject'
		},
		'libs/swffit':['libs/swfobject'],
		'libs/swfmacmousewheel':['libs/swfobject'],
		'libs/jquery-swfobject': ['jquery']
	},

	waitSeconds: 12

  });

require(["jquery","config","main"], function($,Config, Main) {


		Main.start();

		//# Run testing framwork.
		if(window.location.toString().indexOf('?testing') > -1) {
			require(['tests/jasmine']);
		}


});


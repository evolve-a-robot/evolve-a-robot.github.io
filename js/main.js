
var wind_height = $(window).height(),
    head_height = $("#header").height(),
    foot_height = $("#footer").height(),
    vis_height = wind_height - head_height - foot_height - 10;

// Need to clean this up...
$("#vis-content").height(vis_height);
// $("#launch-div").height(vis_height - $("#content-title").height());
// $("#launch-div").css("line-height", Math.floor((vis_height - $("#content-title").height())/1.5) + "px");
$("#container").height(vis_height - $("#content-title").height());

;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.radio = {
    name : 'radio',

    version : '0.1.0',

    settings : {
      callback: function (){}
    },

    init : function (scope, method, options) {
      this.bindings(method, options);
    },

    events : function () {
      var self = this,
          S = this.S;

      S(this.scope)
      	.on('click.fndtn.radio', '[data-radio]>input[type=radio]', function () {

      		var radgrp = S(this).closest('[' + self.attr_name() + ']'),
      				target = S(this),
      				label = target.next(),
      				lab_sibs = S('label', radgrp);

			// console.log(radgrp);
			// console.log(target);
			// console.log(label);
			// console.log(lab_sibs);
      // 
  			if (!label.hasClass('active')) {
  				lab_sibs.toggleClass('active', false);
  				label.toggleClass('active');
  			}
      	});
    },

    reflow : function () {}
  };
}(jQuery, window, window.document));

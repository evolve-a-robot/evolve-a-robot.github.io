
var wind_height = $(window).height(),
    head_height = $("#header").height(),
    foot_height = $("#footer").height(),
    title_height = $("#content-title").height(),
    vis_height = wind_height - head_height - foot_height,

    vis_div = $("#vis-content"),
    content_area = $("#content-area"),
    canvas_container = $("#container"),
    scatter_row = $("#scatter-row"),
    genome_row = $("#genome-row");

// Set the height of each row in the visualization div
vis_div.height(vis_height);
content_area.height(vis_height);
canvas_container.height(vis_height * 0.36);
scatter_row.height(vis_height * 0.26);
genome_row.height(vis_height * 0.26);


var popchart = $("#pop-scatterplot-div"),
    genchart = $("#gen-scatterplot-div"),
    popsvg, gensvg, canvas;

$(window).on("resize", function() {
  popsvg = typeof popsvg !== "undefined" ? popsvg : $(popchart).find("svg");
  gensvg = typeof gensvg !== "undefined" ? gensvg : $(genchart).find("svg");
  canvas = typeof canvas !== "undefined" ? canvas : $(canvas_container).find("canvas");

  if (popsvg) {
    popsvg.attr("width", popchart.parent().width());
  }
  if (canvas) {
    Simulator.resize();
  }

})

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

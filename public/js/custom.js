(function ($) {
	"use strict";

	// PRE LOADER
	$(window).load(function () {
		$(".preloader").fadeOut(1000); // set duration in brackets
	});

	// MENU
	$(".navbar-collapse a").on("click", function () {
		$(".navbar-collapse").collapse("hide");
	});

	// $(window).scroll(function () {
	// 	if ($(".navbar").offset().top > 50) {
	// 		$(".navbar-fixed-top").addClass("top-nav-collapse");
	// 	} else {
	// 		$(".navbar-fixed-top").removeClass("top-nav-collapse");
	// 	}
	// });

	// HOME SLIDER & COURSES & CLIENTS

	$(document).ready(function () {
		setTimeout(function () {
			$(".home-slider").owlCarousel({
				animateOut: "fadeOut",
				items: 1,
				loop: true,
				dots: false,
				autoplayHoverPause: false,
				autoplay: true,
				smartSpeed: 1000,
			});
		}, 5);
	});

	$(document).ready(function () {
		setTimeout(function () {
			$(".owl-courses").owlCarousel({
				animateOut: "fadeOut",
				loop: true,
				autoplayHoverPause: false,
				autoplay: true,
				smartSpeed: 1000,
				dots: false,
				nav: true,
				navText: [
					'<i class="fa fa-angle-left"></i>',
					'<i class="fa fa-angle-right"></i>',
				],
				responsiveClass: true,
				responsive: {
					0: {
						items: 1,
					},
					1000: {
						items: 3,
					},
				},
			});
		}, 5);
	});

	$(document).ready(function () {
		setTimeout(function () {
			$(".owl-client").owlCarousel({
				animateOut: "fadeOut",
				loop: true,
				autoplayHoverPause: false,
				autoplay: true,
				smartSpeed: 1000,
				responsiveClass: true,
				responsive: {
					0: {
						items: 1,
					},
					1000: {
						items: 3,
					},
				},
			});
		}, 5);
	});

	// SMOOTHSCROLL
	$(function () {
		$(".custom-navbar a, #home a").on("click", function (event) {
			var $anchor = $(this);
			$("html, body")
				.stop()
				.animate(
					{
						scrollTop: $($anchor.attr("href")).offset().top - 49,
					},
					1000
				);
			event.preventDefault();
		});
	});
})(jQuery);

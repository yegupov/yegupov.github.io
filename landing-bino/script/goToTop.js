;(function() {
	$(function() {
		'use strict';

		/*
		 * Go to top
		 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
		 */
		var $window = $(window);
		var $scrollToTop = $('#scrollup');
		var $htmlBody = $('html, body');
		var SCROLL_TO_TOP_SPEED = 400;
		var SCROLL_TO_TOP_ACTIVE_CLASS = 'scrollup--active';
		var SCROLL_TO_TOP_APPEAR_LIMIT = 100;

		$window.scroll(function() {
			if ( $(this).scrollTop() > SCROLL_TO_TOP_APPEAR_LIMIT ) {
				$scrollToTop.addClass(SCROLL_TO_TOP_ACTIVE_CLASS);
			} else {
				$scrollToTop.removeClass(SCROLL_TO_TOP_ACTIVE_CLASS);
			}
		});

		// Click to scroll to top
		$scrollToTop.click(function(event) {
			event.preventDefault();
			$htmlBody.animate({scrollTop : 0}, SCROLL_TO_TOP_SPEED);
		});
	});
}());
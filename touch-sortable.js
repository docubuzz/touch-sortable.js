(function ($) {
	$.fn.sortable = function () {
		return this.each(function(){
			
			var supports_touch = 'ontouchstart' in document.documentElement;
			var start_event_name = (supports_touch) ? 'touchstart' : 'mousedown';
			$(this).children()
                .on(start_event_name, onStart)
                .css({
                	cursor : "move",
                	'user-select' : 'none'
            	})
                .attr('unselectable', 'on')
                .on('selectstart', false);

			var el;
			var parentTop, parentBtm;
			var start_y;

			function onStart(e) {
				e = e.originalEvent;
				el = $(supports_touch ? e.touches[0].target : e.target);
				parentTop = el.parent().position().top;
				parentBtm = parentTop + el.parent().innerHeight() + el.height();
                el.addClass('inMotion').css({position: 'relative', "z-index": 1});

				/* Bind respective events based on start trigger */
				if (e.touches) {
					start_y = e.touches[0].pageY;
					$('body').on('touchmove.sortable', onMove).on('touchend.sortable', onEnd).on('touchcancel.sortable', onEnd);
				} else {
					start_y = e.pageY;
					$('body').on('mousemove.sortable', onMove).on('mouseup.sortable', onEnd);
				}
			}

			function onMove(e) {
				e = e.originalEvent;

				var pageY = (supports_touch) ? e.touches[0].pageY : e.pageY;

				/* Limit dragging to constraints of parent */
				if (pageY <= parentTop){
					pageY = parentTop;
				} else if (pageY >= parentBtm ){
					pageY = parentBtm;
				}

				/* Move item  */
				move = pageY - start_y;
				el.css('top', move);
                
				/* Re-order the list once item crosses over the neighboring elements */
				if (move < -el.outerHeight()) {

					if (el.prev().length) {
						el.siblings().css('position','relative');
						if (!el.prev().is(':animated')) {
							
							/* Animate and swap */
							el.prev().animate({"top": el.outerHeight()}, 150, function() {
                                start_y = start_y - el.outerHeight();
								$(this).insertAfter(el).css({'top':''});
								el.css('top', "+=" + el.outerHeight());
							});
						}
					}
				} else if (move > el.outerHeight()) {
					if (el.next().length) {
						el.siblings().css('position','relative');
						if (!el.next().is(':animated')) {
							
							/* Animate and swap */
							el.next().animate({"top": -el.outerHeight()}, 150, function(){
								$(this).insertBefore(el).css({'top':''});
								start_y = start_y + el.outerHeight();
                                el.css('top', "-=" + el.outerHeight());
							});
						}
					}
				}
                
				e.preventDefault();
			}

			function onEnd(e) {
                el.css('top','auto').removeClass('inMotion').css({ 'z-index' : '' });
				$('body').unbind('.sortable', onMove).unbind('.sortable', onEnd);
				e.preventDefault();
			}
		});
	};
})(jQuery);
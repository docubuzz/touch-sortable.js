(function ($) {
    $.fn.sortable = function () {
        return this.each(function () {

            var supports_touch = 'ontouchstart' in document.documentElement;
            var start_event_name = (supports_touch) ? 'touchstart' : 'mousedown';
            $(this).children()
                .on(start_event_name, onStart)
                .css({
                cursor: "move",
                    'user-select': 'none'
            })
                .attr('unselectable', 'on')
                .on('selectstart', false);

            var el;
            var parentTop, parentBtm;
            var start_y;
            var elDistance = $(this).children(':nth-child(2)').offset().top - $(this).children(':nth-child(1)').offset().top;

            function onStart(e) {

                e = e.originalEvent;
                el = $(supports_touch ? e.touches[0].target : e.target);
                parentTop = el.parent().position().top;
                parentBtm = parentTop + el.parent().innerHeight() + el.height();
                el.addClass('inMotion').css({
                    position: 'relative',
                    'z-index': 1
                });

                /* Bind respective events based on start trigger */
                if (e.touches) {
                    start_y = e.touches[0].pageY;
                    $('body').on('touchmove.sortable', onMove).on('touchend.sortable', onEnd).on('touchcancel.sortable', onEnd);
                } else {
                    start_y = e.pageY;
                    $('body').on('mousemove.sortable', onMove).on('mouseup.sortable', onEnd).on('mouseleave.sortable', onEnd);
                }
            }

            function onMove(e) {
                var move;
                if (e) {
                    e = e.originalEvent;

                    var pageY = (e.touches) ? e.touches[0].pageY : e.pageY;

                    /* Limit dragging to constraints of parent */
                    if (pageY <= parentTop) {
                        pageY = parentTop;
                    } else if (pageY >= parentBtm) {
                        pageY = parentBtm;
                    }

                    /* Move item  */
                    move = pageY - start_y;
                    el.css('top', move);
                } else {
                    move = el.css('top').split('px')[0];
                }



                /* Re-order the list once item crosses over the neighboring elements */
                if (move < -elDistance) {

                    if (el.prev().length) {
                        el.siblings().css('position', 'relative');
                        if (!el.prev().is(':animated')) {

                            /* Animate and swap */
                            el.prev().animate({
                                'top': elDistance
                            }, 150, function () {
                                start_y = start_y - elDistance;
                                $(this).insertAfter(el).css({
                                    'top': ''
                                });
                                el.css('top', '+=' + elDistance);
                                onMove();
                            });
                        }
                    }
                } else if (move > elDistance) {

                    if (el.next().length) {
                        el.siblings().css('position', 'relative');
                        if (!el.next().is(':animated')) {

                            /* Animate and swap */

                            el.next().animate({ 'top': -elDistance}, 150, function () {
                                $(this).insertBefore(el).css({
                                    'top': ''
                                });
                                start_y = start_y + elDistance;
                                el.css('top', '-=' + elDistance);
                                onMove();
                            });
                        }
                    }
                }
                
                if (e) {
                    e.preventDefault();
                }
            }

            function onEnd(e) {
                $('body').off('.sortable');
                
                /* Execute onEnd only after all animation is complete */
                $('.sortable').children().promise().done(function() {
                    console.log('complete')
                    el.animate({ 'top': "-=" + el.css('top')}, 150, function () {
                        el.css('top', 'auto').removeClass('inMotion').css({
                            'z-index': ''
                        });
                    });
                });

            }
        });
    };
})(jQuery);

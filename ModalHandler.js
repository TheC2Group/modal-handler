/* Modal Handler
 * version 1.0.1
 * https://github.com/cuth/modal-handler
 */
;(function (exports, $) {
    'use strict';
    var defaults = {
            overlayHTML: '<div class="Overlay"></div>',
            overlayActiveClass: 'active',
            modalSelector: '.Modal',
            modalActiveClass: 'active',
            verticallyCenterModal: true,
            zIndexStart: 1000,
            depth: 1
        },
        createOverlay = function () {
            var $overlay = $(this.opts.overlayHTML);
            $('body').append($overlay);
            this.$overlays = this.$overlays.add($overlay);
        },
        openOverlay = function (num) {
            if (num === this.$overlays.length) {
                createOverlay.call(this);
            }
            if (num < this.$overlays.length) {
                this.$overlays.eq(num).css('zIndex', num * 2 + this.opts.zIndexStart)
                    .addClass(this.opts.overlayActiveClass);
            }
        },
        closeOverlay = function (num, recursive) {
            this.$overlays.eq(num).removeClass(this.opts.overlayActiveClass);
            if (recursive && num > 0) {
                closeOverlay.call(this, num - 1, recursive);
            }
        },
        verticallyCenter = function (modal) {
            var $modal = $(modal),
                wHeight = $(window).height(),
                mHeight = $modal.outerHeight(),
                scrollTop = $(window).scrollTop();
            $modal.css('top', Math.max((wHeight - mHeight) / 2, 0) + scrollTop);
        },
        init = function () {
            this.$overlays = $();
            for (var x = 0; x < this.opts.depth; x += 1) {
                createOverlay.call(this);
            }
            this.count = 0;
        };
    exports.ModalHandler = function (options) {
        this.opts = $.extend({}, defaults, options);
        init.call(this);
    };
    exports.ModalHandler.prototype.open = function (modal) {
        var $modal = $(modal);
        if (!$modal.length || $modal.hasClass(this.opts.modalActiveClass)) return;
        openOverlay.call(this, this.count);
        $modal.css('zIndex', this.count * 2 + 1 + this.opts.zIndexStart)
            .addClass(this.opts.modalActiveClass);
        if (this.opts.verticallyCenterModal) {
            verticallyCenter.call(this, $modal);
        }
        this.count += 1;
    };
    exports.ModalHandler.prototype.close = function (modal) {
        var $modal = $(modal);
        if (!$modal.length) return;
        this.count -= 1;
        $modal.removeClass(this.opts.modalActiveClass);
        closeOverlay.call(this, this.count, false);
    };
    exports.ModalHandler.prototype.closeAll = function () {
        $(this.opts.modalSelector).removeClass(this.opts.modalActiveClass);
        closeOverlay.call(this, this.count - 1, true);
        this.count = 0;
    };
    exports.ModalHandler.prototype.verticallyCenter = verticallyCenter;
}(this, jQuery));
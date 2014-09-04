/*!
 * Modal Handler
 * version: 2.0.0
 * https://bitbucket.org/c2group/modal-handler
 */
/*exported MODAL */

var MODAL = (function ($) {
    'use strict';

    // private variables
    var _collection = {};
    var _index = 0;
    var _active = [];
    var _restore = [];

    var _options = {
        zIndexStart: 1000
    };

    // default options for a modal instance
    var _defaults = {
        overlayHTML: '<div class="Overlay"></div>',
        overlayActiveClass: 'isActive',
        modalOpenClass: 'isOpen',
        verticallyCenterModal: true
    };

    /**
     * get the distance to the top of the window if the modal was centered
     * @param {jQuery} $modal
     * @return {Number}
     */
    var getModalTop = function ($modal) {
        var wHeight = $(window).height();
        var mHeight = $modal.outerHeight();
        var scrollTop = $(window).scrollTop();
        return Math.max((wHeight - mHeight) / 2, 0) + scrollTop;
    };

    /**
     * get the active modal
     * @return {Object} modal instance
     */
    var getActiveModal = function () {
        if (_active.length === 0) return null;
        return _active[_active.length - 1];
    };

    /**
     * new Modal class
     */
    var Modal = function ($el, id, options) {

        // assign the modal element
        this.$el = $el;
        this.el = $el[0];

        // assign the modal id
        this.id = id;

        this.opts = $.extend({}, _defaults, options);

        this.isOpen = false;

        // create overlay
        this.$overlay = $(this.opts.overlayHTML);

        // append the modal and overlay to the body
        this.$overlay.appendTo(document.body);
        this.$el.appendTo(document.body);

        this.$el.attr({
            'tabindex': '-1',
            'role': 'dialog'
        });
    };

    /**
     * modal.open()
     */
    Modal.prototype.open = function () {
        if (this.isOpen) return;
        this.isOpen = true;

        // add modal to the stack
        _active.push(this);
        _restore.push(document.activeElement);

        var css = {
            'zIndex': _options.zIndexStart + _active.length
        };

        // activate overlay
        this.$overlay
            .css(css)
            .addClass(this.opts.overlayActiveClass);

        if (this.opts.verticallyCenterModal) {
            css.top = getModalTop(this.$el);
        }

        // open modal
        this.$el
            .css(css)
            .addClass(this.opts.modalOpenClass);
    };

    /**
     * modal.close()
     */
    Modal.prototype.close = function () {
        if (!this.isOpen) return;
        this.isOpen = false;

        // remove modal from the stack
        var indexOf = _active.indexOf(this);
        var restore;
        if (indexOf > -1) {
            _active.splice(indexOf, 1);
            restore = _restore.splice(indexOf, 1)[0];
        }

        // deactivate overlay
        this.$overlay.removeClass(this.opts.overlayActiveClass);

        // close modal
        this.$el.removeClass(this.opts.modalOpenClass);

        // restore the focus to the previously active element
        restore.focus();
    };

    /**
     * modal.verticallyCenter()
     */
    Modal.prototype.verticallyCenter = function () {
        this.$el.css({
            top: getModalTop(this.$el)
        });
    };

    /**
     * MODAL.config()
     * @param {Object} overwrite MODAL options
     */
    var _config = function (options) {
        $.extend(_options, options);
    };

    /**
     * MODAL.setDefaults()
     * @param {Object} overwrite modal defaults
     */
    var _setDefaults = function (defaults) {
        $.extend(_defaults, defaults);
    };

    /**
     * MODAL.create()
     * @param {jQuery} element or selector
     * @param {Object} options
     * @return {Object} new modal instance
     */
    var _create = function (el, options) {
        var id;

        // early return of cached modal
        if (typeof el === 'string') {
            id = (el.indexOf('#') === 0) ? el.substr(1) : el;
            if (_collection.hasOwnProperty(id)) {
                return _collection[id];
            }
        }

        var $el = $(el);
        if (!$el.length) return;

        // determine the modal id
        id = $el[0].id || '_' + (++_index);

        // return the modal if it exists
        if (_collection.hasOwnProperty(id)) {
            return _collection[id];
        }


        // create the modal
        var modal = new Modal($el, id, options);

        // add the modal to the collection
        _collection[id] = modal;

        return modal;
    };

    /**
     * MODAL.closeAll()
     */
    var _closeAll = function () {
        while (_active.length > 0) {
            getActiveModal().close();
        }
    };

    /**
     * MODAL.open()
     * @param {String} id
     */
    var _open = function (id) {
        if (!_collection.hasOwnProperty(id)) return;
        _collection[id].open();
    };

    /**
     * MODAL.close()
     * @param {String} id
     */
    var _close = function (id) {
        if (!_collection.hasOwnProperty(id)) return;
        _collection[id].close();
    };

    /**
     * MODAL.verticallyCenter()
     * @param {String} id
     */
    var _verticallyCenter = function (id) {
        if (!_collection.hasOwnProperty(id)) return;
        _collection[id].verticallyCenter();
    };

    // bind events to trap the focus and close on 'esc'
    $(document).on('keydown', function (e) {
        if (e.which !== 27) return;
        var activeModal = getActiveModal();
        if (!activeModal) return;
        activeModal.close();
    }).on('focus', '*', function (e) {
        var activeModal = getActiveModal();
        if (!activeModal || activeModal.el.contains(e.target)) return;
        e.stopPropagation();
        activeModal.el.focus();
    });

    return {
        'config': _config,
        'setDefaults': _setDefaults,
        'create': _create,
        'closeAll': _closeAll,
        'open': _open,
        'close': _close,
        'verticallyCenter': _verticallyCenter
    };

}(jQuery));

/* Modal Handler
 * version: 2.0.0
 * https://github.com/cuth/modal-handler
 */

var MODAL = (function ($) {
    'use strict';

    // private variables
    var _collection = {};
    var _index = 0;
    var _active = [];

    var _options = {
        zIndexStart: 1000
    };

    // default options for a modal instance
    var _defaults = {
        overlayHTML: '<div class="Overlay"></div>',
        overlayActiveClass: 'isActive',
        modalOpenClass: 'isOpen',
        verticallyCenterModal: true,
    };

    /**
     * vertically center the modal
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
     * new Modal class
     */
    var _Modal = function ($el, id, options) {

        // assign the modal element
        this.$el = $el;

        // assign the modal id
        this.id = id;

        this.opts = $.extend({}, _defaults, options);

        this.isOpen = false;

        // create overlay
        this.$overlay = $(this.opts.overlayHTML);

        // append the modal and overlay to the body
        this.$overlay.appendTo(document.body);
        this.$el.appendTo(document.body);
    };

    /**
     * modal.open()
     */
    _Modal.prototype.open = function () {
        if (this.isOpen) return;
        this.isOpen = true;

        // add modal to the stack
        _active.push(this);

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
    _Modal.prototype.close = function () {
        if (!this.isOpen) return;
        this.isOpen = false;

        // remove modal from the stack
        var indexOf = _active.indexOf(this);
        if (indexOf > -1) {
            _active.splice(indexOf, 1);
        }

        // deactivate overlay
        this.$overlay.removeClass(this.opts.overlayActiveClass);

        // close modal
        this.$el.removeClass(this.opts.modalOpenClass);
    };

    /**
     * modal.verticallyCenter()
     */
    _Modal.prototype.verticallyCenter = function () {
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
     * @return {Object} new modal instance
     */
    var _create = function (el, options) {

        var $el = $(el);
        if (!$el.length) return;

        // determine the modal id
        var id = $el[0].id || '_' + (++_index);

        /*if (typeof el === 'string') {
            id = (el.indexOf('#') === 0) ? el.substr(1) : el;
        } else if (typeof el === ) {
            id = el.id || '_' + (++_index);
        } else if (el instanceOf $ && el.length > 0) {
            id = el[0].id || '_' + (++_index);
        }*/

        // return the modal if it exists
        if (_collection.hasOwnProperty(id)) {
            return _collection[id];
        }


        // create the modal
        var modal = new _Modal($el, id, options);

        // add the modal to the collection
        _collection[id] = modal;

        return modal;
    };

    /**
     * MODAL.closeAll()
     */
    var _closeAll = function () {
        while (_active.length > 0) {
            _active[_active.length - 1].close();
        }
    };

    /**
     * MODAL.open(id)
     * @param {String} id
     */
    var _open = function (id) {
        if (!_collection.hasOwnProperty(id)) return;
        _collection[id].open();
    };

    /**
     * MODAL.close(id)
     * @param {String} id
     */
    var _close = function (id) {
        if (!_collection.hasOwnProperty(id)) return;
        _collection[id].close();
    };

    /**
     * MODAL.verticallyCenter(id)
     * @param {String} id
     */
    var _verticallyCenter = function (id) {
        if (!_collection.hasOwnProperty(id)) return;
        _collection[id].verticallyCenter();
    };

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

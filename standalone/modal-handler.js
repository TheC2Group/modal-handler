(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.MODAL = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*!
 * Modal Handler
 * https://github.com/TheC2Group/modal-handler
 * @version 3.0.1
 * @license MIT (c) The C2 Group (c2experience.com)
 */

'use strict';

var $ = window.jQuery;
var eventHandler = window.eventHandler;

var handler = eventHandler({});

// private variables
var _collection = {};
var _index = 0;
var _active = [];
var _restore = [];

var _options = {
    zIndexStart: 1000,
    appendTo: (document.forms.length > 0 && document.forms[0].parentElement === document.body) ? document.forms[0] : document.body // Try to detect .NET webforms and append to the .NET form
};

// default options for a modal instance
var _defaults = {
    overlayHTML: '<div class="Overlay" data-state="off"></div>',
    attr: 'data-state',
    onState: 'on',
    offState: 'off',
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

    if (this.opts.overlayHTML) {
        // create overlay
        this.$overlay = $(this.opts.overlayHTML);

        // append the modal and overlay to the body
        this.$overlay.appendTo(_options.appendTo);
    }

    this.$el.appendTo(_options.appendTo);

    this.$el.attr({
        'tabindex': '-1',
        'role': 'dialog'
    });
};

eventHandler(Modal);

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

    if (this.opts.overlayHTML) {
        // activate overlay
        this.$overlay
            .css(css)
            .attr(this.opts.attr, this.opts.onState);
    }

    if (this.opts.verticallyCenterModal) {
        css.top = getModalTop(this.$el);
    }

    // open modal
    this.$el
        .css(css)
        .attr(this.opts.attr, this.opts.onState);

    this.emit('open');
    handler.emit('open', this);
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

    if (this.opts.overlayHTML) {
        // deactivate overlay
        this.$overlay.attr(this.opts.attr, this.opts.offState);
    }

    // close modal
    this.$el.attr(this.opts.attr, this.opts.offState);

    // restore the focus to the previously active element
    restore.focus();

    this.emit('close');
    handler.emit('close', this);
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
 * MODAL.closeActive()
 */
var _closeActive = function () {
    var active = getActiveModal();
    if (active) {
        active.close();
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
}).on('focus', 'body', function (e) {
    var activeModal = getActiveModal();
    if (!activeModal || activeModal.el.contains(e.target)) return;
    e.stopPropagation();
    activeModal.el.focus();
});

module.exports = $.extend(handler, {
    config: _config,
    setDefaults: _setDefaults,
    create: _create,
    closeAll: _closeAll,
    closeActive: _closeActive,
    open: _open,
    close: _close,
    verticallyCenter: _verticallyCenter
});

},{}]},{},[1])(1)
});
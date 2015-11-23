var $ = require('jquery');
var MODAL = require('../../cjs/modal-handler.js');

MODAL.config({
    'zIndexStart': 50
});

MODAL.setDefaults({
    'modalOpenClass': 'isActive'
});

$(document).on('click', 'a[href^="#Modal-"]', function (e) {
    e.preventDefault();
    var modal = MODAL.create($(this).attr('href'));

    // cause a repaint
    modal.el.getBoundingClientRect();

    modal.open();
})
.on('click', 'a[href="#CloseModal"]', function (e) {
    e.preventDefault();
    MODAL.close($(this).closest('.CustomModal')[0].id);
})
.on('click', '.Overlay', function () {
    MODAL.closeAll();
});

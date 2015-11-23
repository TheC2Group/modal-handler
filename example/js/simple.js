var $ = require('jquery');
var MODAL = require('../../cjs/modal-handler.js');

MODAL.on('open', function (modal) {
    console.log(modal);
});

MODAL.on('close', function (modal) {
    console.log(modal);
});

var modal = MODAL.create('#Modal');

modal.on('open', function () {
    console.log('open');
});

modal.on('close', function () {
    console.log('close');
});

modal.$el.on('click', '.Close', function (e) {
    e.preventDefault();
    modal.close();
});

$('#Trigger').on('click', function (e) {
    e.preventDefault();
    modal.open();
});

$(document).on('click', '.Overlay', function () {
    MODAL.closeActive();
});

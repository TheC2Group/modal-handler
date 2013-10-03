var modals = new ModalHandler({
    modalSelector: '.CustomModal',
    depth: 2
});

$(document).on('click', 'a[href^="#Modal-"]', function (e) {
    e.preventDefault();
    modals.open($(this).attr('href'));
})
.on('click', 'a[href="#CloseModal"]', function (e) {
    e.preventDefault();
    modals.close($(this).parents(modals.opts.modalSelector));
})
.on('click', '.Overlay', function () {
    modals.closeAll();
});
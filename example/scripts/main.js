MODAL.config({
    'zIndexStart': 50
});

MODAL.setDefaults({
    'modalOpenClass': 'isActive'
});

$(document).on('click', 'a[href^="#Modal-"]', function (e) {
    e.preventDefault();
    var modal = MODAL.create($(this).attr('href'));

    // The setTimeout allows the CSS animation to run on the new element
    setTimeout(function () {
        modal.open();
    }, 0);
})
.on('click', 'a[href="#CloseModal"]', function (e) {
    e.preventDefault();
    MODAL.close($(this).closest('.CustomModal')[0].id);
})
.on('click', '.Overlay', function () {
    MODAL.closeAll();
});

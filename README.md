# ModalHandler

This simple javascript constructor gives you an object that you can use to open and close modal windows. Opening a modal will add a specific class to the modal that you are opening and to the overlay that is triggered. Closing a model will remove the classes from the modal and overlay. Modal Handler also aids in having multiple modal windows open at a time as it will increase the z-index for every new window.

The benefit of using classes to open and close a modal rather than directly changing the style attribute is to more easily utilize CSS and CSS transitions. Responsive sites will also benifit from using classes rather than applying inline style. However, `z-index` and `top` are applied inline directly on the elements.

## Set Up:

1. Require jQuery
2. Add javascript in `ModalHandler.js`
3. Call the ModalHandler constructor with options

## Options object

### overlayHTML *string*
This is the HTML that is generated for each overlay element that is built. Use the `depth` option to specify how many overlays are built on `init`.
_Default_: `'<div class="Overlay"></div>'`

### overlayActiveClass *string*
This is the class that is added or removed to an overlay when a modal is activated or deactivated.
_Default_: `'active'`

### modalSelector *string*
This is the selector that is used to collect all the modal elements.
_Default_: `'.Modal'`

### modalActiveClass *string*
This is the class that is added or removed to an modal when it is activated or deactivated.
_Default_: `'active'`

### verticallyCenterModal *boolean*
This allow you to turn on and off calculating a style top value for each modal.
_Default_: `true`

### zIndexStart *number*
Choose the z-index value that is applied to each modal and overlay plus the depth count.
_Default_: `1000`

### depth *number*
Specify how many modals deep you expect the modals to get in any instance. This builds the however many overlays on `init`. The reason you would want this already built is that it will work better with CSS transitions.
_Default_: 1


## Prototype functions

### open(modal)
Call this method with the modal you want to open as the only parameter. The parameter can be a selector, DOM element or jQuery object.

### close(modal)
Call this method with the modal you want to close as the only parameter. The parameter can be a selector, DOM element or jQuery object.

### closeAll()
This will close all open modals using the `modalSelector` property on the options object.

## Custom javascript code example

```javascript
var modals = new ModalHandler({
    modalSelector: '.CustomModal',
    depth: 2
});

$(document).on('click', 'a[href^="#Modal-"]', function (e) {
    e.preventDefault();
    modals.open($(this).attr('href'));
})
.on('click', 'span.CloseModal', function () {
    modals.close($(this).parents(modals.opts.modalSelector));
});
```
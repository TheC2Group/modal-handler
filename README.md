modal-handler
=============

* Allow modals to be added anywhere on the page
* Handle z-index for multiple modals
* Trap the focus inside the modal
* Restore the focus to the active element when modal is closed
* Allow the `esc` key to close the active modal
* Uses jQuery


MODAL
-----
This is the global MODAL object. Don't use this to do individual modal tasks like open, close and verticallyCenter if you have access to the modal instance.

### MODAL.config()
_param_ {Object} overwrite MODAL options

### MODAL.setDefaults()
_param_ {Object} overwrite modal defaults

### MODAL.create()
_param_ {jQuery} element or selector  
_param_ {Object} options  
_return_ {Object} new modal instance

### MODAL.closeAll()

### MODAL.closeActive()

### MODAL.open()
_param_ {String} id

### MODAL.close()
_param_ {String} id

### MODAL.verticallyCenter()
_param_ {String} id


modal
-----
This is the modal instance created from MODAL.create().

### modal.open()
### modal.close()
### modal.verticallyCenter()


MODAL options
-------------
```js
{
    zIndexStart: 1000
}
```


modal defaults
--------------
```js
{
    overlayHTML: '<div class="Overlay"></div>',
    overlayActiveClass: 'isActive',
    modalOpenClass: 'isOpen',
    verticallyCenterModal: true
}
```


a11y notes
----------
[Making an accessible dialog box](http://www.nczonline.net/blog/2013/02/12/making-an-accessible-dialog-box/)

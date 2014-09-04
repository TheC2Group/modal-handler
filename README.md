modal-handler
=============

* Allow modals to be added anywhere on the page
* Trap the focus inside the modal
* Restore the focus to the active element when modal is closed
* Allow the `esc` key to close the active modal


MODAL
-----
This is the global MODAL object. Don't use this to do individual modal tasks like open, close and verticallyCenter if you have access to the modal instance.

### MODAL.config()
@param {Object} overwrite MODAL options

### MODAL.setDefaults()
@param {Object} overwrite modal defaults

### MODAL.create()
@param {jQuery} element or selector
@param {Object} options
@return {Object} new modal instance

### MODAL.closeAll()

### MODAL.open()
@param {String} id

### MODAL.close()
@param {String} id

### MODAL.verticallyCenter()
@param {String} id


modal
-----
This is the modal instance created from MODAL.create().

### modal.open()
### modal.close()
### modal.verticallyCenter()


a11y notes
----------
[Making an accessible dialog box](http://www.nczonline.net/blog/2013/02/12/making-an-accessible-dialog-box/)

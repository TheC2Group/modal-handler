modal-handler
=============

* Allow modals to be added anywhere on the page
* Handle z-index for multiple modals
* Trap the focus inside the modal
* Restore the focus to the active element when modal is closed
* Allow the `esc` key to close the active modal
* CommonJS module


MODAL
-----

```js
var MODAL = require('modal-handler');
``` 

### MODAL.config()
_param_ {Object} overwrite MODAL options  

### MODAL.setDefaults()
_param_ {Object} overwrite modal defaults  

### MODAL.create()
_param_ {jQuery} element or selector  
_param_ {Object} options  
_return_ {Object} new modal instance  

```js
// example
var modal = MODAL.create('#Modal', {
    modalOpenClass: 'isActive'
});
```

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

```js
var modal = MODAL.create('#Modal');
```

### modal.open()
### modal.close()
### modal.verticallyCenter()


MODAL options
-------------

```js
{
    zIndexStart: 1000,
    appendTo: (document.forms.length > 0 && document.forms[0].parentElement === document.body) ? document.forms[0] : document.body // Try to detect .NET webforms and append to the .NET form
}
```


modal defaults
--------------

```js
{
    overlayHTML: '<div class="Overlay" data-state="off"></div>',
    attr: 'data-state',
    onState: 'on',
    offState: 'off',
    verticallyCenterModal: true
}
```


a11y notes
----------

[Making an accessible dialog box](http://www.nczonline.net/blog/2013/02/12/making-an-accessible-dialog-box/)  


install
-------

```
npm install modal-handler
```

standalone
----------

Build a standalone file

```
browserify modal-handler.js --outfile standalone/modal-handler.js --standalone MODAL --exclude jquery
```

```html
<script src="https://code.jquery.com/jquery-2.1.4.min.js"></script>
<script src="standalone/modal-handler.js"></script>
```

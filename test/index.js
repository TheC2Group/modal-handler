var assert = require('assert');

describe('Modal Handler', function() {

    it('should open the modal', function(done) {
        browser
            .url('/example/simple.html')
            .getAttribute('#Modal', 'data-state').then(function (val) {
                assert(val === 'off');
            })
            .click('#Trigger')
            .getAttribute('#Modal', 'data-state').then(function (val) {
                assert(val === 'on');
            })
            .call(done);
    });
});

/*
    $ npm i -g selenium-standalone http-server webdriverio

    $ selenium-standalone start

    $ http-server

    $ wdio
*/

var assert = require('assert');

describe('Modal Handler', function() {

    it('should open the modal', function(done) {
        browser
            .url('/example/simple.html')
            .getAttribute('#Modal', 'data-state')
            .then(function (val) {
                assert(val === 'off');
            })
            .click('#Trigger')
            .getAttribute('#Modal', 'data-state')
            .then(function (val) {
                assert(val === 'on');
            })
            .call(done);
    });

    it('should close the modal', function(done) {
        browser
            .url('/example/simple.html')
            .click('#Trigger')
            .getAttribute('#Modal', 'data-state')
            .then(function (val) {
                assert(val === 'on');
            })
            .click('=Close modal')
            .getAttribute('#Modal', 'data-state')
            .then(function (val) {
                assert(val === 'off');
            })
            .call(done);
    });

    it('should return focus to original link', function(done) {
        browser
            .url('/example/simple.html')
            .click('#Trigger')
            .pause(1000)
            .click('=Close modal')
            .pause(1000)
            .elementActive()
            .then(function (active) {
                assert(!!active);
            })
            .call(done);
    });

    it('should open two modals then close the top one', function(done) {
        browser
            .url('/example/on-the-fly.html')
            .click('=Open Modal')
            .waitForVisible('=Internal Modal')
            .click('=Internal Modal')
            .waitForVisible('#Modal-secondModal')
            .getAttribute('#Modal-secondModal', 'data-state')
            .then(function (val) {
                assert(val === 'on');
            })
            .click('=Close just this modal')
            .getAttribute('#Modal-secondModal', 'data-state')
            .then(function (val) {
                assert(val === 'off');
            })
            .getAttribute('#Modal-firstModal', 'data-state')
            .then(function (val) {
                assert(val === 'on');
            })
            .call(done);
    });
});

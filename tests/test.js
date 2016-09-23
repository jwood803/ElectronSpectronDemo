const Application = require("spectron").Application;
const assert = require("assert");
const path = require('path');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

var electronPath = path.join(__dirname, '..', 'node_modules', '.bin', 'electron')
if (process.platform === 'win32') electronPath += '.cmd'

// Path to your application
var appPath = path.join(__dirname, '..')

var app = new Application({
            path: electronPath,
            args: [appPath]
        });

global.before(function () {
    chai.should();
    chai.use(chaiAsPromised);
});

describe('Test Example', function () {
    beforeEach(function () {
        return app.start();
    });

    afterEach(function () {
        return app.stop();
    });

  it('opens a window', function () {
    return app.client.waitUntilWindowLoaded()
      .getWindowCount().should.eventually.equal(1);
  });

    // it('should test', function () {
    //     app.start().then(function () {
    //         return app.client.getTitle();
    //     })
    //     .then(function (title) {
    //         title.should.equal('2');
    //     });            
    // });
});
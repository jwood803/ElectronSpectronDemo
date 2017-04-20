const Application = require("spectron").Application;
const path = require('path');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const testPage = require('./test.page.js');

var page = new testPage();

var electronPath = path.join(__dirname, '..', 'node_modules', '.bin', 'electron');

if (process.platform === 'win32') {
    electronPath += '.cmd';
}

// Path to your application
var appPath = path.join(__dirname, '..');

var app = new Application({
            path: electronPath,
            args: [appPath]
        });

global.before(function () {
    chai.should();
    chai.use(chaiAsPromised);
    page.setApp(app);
});

describe('Test Example', function () {
  beforeEach(function (done) {
      app.start().then(function() { done(); } );
  });

  afterEach(function (done) {
      app.stop().then(function() { done(); });
  });

  it('opens a window', function () {
    app.client.debug();

    page.getWindowCount().should.eventually.equal(page.windowCount);
  });

  it('logs the title', function () {
      app.client.waitUntilWindowLoaded().getTitle().then(function (txt) { console.warn(txt); });
  });

    it('tests the NOT title', function () {
        app.client.waitUntilWindowLoaded().getTitle().then(function (txt) { chai.expect(txt).to.not.equal("NOT" + page.pageTitle); });
    });

    it('should fail: tests the NOT title', function () {
        app.client.waitUntilWindowLoaded().getTitle().then(function (txt) { chai.expect(txt).to.equal("NOT" + page.pageTitle); });
    });

    it('tests the page title', function () {
        page.getApplicationTitle().should.eventually.equal(page.pageTitle);
    });

    it('tests the NOT page title', function () {
        page.getApplicationTitle().should.eventually.not.equal("NOT" + page.pageTitle);
    });

    it('should fail: tests the NOT page title', function () {
        page.getApplicationTitle().should.eventually.equal("NOT" + page.pageTitle);
    });

    it('clicks the button', function () {
    page.clickButtonAndGetText().should.eventually.equal(page.helloText);
  });
});
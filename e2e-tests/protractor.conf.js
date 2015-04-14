exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['scenarios.js'],
  baseUrl: 'http://localhost:8081',
  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  },
  allScriptsTimeout: 30000,
  getPageTimeout: 30000,
  rootElement: 'html',
  onPrepare: function() {
// implicit and page load timeouts
    browser.manage().timeouts().pageLoadTimeout(40000);
    browser.manage().timeouts().implicitlyWait(25000);

// for non-angular page
//    browser.ignoreSynchronization = true;

// sign in before all tests

  }
}
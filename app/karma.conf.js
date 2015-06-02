// list of files / patterns to load in the browser
module.exports = function(config) {
    config.set({
        frameworks: ['jasmine', 'requirejs'],
        browsers: ['PhantomJS'],

        files: [
            {pattern: 'bower_components/**/*.js', included: false},
            {pattern: 'controllers/**/*.js', included: false},
            {pattern: 'tests/**/*test.js', included: false},
            {pattern: 'tests/**/*mock.js', included: false},
            {pattern: 'tests/**/*dummy.json', included: false},



            'tests/require-config.js'
        ]
    });
};
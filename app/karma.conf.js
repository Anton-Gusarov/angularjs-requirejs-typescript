// list of files / patterns to load in the browser
module.exports = function(config) {
    config.set({
        frameworks: ['jasmine', 'requirejs'],

        files: [
            {pattern: 'bower_components/**/*.js', included: false},
            {pattern: 'controllers/**/*.js', included: false},
            {pattern: 'tests/**/*test.js', included: false},

            'tests/require-config.js'
        ]
    });
};
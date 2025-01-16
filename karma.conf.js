module.exports = function (config) {
  config.set({
    frameworks: ['jasmine', '@angular-devkit/build-angular'],

    plugins: [
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-jasmine-html-reporter',
      'karma-coverage',
      '@angular-devkit/build-angular/plugins/karma'
    ],

    files: [
      { pattern: '**/*.spec.ts', watched: false }
    ],

    proxies: {
      '/assets': '/base/src/assets'
    },

    reporters: ['progress', 'kjhtml', 'coverage'],

    coverageReporter: {
      dir: require('path').join(__dirname, './coverage'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' }
      ]
    },

    browsers: ['ChromeHeadless'],

    singleRun: false,

    restartOnFileChange: true
  });
};

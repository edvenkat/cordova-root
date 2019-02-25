#!/usr/bin/env node

'use strict';

var fs = require('fs');
var path = require('path');
var utilities = require("./lib/utilities");

var config = fs.readFileSync('config.xml').toString();
var name = utilities.getValue(config, 'name');

var IOS_DIR = 'platforms/ios';

var PLATFORM = {
  IOS: {
    dest: [
      IOS_DIR + '/' + name + '/container/GTM-TGT4ZB4.json'
    ],
    src: [
      'GTM-TGT4ZB4.json'
    ]
  }
};

module.exports = function (context) {
  //get platform from the context supplied by cordova
  var platforms = context.opts.platforms;
  // Copy key files to their platform specific folders
  if (platforms.indexOf('ios') !== -1 && utilities.directoryExists(IOS_DIR)) {
    console.log('Preparing Firebase on iOS');
    utilities.copyKey(PLATFORM.IOS);
  }
};
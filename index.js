/*
 * gulp-remove-logging
 * Based on ehynds/grunt-remove-logging
 *
 * Copyright 2016, Valerian Saliou
 * Author: Valerian Saliou <valerian@valeriansaliou.name>
 */


"use strict";


var gulp_util       = require("gulp-util");
var through         = require("through2");

var remove_logging  = require("./lib/removelogging");


module.exports = function(opts) {
  opts = opts || {};

  return through.obj(function(file, encoding, callback) {
    if (file.isNull()) {
      return callback(null, file);
    }

    if (file.isBuffer()) {
      return callback(
        new gulp_util.PluginError(
          "gulp-remove-logging", "Buffers not supported"
        )
      );
    }

    if (file.isStream()) {
      var streamer = remove_logging.proceed(file, opts);

      streamer.on(
        "error", this.emit.bind(this, "error")
      );

      file.contents = file.contents.pipe(streamer);
    }

    return callback(null, file);
  });
};

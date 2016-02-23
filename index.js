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

  // Use console as the default namespace
  if (!("namespace" in opts)) {
    opts.namespace = [
      "console",
      "window.console"
    ];
  }

  // Default methods
  if (!("methods" in opts) || (typeof opts.methods !== "object")) {
    opts.methods = [
      "log",
      "info",
      "warn",
      "error",
      "assert",
      "count",
      "clear",
      "group",
      "groupEnd",
      "groupCollapsed",
      "trace",
      "debug",
      "dir",
      "dirxml",
      "profile",
      "profileEnd",
      "time",
      "timeEnd",
      "timeStamp",
      "table",
      "exception"
    ];
  }

  if (!("verbose" in opts)) {
    opts.verbose = true;
  }

  var regex_console = new RegExp(
    ("(" + opts.namespace.join("|") + ")" +
        ".(?:" + opts.methods.join("|") +
        ")\\s{0,}\\([^;]*\\)(?!\\s*[;,]?\\s*\\/\\*\\s*" +
        "RemoveLogging:skip\\s*\\*\\/)\\s{0,};?"),
    "gi"
  );

  // Proceed transform
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
      var streamer = remove_logging.proceed(
        file, opts, regex_console
      );

      streamer.on(
        "error", this.emit.bind(this, "error")
      );

      file.contents = file.contents.pipe(streamer);
    }

    return callback(null, file);
  });
};

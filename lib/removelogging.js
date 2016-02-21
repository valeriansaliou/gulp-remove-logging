/*
 * gulp-remove-logging
 * Based on ehynds/grunt-remove-logging
 *
 * Copyright 2016, Valerian Saliou
 * Author: Valerian Saliou <valerian@valeriansaliou.name>
 */


"use strict";


var replace_stream  = require("replacestream");


exports.proceed = function(file, opts) {
  var counter = 0,
      regex_console;

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

  regex_console = new RegExp(
    ("(" + opts.namespace.join("|") + ")" +
        ".(?:" + opts.methods.join("|") +
        ")\\s{0,}\\([^;]*\\)(?!\\s*[;,]?\\s*\\/\\*\\s*" +
        "RemoveLogging:skip\\s*\\*\\/)\\s{0,};?"),
    "gi"
  );

  return replace_stream(regex_console, function() {
    counter++;

    return (
      opts.replaceWith || ""
    );
  });
};

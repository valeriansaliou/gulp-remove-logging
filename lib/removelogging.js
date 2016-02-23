/*
 * gulp-remove-logging
 * Based on ehynds/grunt-remove-logging
 *
 * Copyright 2016, Valerian Saliou
 * Author: Valerian Saliou <valerian@valeriansaliou.name>
 */


"use strict";


var replace_stream  = require("replacestream");


exports.proceed = function(file, opts, regex) {
  return replace_stream(
    regex, (opts.replaceWith || "")
  );
};

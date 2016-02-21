/*
 * gulp-remove-logging
 * Based on ehynds/grunt-remove-logging
 *
 * Copyright 2016, Valerian Saliou
 * Author: Valerian Saliou <valerian@valeriansaliou.name>
 */


"use strict";


var assert               = require("assert");
var event_stream         = require("event-stream");
var File                 = require("vinyl");
var gulp_remove_logging  = require("..");


describe("gulp-remove-logging", function() {
  var scenarios = require("./scenarios.json");

  scenarios.all.forEach(function(cur_test) {
    it(("should properly transform " + cur_test[0]), function(done) {
      this.timeout(500);

      var mock_file = new File({
        contents : event_stream.readArray([
          cur_test[0]
        ])
      });

      var stream = gulp_remove_logging(cur_test[1]);

      stream.on("data", function (file) {
        assert.equal(
          file.contents.toString(),
          cur_test[2],
          (cur_test[0] + " should match expected output")
        );
      });

      stream.on("error", function(error) {
        done(
          error || (new Error("Broken pipeline"))
        );
      });

      stream.on("end", function() {
        done();
      });

      stream.write(mock_file);
    });
  });
});

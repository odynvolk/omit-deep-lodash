process.env.TZ = "Europe/Stockholm";

require("mocha-cakes-2");

const chai = require("chai");

chai.config.truncateThreshold = 0;
chai.config.includeStack = true;

chai.should();

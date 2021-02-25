const omit = require("lodash/omit");
const isNil = require("lodash/isNil");
const isPlainObject = require("lodash/isPlainObject");
const isFunction = require("lodash/isFunction");

module.exports = function omitDeepLodash(input, props) {
  function omitDeepOnOwnProps(obj) {
    if (typeof input === "undefined") {
      return input;
    }

    if (!Array.isArray(obj) && !isPlainObject(obj)) {
      return obj;
    }

    if (Array.isArray(obj)) {
      return omitDeepLodash(obj, props);
    }

    const o = {};
    for (const [key, value] of Object.entries(obj)) {
      o[key] = !isNil(value) ? omitDeepLodash(value, props) : value;
    }

    return omit(o, props);
  }

  if (arguments.length > 2) {
    props = Array.prototype.slice.call(arguments).slice(1);
  }

  if (Array.isArray(input)) {
    return input
      .filter((v, k) => {
        if (isFunction(props)) {
          return !props(v, k);
        }
        return v;
      })
      .map(omitDeepOnOwnProps);
  }

  return omitDeepOnOwnProps(input);
};

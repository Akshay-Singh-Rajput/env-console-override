"use strict";

var overWriteConsoleMethods = function overWriteConsoleMethods() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _options$logOptions = options.logOptions,
    logOptions = _options$logOptions === void 0 ? {} : _options$logOptions,
    _options$warnOptions = options.warnOptions,
    warnOptions = _options$warnOptions === void 0 ? {} : _options$warnOptions,
    _options$errorOptions = options.errorOptions,
    errorOptions = _options$errorOptions === void 0 ? {} : _options$errorOptions,
    _options$infoOptions = options.infoOptions,
    infoOptions = _options$infoOptions === void 0 ? {} : _options$infoOptions,
    _options$whitelistEnv = options.whitelistEnvs,
    whitelistEnvs = _options$whitelistEnv === void 0 ? ['production'] : _options$whitelistEnv,
    _options$env = options.env,
    env = _options$env === void 0 ? process.env.NODE_ENV || 'development' : _options$env;
  var consoleOriginal = {
    log: console.log,
    warn: console.warn,
    error: console.error,
    info: console.info
  };
  var shouldOverwrite = function shouldOverwrite() {
    return whitelistEnvs.includes(env);
  };
  var overwriteMethod = function overwriteMethod(method, methodOptions) {
    var _methodOptions$custom = methodOptions.customMessage,
      customMessage = _methodOptions$custom === void 0 ? 'Default Message' : _methodOptions$custom,
      _methodOptions$asciiA = methodOptions.asciiArt,
      asciiArt = _methodOptions$asciiA === void 0 ? '' : _methodOptions$asciiA,
      _methodOptions$custom2 = methodOptions.customFunction,
      customFunction = _methodOptions$custom2 === void 0 ? null : _methodOptions$custom2,
      _methodOptions$clearO = methodOptions.clearOnly,
      clearOnly = _methodOptions$clearO === void 0 ? false : _methodOptions$clearO;
    console[method] = function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      if (shouldOverwrite()) {
        console.clear();
        if (clearOnly) {
          return;
        }
        if (customFunction && typeof customFunction === 'function') {
          customFunction.apply(void 0, [consoleOriginal[method]].concat(args));
        } else {
          consoleOriginal[method](customMessage);
          if (asciiArt) {
            consoleOriginal[method](asciiArt);
          }
        }
      } else {
        consoleOriginal[method].apply(consoleOriginal, args);
      }
    };
  };
  overwriteMethod('log', logOptions);
  overwriteMethod('warn', warnOptions);
  overwriteMethod('error', errorOptions);
  overwriteMethod('info', infoOptions);
};
module.exports = overWriteConsoleMethods;

const overWriteConsoleMethods = (options = {}) => {
    const {
        logOptions = {},
        warnOptions = {},
        errorOptions = {},
        infoOptions = {},
        whitelistEnvs = [ 'production' ],
        env = process.env.NODE_ENV || 'development'
    } = options;

    const consoleOriginal = {
        log: console.log,
        warn: console.warn,
        error: console.error,
        info: console.info,
    };

    const shouldOverwrite = () => {
        return whitelistEnvs.includes(env);
    };

    const overwriteMethod = (method, methodOptions) => {
        const {
            customMessage = 'Default Message',
            asciiArt = '',
            customFunction = null,
            clearOnly = false
        } = methodOptions;

        console[ method ] = (...args) => {
            if (shouldOverwrite()) {
                console.clear();
                if (clearOnly) {
                    return;
                }
                if (customFunction && typeof customFunction === 'function') {
                    customFunction(consoleOriginal[ method ], ...args);
                } else {
                    consoleOriginal[ method ](customMessage);
                    if (asciiArt) {
                        consoleOriginal[ method ](asciiArt);
                    }
                }
            } else {
                consoleOriginal[ method ](...args);
            }
        };
    };

    overwriteMethod('log', logOptions);
    overwriteMethod('warn', warnOptions);
    overwriteMethod('error', errorOptions);
    overwriteMethod('info', infoOptions);
};

module.exports = overWriteConsoleMethods;

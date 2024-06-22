const overWriteConsoleMethods = require('./dist/index');

// overWriteConsoleMethods({
//     logOptions: {
//         customMessage: 'Production Log Message',
//         asciiArt: '    A     K    K\n   A A    K K  \n  AAAAA   KK   \n A     A  K K  \nA       A K   K'
//     },
//     whitelistEnvs: [ 'production' ],
//     env: 'production'
// });

// console.log("This will show a custom log message in production.");



// Example in production environment
process.env.NODE_ENV = 'production';

overWriteConsoleMethods({
    logOptions: {
        customMessage: 'Production Log Message',
        asciiArt: '    A     K   K\n   A A    K K  \n  AAAAA   KK   \n A     A  K K  \nA       A K   K'
    },
    warnOptions: {
        customMessage: 'Warning!',
    },
    errorOptions: {
        customFunction: (originalError, ...args) => {
            originalError('Custom Error Function Executed with args:', ...args);
        }
    },
    infoOptions: {
        customMessage: 'Information Message',
    },
    whitelistEnvs: [ 'production', 'staging' ]
});

console.log("This will show a custom log message in production or staging.");
console.warn("This will show a custom warning message in production or staging.");
console.error("This will execute a custom error function in production or staging.");
console.info("This will show a custom information message in production or staging.");

// Example in development environment
process.env.NODE_ENV = 'development';

overWriteConsoleMethods({
    logOptions: {
        customMessage: 'Development log message'
    },
    whitelistEnvs: [ 'production' ]
});

console.log("This will log normally in development.");

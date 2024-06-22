# env-console-override

A flexible NPM package to customize console outputs with custom messages, ASCII art, or custom functions based on a whitelist of environments.

## Installation

To install this package, use npm:

```Js
npm install env-console-override
```

# Basic Usage
```Js
const overWriteConsoleMethods = require('env-console-override');

overWriteConsoleMethods({
  logOptions: {
    customMessage: 'Production Log Message',
    asciiArt: '    A     K    K\n   A A    K K  \n  AAAAA   KK   \n A     A  K K  \nA       A K   K'
  },
  whitelistEnvs: ['production']
});

console.log("This will show a custom log message in production.");
```

### Options

#### Main Options

- **logOptions**: Configuration for `console.log`.
- **warnOptions**: Configuration for `console.warn`.
- **errorOptions**: Configuration for `console.error`.
- **infoOptions**: Configuration for `console.info`.
- **whitelistEnvs**: Array of environments where the console methods should be overwritten (default: `['production']`).
- **env**: Current environment (default: `process.env.NODE_ENV`).

#### Method Options

- **customMessage**: Custom message to display (default: `'Default Message'`).
- **asciiArt**: ASCII art to display.
- **customFunction**: Custom function to execute. Receives the original console method as the first argument and the original arguments as the rest.
- **clearOnly**: If `true`, only clears the console without displaying any message (default: `false`).



# Example Usage

```Js
const overWriteConsoleMethods = require('env-console-override');

// Example in production environment
process.env.NODE_ENV = 'production';

overWriteConsoleMethods({
  logOptions: {
    customMessage: 'Production Log Message',
    asciiArt: '    A     K    K\n   A A    K K  \n  AAAAA   KK   \n A     A  K K  \nA       A K   K'
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
  whitelistEnvs: ['production', 'staging']
});

console.log("This will show a custom log message in production or staging.");
console.warn("This will show a custom warning message in production or staging.");
console.error("This will execute a custom error function in production or staging.");
console.info("This will show a custom information message in production or staging.");

// Example in development environment
process.env.NODE_ENV = 'development';

overWriteConsoleMethods({
  logOptions: {
    customMessage: 'Development log message',
        clearOnly: true
  },
  whitelistEnvs: ['production']
});

console.log("This will log normally in development.");
```
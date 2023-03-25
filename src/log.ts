/* eslint no-console: 0 */
import * as config from './config';
import { Create, Level, Logger } from './log.type';

export const create: Create = (options = {}) => {
  const {
    colors = config.defaultColor,
    level = config.defaultLevel,
    prefix: prefixOutput = config.defaultPrefix,
  } = options;

  const logger: Logger = colors
    ? {
        colophonPart: (message) => `\x1b[90m${message}\x1b[0m`,
        debug: () => {},
        debugPart: (message) => `\x1b[34m${message}\x1b[0m`,
        error: () => {},
        errorPart: (message) => `\x1b[31m${message}\x1b[0m`,
        fail: () => {},
        failPart: (message) => `\x1b[31m${message}\x1b[0m`,
        info: () => {},
        infoPart: (message) => `\x1b[36m${message}\x1b[0m`,
        okay: () => {},
        okayPart: (message) => `\x1b[32m${message}\x1b[0m`,
        start: () => {},
        startPart: (message) => `\x1b[57m${message}\x1b[0m`,
        warn: () => {},
        warnPart: (message) => `\x1b[33m${message}\x1b[0m`,
      }
    : {
        colophonPart: (message) => message,
        debug: () => {},
        debugPart: (message) => message,
        error: () => {},
        errorPart: (message) => message,
        fail: () => {},
        failPart: (message) => message,
        info: () => {},
        infoPart: (message) => message,
        okay: () => {},
        okayPart: (message) => message,
        start: () => {},
        startPart: (message) => message,
        warn: () => {},
        warnPart: (message) => message,
      };

  const prefix = {
    debug: `[${logger.debugPart('DEBUG')}]`,
    error: `[${logger.errorPart('ERROR')}]`,
    fail: `[${logger.errorPart('FAIL')}]`,
    info: `[${logger.infoPart('INFO')}]`,
    okay: `[${logger.okayPart('OKAY')}]`,
    start: `[${logger.startPart('STRT')}]`,
    warn: `[${logger.warnPart('WARN')}]`,
  };

  if (prefixOutput) {
    switch (level) {
      case Level.Debug:
        logger.debug = (...optionalParams) =>
          console.debug(prefix.debug, ...optionalParams);
      case Level.Info:
        logger.info = (...optionalParams) =>
          console.info(prefix.info, ...optionalParams);
        logger.okay = (...optionalParams) =>
          console.info(prefix.okay, ...optionalParams);
        logger.start = (...optionalParams) =>
          console.info(prefix.start, ...optionalParams);
      case Level.Warning:
        logger.warn = (...optionalParams) =>
          console.warn(prefix.warn, ...optionalParams);
      case Level.Error:
        logger.error = (...optionalParams) =>
          console.error(prefix.error, ...optionalParams);
        logger.fail = (...optionalParams) =>
          console.error(prefix.fail, ...optionalParams);
    }
  } else {
    switch (level) {
      case Level.Debug:
        logger.debug = (...optionalParams) => console.debug(...optionalParams);
      case Level.Info:
        logger.info = (...optionalParams) => console.info(...optionalParams);
        logger.okay = (...optionalParams) => console.info(...optionalParams);
        logger.start = (...optionalParams) => console.info(...optionalParams);
      case Level.Warning:
        logger.warn = (...optionalParams) => console.warn(...optionalParams);
      case Level.Error:
        logger.error = (...optionalParams) => console.error(...optionalParams);
        logger.fail = (...optionalParams) => console.error(...optionalParams);
    }
  }

  return logger;
};

import { Level } from './log.type';

describe('log', () => {
  let debugSpy: jest.SpyInstance<
    void,
    [message?: any, ...optionalParams: any[]]
  >;
  let infoSpy: jest.SpyInstance<
    void,
    [message?: any, ...optionalParams: any[]]
  >;
  let warnSpy: jest.SpyInstance<
    void,
    [message?: any, ...optionalParams: any[]]
  >;
  let errorSpy: jest.SpyInstance<
    void,
    [message?: any, ...optionalParams: any[]]
  >;
  beforeEach(() => {
    jest.resetModules();
    debugSpy = jest.spyOn(console, 'debug').mockImplementation(() => {});
    infoSpy = jest.spyOn(console, 'info').mockImplementation(() => {});
    warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    debugSpy.mockReset();
    infoSpy.mockReset();
    warnSpy.mockReset();
    errorSpy.mockReset();
  });

  describe('`level`', () => {
    describe('`Level.Disabled`', () => {
      test('does not output', () => {
        const { create } = require('./log');
        const log = create({ level: Level.Disabled });
        log.debug('foo');
        log.info('foo');
        log.okay('foo');
        log.start('foo');
        log.warn('foo');
        log.error('foo');
        log.fail('foo');
        expect(debugSpy).not.toHaveBeenCalled();
        expect(infoSpy).not.toHaveBeenCalled();
        expect(warnSpy).not.toHaveBeenCalled();
        expect(errorSpy).not.toHaveBeenCalled();
      });
    });
    describe('`Level.Error`', () => {
      test('outputs errors', () => {
        const { create } = require('./log');
        const log = create({ level: Level.Error });
        log.debug('foo');
        log.info('foo');
        log.okay('foo');
        log.start('foo');
        log.warn('foo');
        log.error('foo');
        log.fail('foo');
        expect(debugSpy).not.toHaveBeenCalled();
        expect(infoSpy).not.toHaveBeenCalled();
        expect(warnSpy).not.toHaveBeenCalled();
        expect(errorSpy).toHaveBeenCalledTimes(2);
      });
    });
    describe('`Level.Warning`', () => {
      test('outputs errors and warnings', () => {
        const { create } = require('./log');
        const log = create({ level: Level.Warning });
        log.debug('foo');
        log.info('foo');
        log.okay('foo');
        log.start('foo');
        log.warn('foo');
        log.error('foo');
        log.fail('foo');
        expect(debugSpy).not.toHaveBeenCalled();
        expect(infoSpy).not.toHaveBeenCalled();
        expect(warnSpy).toHaveBeenCalledTimes(1);
        expect(errorSpy).toHaveBeenCalledTimes(2);
      });
    });
    describe('`Level.Info`', () => {
      test('outputs errors, warnings, and info', () => {
        const { create } = require('./log');
        const log = create({ level: Level.Info });
        log.debug('foo');
        log.info('foo');
        log.okay('foo');
        log.start('foo');
        log.warn('foo');
        log.error('foo');
        log.fail('foo');
        expect(debugSpy).not.toHaveBeenCalled();
        expect(infoSpy).toHaveBeenCalledTimes(3);
        expect(warnSpy).toHaveBeenCalledTimes(1);
        expect(errorSpy).toHaveBeenCalledTimes(2);
      });
    });
    describe('`Level.Debug`', () => {
      test('outputs everything', () => {
        const { create } = require('./log');
        const log = create({ level: Level.Debug });
        log.debug('foo');
        log.info('foo');
        log.okay('foo');
        log.start('foo');
        log.warn('foo');
        log.error('foo');
        log.fail('foo');
        expect(debugSpy).toHaveBeenCalledTimes(1);
        expect(infoSpy).toHaveBeenCalledTimes(3);
        expect(warnSpy).toHaveBeenCalledTimes(1);
        expect(errorSpy).toHaveBeenCalledTimes(2);
      });
    });
  });

  describe('colors', () => {
    describe('enabled', () => {
      test('outputs colorful messages', () => {
        const { create } = require('./log');
        const log = create({ colors: true });
        expect(log.colophonPart('foo')).toEqual('\x1b[90mfoo\x1b[0m');
        expect(log.debugPart('foo')).toEqual('\x1b[34mfoo\x1b[0m');
        expect(log.errorPart('foo')).toEqual('\x1b[31mfoo\x1b[0m');
        expect(log.failPart('foo')).toEqual('\x1b[31mfoo\x1b[0m');
        expect(log.infoPart('foo')).toEqual('\x1b[36mfoo\x1b[0m');
        expect(log.okayPart('foo')).toEqual('\x1b[32mfoo\x1b[0m');
        expect(log.startPart('foo')).toEqual('\x1b[57mfoo\x1b[0m');
        expect(log.warnPart('foo')).toEqual('\x1b[33mfoo\x1b[0m');
      });
    });
    describe('disabled', () => {
      test('outputs messages without color', () => {
        const { create } = require('./log');
        const log = create({ colors: false });
        expect(log.colophonPart('foo')).toEqual('foo');
        expect(log.debugPart('foo')).toEqual('foo');
        expect(log.errorPart('foo')).toEqual('foo');
        expect(log.failPart('foo')).toEqual('foo');
        expect(log.infoPart('foo')).toEqual('foo');
        expect(log.okayPart('foo')).toEqual('foo');
        expect(log.startPart('foo')).toEqual('foo');
        expect(log.warnPart('foo')).toEqual('foo');
      });
    });
  });

  describe('prefix', () => {
    describe('`true`', () => {
      test('outputs messages with prefixes', () => {
        const { create } = require('./log');
        const log = create({
          colors: false,
          level: Level.Debug,
          prefix: true,
        });
        log.debug('foo');
        log.info('foo');
        log.okay('foo');
        log.start('foo');
        log.warn('foo');
        log.error('foo');
        log.fail('foo');
        expect(debugSpy).toHaveBeenCalledWith('[DEBUG]', 'foo');
        expect(infoSpy).toHaveBeenCalledWith('[INFO]', 'foo');
        expect(infoSpy).toHaveBeenCalledWith('[OKAY]', 'foo');
        expect(infoSpy).toHaveBeenCalledWith('[STRT]', 'foo');
        expect(warnSpy).toHaveBeenCalledWith('[WARN]', 'foo');
        expect(errorSpy).toHaveBeenCalledWith('[ERROR]', 'foo');
        expect(errorSpy).toHaveBeenCalledWith('[FAIL]', 'foo');
      });
    });
    describe('`false`', () => {
      test('outputs messages without prefixes', () => {
        const { create } = require('./log');
        const log = create({
          colors: false,
          level: Level.Debug,
          prefix: false,
        });
        log.debug('foo');
        log.info('foo');
        log.okay('foo');
        log.start('foo');
        log.warn('foo');
        log.error('foo');
        log.fail('foo');
        expect(debugSpy).toHaveBeenCalledWith('foo');
        expect(infoSpy).toHaveBeenCalledWith('foo');
        expect(infoSpy).toHaveBeenCalledWith('foo');
        expect(infoSpy).toHaveBeenCalledWith('foo');
        expect(warnSpy).toHaveBeenCalledWith('foo');
        expect(errorSpy).toHaveBeenCalledWith('foo');
        expect(errorSpy).toHaveBeenCalledWith('foo');
      });
    });
  });
});

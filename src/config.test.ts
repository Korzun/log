describe('config', () => {
  let env: Record<string, string | undefined>;
  beforeEach(() => {
    jest.resetModules();
    env = Object.assign({}, process.env);
  });
  Object.assign({}, process.env);
  afterEach(() => {
    process.env = env;
  });

  describe('defaultLevel', () => {
    describe('environmental variable is not set', () => {
      it('equals "error"', () => {
        process.env.LOG_LEVEL = undefined;
        const { defaultLevel } = require('./config');
        expect(defaultLevel).toEqual('error');
      });
    });
    describe('environmental variable is set to a valid Level', () => {
      it('equals that level', () => {
        process.env.LOG_LEVEL = 'debug';
        const { defaultLevel } = require('./config');
        expect(defaultLevel).toEqual('debug');
      });
    });
    describe('environmental variable is invalid', () => {
      it('equals "error"', () => {
        process.env.LOG_LEVEL = 'foo';
        const { defaultLevel } = require('./config');
        expect(defaultLevel).toEqual('error');
      });
    });
  });

  describe('defaultColor', () => {
    describe('environmental variable is not set', () => {
      it('equals "true"', () => {
        process.env.LOG_COLOR = undefined;
        const { defaultColor } = require('./config');
        expect(defaultColor).toEqual(true);
      });
    });
    describe('environmental variable is a stringified boolean', () => {
      it('equals that boolean', () => {
        process.env.LOG_COLOR = 'false';
        const { defaultColor } = require('./config');
        expect(defaultColor).toEqual(false);
      });
    });
    describe('environmental variable is invalid', () => {
      it('equals `true', () => {
        process.env.LOG_COLOR = 'foo';
        const { defaultColor } = require('./config');
        expect(defaultColor).toEqual(true);
      });
    });
  });

  describe('defaultPrefix', () => {
    describe('environmental variable is not set', () => {
      it('equals "true"', () => {
        process.env.LOG_PREFIX = undefined;
        const { defaultPrefix } = require('./config');
        expect(defaultPrefix).toEqual(true);
      });
    });
    describe('environmental variable is a stringified boolean', () => {
      it('equals that boolean', () => {
        process.env.LOG_PREFIX = 'false';
        const { defaultPrefix } = require('./config');
        expect(defaultPrefix).toEqual(false);
      });
    });
    describe('environmental variable is invalid', () => {
      it('equals `true', () => {
        process.env.LOG_PREFIX = 'foo';
        const { defaultPrefix } = require('./config');
        expect(defaultPrefix).toEqual(true);
      });
    });
  });
});

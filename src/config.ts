import { Level } from './log.type';

export const defaultLevel =
  process.env.LOG_LEVEL === undefined ||
  process.env.LOG_LEVEL === '' ||
  !Object.values(Level).includes(process.env.LOG_LEVEL as Level)
    ? Level.Error
    : (process.env.LOG_LEVEL as Level);

export const defaultColor =
  process.env.LOG_COLOR === undefined ||
  process.env.LOG_COLOR === '' ||
  !['true', 'false'].includes(process.env.LOG_COLOR)
    ? true
    : process.env.LOG_COLOR === 'true';

export const defaultPrefix =
  process.env.LOG_PREFIX === undefined ||
  process.env.LOG_PREFIX === '' ||
  !['true', 'false'].includes(process.env.LOG_PREFIX)
    ? true
    : process.env.LOG_PREFIX === 'true';

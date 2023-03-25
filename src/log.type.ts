export enum Level {
  Debug = 'debug',
  Info = 'info',
  Warning = 'warning',
  Error = 'error',
  Disabled = 'disabled',
}

export type MessagePart = (message?: any) => string;
export type Log = (message?: any, ...optionalParams: any[]) => void;

export interface Logger {
  colophonPart: MessagePart;
  debug: Log;
  debugPart: MessagePart;
  error: Log;
  errorPart: MessagePart;
  fail: Log;
  failPart: MessagePart;
  info: Log;
  infoPart: MessagePart;
  okay: Log;
  okayPart: MessagePart;
  start: Log;
  startPart: MessagePart;
  warn: Log;
  warnPart: MessagePart;
}

export type Options = {
  colors?: boolean;
  level?: Level;
  prefix?: boolean;
};

export type Create = (options?: Options) => Logger;

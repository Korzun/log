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
  debug: Log;
  error: Log;
  fail: Log;
  info: Log;
  okay: Log;
  warn: Log;
  colophonPart: MessagePart;
  debugPart: MessagePart;
  errorPart: MessagePart;
  infoPart: MessagePart;
  okayPart: MessagePart;
  warnPart: MessagePart;
  failPart: MessagePart;
}

export type Options = {
  colors?: boolean;
  level?: Level;
  prefix?: boolean;
};

export type Create = (options?: Options) => Logger;

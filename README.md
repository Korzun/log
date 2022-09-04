# Log

[![npm version](https://badge.fury.io/js/@korzun%2Flog.svg)](https://badge.fury.io/js/@korzun%2Flog)

Safe, Simple, Glanceable Logging

## Installation

```shell
npm i @korzun/log
```

or

```shell
yarn add @korzun/log
```

## Configuration Options

### Level

Control the level of logging emitted. Defaults to `error`.

#### Environmental Variable

```env
  LOG_LEVEL='debug'
```

#### Code

```ts
  import { create as createLog, Level } from '@korzun/log';
  const log = createLog({ level: Level.Debug });
```

### Colors

Disable colors where they're not needed or supported. Defaults to `true`.

#### Environmental Variable

```env
  LOG_COLOR='false'
```

#### Code

```ts
  import { create as createLog } from '@korzun/log';
  const log = createLog({ color: false });
```

### Prefix

Disable prefixes where glanceability isn't relevant. Defaults to `true`.

#### Environmental Variable

```env
  LOG_PREFIX='false'
```

#### Code

```ts
  import { create as createLog } from '@korzun/log';
  const log = createLog({ prefix: false });
```

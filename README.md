# Hyflayer

![Version](https://img.shields.io/github/package-json/v/itsneyoa/hyflayer?style=for-the-badge)
[![License: ISC](https://img.shields.io/github/license/itsneyoa/hyflayer?style=for-the-badge)](https://github.com/itsneyoa/hyflayer/blob/master/LICENSE)
[![CodeFactor](https://www.codefactor.io/repository/github/itsneyoa/hyflayer/badge?style=for-the-badge)](https://www.codefactor.io/repository/github/itsneyoa/hyflayer)

> A mineflayer plugin to handle chat on the Hypixel server.

## Install

```sh
npm i hyflayer
# or
yarn add hyflayer
```

## Usage

```js
const mineflayer = require('mineflayer')
const hyflayer = require('hyflayer')

/** @type {import('hyflayer').HyflayerBot} */
const bot = mineflayer.createBot({...})
bot.loadPlugin(hyflayer)
```

## Example

```js
const mineflayer = require('mineflayer')
const hyflayer = require('hyflayer')

/** @type {import('hyflayer').HyflayerBot} */
const bot = mineflayer.createBot()
bot.loadPlugin(hyflayer)

bot.on('partyChatMessage', (message, { username, hypixelRank }) => {
  console.log(hypixelRank ?? '[No Rank]', username + ':', message)
})

bot.on('spawn', () => {
  bot.sendToGuild('Hi!')
})
```

## Roadmap

- [ ] Add better testing, possibly with something like [Jest](https://jestjs.io)
- [ ] Add support for DM messages
- [ ] Add a delay between sending split messages to stop `You are sending commands too quickly, please slow down.`

## License

Copyright © 2021 [Lily Smart](https://www.neyoa.me).

This project is [ISC](https://github.com/itsneyoa/hyflayer/blob/master/LICENSE) licensed.

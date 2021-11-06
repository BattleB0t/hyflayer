const mineflayer = require('mineflayer')
const hyflayer = require('hyflayer')
const mc = require('minecraft-protocol')
const assert = require('assert')

/** @type {hyflayer.HyflayerBot} */
const bot = mineflayer.createBot()
bot.loadPlugin(hyflayer)

/**
 * @param {mc.Client} client
 * @param {string} message
 */
function chat(client, message) {
  client.write('chat', { message, position: 0, sender: 0 })
}

for (const version of ['1.17.1'] /* mineflayer.testedVersions */) {
  describe(`Internal tests - ${version}`, () => {
    const username = 'hyflayer'
    const port = 25567

    describe('Chat message detection', () => {
      /** @type {hyflayer.HyflayerBot} */
      let bot
      /** @type {mc.Server} */
      let server

      beforeEach((done) => {
        server = mc.createServer({
          'online-mode': false,
          version,
          port,
        })

        server.on('listening', () => {
          bot = mineflayer.createBot({
            username,
            version,
            port,
          })
          bot.loadPlugin(hyflayer)
          done()
        })
      })
      afterEach((done) => {
        bot.on('end', done)
        server.close()
      })

      it('Tests guild chat', (done) => {
        server.on('login', (client) => {
          const tests = [
            {
              description: 'Hypixel and Guild rank',
              message: 'Guild > [MVP+] neyoa [Staff]: message',
              expected: { message: 'message', hypixelRank: '[MVP+]', guildRank: '[Staff]', username: 'neyoa' },
            },
            {
              description: 'Guild rank only',
              message: 'Guild > neyoa [Staff]: message',
              expected: { message: 'message', hypixelRank: null, guildRank: '[Staff]', username: 'neyoa' },
            },
            {
              description: 'Hypixel and Guild rank',
              message: 'Guild > [MVP+] neyoa: message',
              expected: { message: 'message', hypixelRank: '[MVP+]', guildRank: null, username: 'neyoa' },
            },
            {
              description: 'No ranks',
              message: 'Guild > neyoa: message',
              expected: { message: 'message', hypixelRank: null, guildRank: null, username: 'neyoa' },
            },
          ]
          for (const { description, message, expected } of tests) {
            it(`Tests ${description} message`)
            chat(client, message)

            bot.on('guildChatMessage', (message, { hypixelRank, guildRank, username }) => {
              test({ message, hypixelRank, guildRank, username }, expected)
            })
          }
        })
      })
    })
  })
}

const testMessages = [
  'Guild > neyoa [Staff]: message',
  'Guild > [MVP+] neyoa: message',
  'Guild > neyoa: message',

  'Party > [MVP+] neyoa: message',
  'Party > neyoa: message',

  'Officer > [MVP+] neyoa [Staff]: message',
  'Officer > [MVP+] neyoa: message',
  'Officer > neyoa [Staff]: message',
  'Officer > neyoa: message',

  '[MVP+] neyoa: message',
  'neyoa: message',
]

bot.once('spawn', () => {
  testMessages.forEach((message) => {
    bot.chat(`/tellraw @s {"text":"${message}"}`)
  })

  bot.sendToAll('all')
  bot.sendToAll('all', 'prefix: ')
  bot.sendToGuild('guild')
  bot.sendToGuild('guild', 'prefix: ')
  bot.sendToOfficer('officer')
  bot.sendToOfficer('officer', 'prefix: ')
  bot.sendToParty('party')
  bot.sendToParty('party', 'prefix: ')
})

const { createBot } = require('mineflayer')
const hyflayer = require('..')

/**
 * @type {import('..').HyflayerBot}
 */
const bot = createBot()
bot.loadPlugin(hyflayer)

const testMessages = [
  'Guild > [MVP+] neyoa [Staff]: message',
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

bot.on('guildChatMessage', (message, { hypixelRank, username, guildRank }, messageJson) => {
  const prefix = [username]
  hypixelRank && prefix.unshift(hypixelRank)
  guildRank && prefix.push(guildRank)
  console.log('Guild -', `${prefix.join(' ')}:`, message)
})

bot.on('partyChatMessage', (message, { hypixelRank, username }, messageJson) => {
  const prefix = [username]
  hypixelRank && prefix.unshift(hypixelRank)
  console.log('Party -', `${prefix.join(' ')}:`, message)
})

bot.on('officerChatMessage', (message, { hypixelRank, username, guildRank }, messageJson) => {
  const prefix = [username]
  hypixelRank && prefix.unshift(hypixelRank)
  guildRank && prefix.push(guildRank)
  console.log('Officer -', `${prefix.join(' ')}:`, message)
})

bot.on('allChatMessage', (message, { hypixelRank, username }, messageJson) => {
  const prefix = [username]
  hypixelRank && prefix.unshift(hypixelRank)
  console.log('All -', `${prefix.join(' ')}:`, message)
})

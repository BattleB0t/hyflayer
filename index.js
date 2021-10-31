const { buildAllChat, buildGuildChat, buildOfficerChat, buildPartyChat } = require('./builders')

const chatRegex = {
  guild: /^Guild > (?<hypixelRank>\[\w+\+*])? ?(?<username>\w+) ?(?<guildRank>\[\w+])?: /,
  party: /^Party > (?<hypixelRank>\[\w+\+*])? ?(?<username>\w+): /,
  officer: /^Officer > (?<hypixelRank>\[\w+\+*])? ?(?<username>\w+) ?(?<guildRank>\[\w+])?: /,
  all: /^(?<hypixelRank>\[\w+\+*])? ?(?<username>\w+): /,
}

module.exports = function (bot, options) {
  const CHAT_LENGTH_LIMIT = options.chatLengthLimit ?? (bot.supportFeature('lessCharsInChat') ? 100 : 256)

  function send(message) {
    bot._client.write('chat', { message })
  }

  bot.sendToAll = (message, prefix) => {
    buildAllChat(message, prefix, CHAT_LENGTH_LIMIT).forEach((message) => {
      send(message)
    })
  }

  bot.sendToGuild = (message, prefix) => {
    buildGuildChat(message, prefix, CHAT_LENGTH_LIMIT).forEach((message) => {
      send(message)
    })
  }

  bot.sendToOfficer = (message, prefix) => {
    buildOfficerChat(message, prefix, CHAT_LENGTH_LIMIT).forEach((message) => {
      send(message)
    })
  }

  bot.sendToParty = (message, prefix) => {
    buildPartyChat(message, prefix, CHAT_LENGTH_LIMIT).forEach((message) => {
      send(message)
    })
  }

  bot.on('messagestr', (message, chatPosition, messageJson) => {
    if (chatPosition === 'game_info') return // Ignore action bar messages

    const matches = []

    for (const [chat, regex] of Object.entries(chatRegex)) {
      const match = regex.exec(message)

      if (match) {
        const { groups } = match
        matches.push({ chat, groups })
      }
    }

    for (const match of matches) {
      bot.emit(`${match.chat}ChatMessage`, message.split(': ').slice(1).join(': '), match.groups, messageJson)
    }
  })
}

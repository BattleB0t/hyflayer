/**
 * Automatically add command and prefix to all parts of message
 * @param {string} message The message to split and prefix
 * @param {string} header The command, prefix and anything else to be added before every message part
 * @param {number} chatLengthLimit The maximum length one chat message can be
 * @returns {string[]} String array of messages which can be sent to the server
 */
function buildChatMessages(message, header, chatLengthLimit = 100) {
  if (typeof message === 'number') message = message.toString()
  if (typeof message !== 'string') {
    throw new Error('Incorrect type! Should be a string or number.')
  }

  const lengthLimit = chatLengthLimit - header.length
  const messages = []
  message.split('\n').forEach((subMessage) => {
    if (!subMessage) return
    for (let i = 0; i < subMessage.length; i += lengthLimit) {
      messages.push(header + subMessage.substring(i, i + lengthLimit))
    }
  })
  return messages
}

/**
 * Build chat messages to send directly to Hypixel for all chat, splitting if necessary
 * @param {string} message The message to send, automatically split up if longer than the chat length limit
 * @param {string} prefix Anything to send before every part of the message
 * @param {number} chatLengthLimit The maximum length one chat message can be
 * @returns {string[]} String array of messages which can be sent to the server
 */
function buildAllChat(message, prefix, chatLengthLimit) {
  return buildChatMessages(message, `/ac ${prefix ?? ''}`, chatLengthLimit)
}

/**
 * Build chat messages to send directly to Hypixel for guild chat, splitting if necessary
 * @param {string} message The message to send, automatically split up if longer than the chat length limit
 * @param {string} prefix Anything to send before every part of the message
 * @param {number} chatLengthLimit The maximum length one chat message can be
 * @returns {string[]} String array of messages which can be sent to the server
 */
function buildGuildChat(message, prefix, chatLengthLimit) {
  return buildChatMessages(message, `/gc ${prefix ?? ''}`, chatLengthLimit)
}

/**
 * Build chat messages to send directly to Hypixel for officer chat, splitting if necessary
 * @param {string} message The message to send, automatically split up if longer than the chat length limit
 * @param {string} prefix Anything to send before every part of the message
 * @param {number} chatLengthLimit The maximum length one chat message can be
 * @returns {string[]} String array of messages which can be sent to the server
 */
function buildOfficerChat(message, prefix, chatLengthLimit) {
  return buildChatMessages(message, `/oc ${prefix ?? ''}`, chatLengthLimit)
}

/**
 * Build chat messages to send directly to Hypixel for party chat, splitting if necessary
 * @param {string} message The message to send, automatically split up if longer than the chat length limit
 * @param {string} prefix Anything to send before every part of the message
 * @param {number} chatLengthLimit The maximum length one chat message can be
 * @returns {string[]} String array of messages which can be sent to the server
 */
function buildPartyChat(message, prefix, chatLengthLimit) {
  return buildChatMessages(message, `/pc ${prefix ?? ''}`, chatLengthLimit)
}

module.exports = {
  buildAllChat,
  buildGuildChat,
  buildOfficerChat,
  buildPartyChat,
}

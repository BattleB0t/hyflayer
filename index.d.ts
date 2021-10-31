import { Bot, BotEvents } from 'mineflayer'
import { ChatMessage } from 'prismarine-chat'
import TypedEmitter from 'typed-emitter'

export function buildAllChat(message: string, prefix: string, chatLengthLimit: number): string[]
export function buildGuildChat(message: string, prefix: string, chatLengthLimit: number): string[]
export function buildOfficerChat(message: string, prefix: string, chatLengthLimit: number): string[]
export function buildPartyChat(message: string, prefix: string, chatLengthLimit: number): string[]

export interface HyflayerBot extends TypedEmitter<HyflayerBotEvents>, Bot {
  sendToAll: (message: string, prefix: string) => void
  sendToGuild: (message: string, prefix: string) => void
  sendToOfficer: (message: string, prefix: string) => void
  sendToParty: (message: string, prefix: string) => void
}

interface HyflayerBotEvents extends BotEvents {
  allChatMessage: (message: string, groups: { hypixelRank?: string; username: string }, jsonMessage: ChatMessage) => Promise<void> | void
  guildChatMessage: (message: string, groups: { hypixelRank?: string; username: string; guildRank?: string }, jsonMessage: ChatMessage) => Promise<void> | void
  officerChatMessage: (
    message: string,
    groups: { hypixelRank?: string; username: string; guildRank?: string },
    jsonMessage: ChatMessage
  ) => Promise<void> | void
  partyChatMessage: (message: string, groups: { hypixelRank?: string; username: string }, jsonMessage: ChatMessage) => Promise<void> | void
}

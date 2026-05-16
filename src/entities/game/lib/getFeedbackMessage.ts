import {
  GAME_MESSAGE_LOSE,
  GAME_MESSAGE_WIN,
} from '../config/game.constants'
import type { GameFeedbackVariant } from '../model/gameFeedback.types'

export function getFeedbackMessage(
  variant: GameFeedbackVariant,
): string {
  return variant === 'success'
    ? GAME_MESSAGE_WIN
    : GAME_MESSAGE_LOSE
}

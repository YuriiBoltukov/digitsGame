import { describe, expect, it } from 'vitest'

import {
  GAME_MESSAGE_LOSE,
  GAME_MESSAGE_WIN,
} from '../config/game.constants'
import { getFeedbackMessage } from './getFeedbackMessage'

describe('getFeedbackMessage', () => {
  it('returns win message for success', () => {
    expect(getFeedbackMessage('success')).toBe(GAME_MESSAGE_WIN)
  })

  it('returns lose message for wrong', () => {
    expect(getFeedbackMessage('wrong')).toBe(GAME_MESSAGE_LOSE)
  })
})

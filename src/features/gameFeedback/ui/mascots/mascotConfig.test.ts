import { describe, expect, it } from 'vitest'

import { MASCOT_CONFIG } from './mascotConfig'

describe('MASCOT_CONFIG', () => {
  it('configures left mascot for success feedback', () => {
    expect(MASCOT_CONFIG.left).toMatchObject({
      side: 'left',
      feedbackVariant: 'success',
      ariaLabel: 'Кот — сообщение при успехе',
    })
    expect(MASCOT_CONFIG.left.image).toBeTruthy()
  })

  it('configures right mascot for wrong feedback', () => {
    expect(MASCOT_CONFIG.right).toMatchObject({
      side: 'right',
      feedbackVariant: 'wrong',
      ariaLabel: 'Динозавр — сообщение при ошибке',
    })
    expect(MASCOT_CONFIG.right.image).toBeTruthy()
  })
})

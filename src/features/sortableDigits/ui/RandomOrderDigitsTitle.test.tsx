import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { FULL_ORDER_HINT } from '@/entities/game/config/game.constants'

import { OrderDigitsContext } from '../model/orderDigitsContext'
import type { OrderDigitsContextValue } from '../model/orderDigitsTypes'
import { RandomOrderDigitsTitle } from './RandomOrderDigitsTitle'

const baseContext: OrderDigitsContextValue = {
  titleId: 'title-id',
  shortHintId: 'hint-id',
  interactionLocked: false,
  items: [],
  selectedId: null,
  onRowClick: vi.fn(),
  onKeyboardMove: vi.fn(),
  onDragStart: vi.fn(),
  onDragEnd: vi.fn(),
}

describe('RandomOrderDigitsTitle', () => {
  it('renders title and hint trigger', () => {
    render(
      <OrderDigitsContext.Provider value={baseContext}>
        <RandomOrderDigitsTitle />
      </OrderDigitsContext.Provider>,
    )

    expect(
      screen.getByRole('heading', { name: 'Текущая последовательность' }),
    ).toHaveAttribute('id', 'title-id')
    expect(
      screen.getByRole('button', {
        name: `Подробнее: ${FULL_ORDER_HINT}`,
      }),
    ).toBeEnabled()
  })

  it('disables hint trigger when interaction is locked', () => {
    render(
      <OrderDigitsContext.Provider
        value={{ ...baseContext, interactionLocked: true }}
      >
        <RandomOrderDigitsTitle />
      </OrderDigitsContext.Provider>,
    )

    expect(
      screen.getByRole('button', {
        name: `Подробнее: ${FULL_ORDER_HINT}`,
      }),
    ).toBeDisabled()
  })
})

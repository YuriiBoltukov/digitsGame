import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { ACTIVE_HINT, LOCKED_HINT } from '@/entities/game/config/game.constants'

import { OrderDigitsContext } from '../model/orderDigitsContext'
import type { OrderDigitsContextValue } from '../model/orderDigitsTypes'
import { RandomOrderDigitsHint } from './RandomOrderDigitsHint'

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

describe('RandomOrderDigitsHint', () => {
  it('shows active hint', () => {
    render(
      <OrderDigitsContext.Provider value={baseContext}>
        <RandomOrderDigitsHint />
      </OrderDigitsContext.Provider>,
    )

    expect(screen.getByText(ACTIVE_HINT)).toBeInTheDocument()
    expect(screen.getByText(ACTIVE_HINT).parentElement).toHaveAttribute(
      'id',
      'hint-id',
    )
  })

  it('shows locked hint', () => {
    render(
      <OrderDigitsContext.Provider
        value={{ ...baseContext, interactionLocked: true }}
      >
        <RandomOrderDigitsHint />
      </OrderDigitsContext.Provider>,
    )

    expect(screen.getByText(LOCKED_HINT)).toBeInTheDocument()
  })
})

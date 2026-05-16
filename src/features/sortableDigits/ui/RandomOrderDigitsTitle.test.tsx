import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { FULL_ORDER_HINT } from '@/entities/game/config/game.constants'

import { OrderDigitsContext } from '../model/orderDigitsContext'
import type { OrderDigitsContextValue } from '../model/orderDigitsTypes'
import { RandomOrderDigitsTitle } from './RandomOrderDigitsTitle'

vi.mock('@/features/gameFeedback', () => ({
  useCompactGameFeedback: vi.fn(() => false),
}))

import { useCompactGameFeedback } from '@/features/gameFeedback'

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

function renderTitle(context = baseContext) {
  return render(
    <OrderDigitsContext.Provider value={context}>
      <RandomOrderDigitsTitle />
    </OrderDigitsContext.Provider>,
  )
}

describe('RandomOrderDigitsTitle', () => {
  it('renders title and hint trigger', () => {
    vi.mocked(useCompactGameFeedback).mockReturnValue(false)
    renderTitle()

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
    vi.mocked(useCompactGameFeedback).mockReturnValue(false)
    renderTitle({ ...baseContext, interactionLocked: true })

    expect(
      screen.getByRole('button', {
        name: `Подробнее: ${FULL_ORDER_HINT}`,
      }),
    ).toBeDisabled()
  })

  it('shows hint toast on compact layout when trigger is clicked', async () => {
    vi.mocked(useCompactGameFeedback).mockReturnValue(true)
    const user = userEvent.setup()

    renderTitle()

    await user.click(
      screen.getByRole('button', {
        name: `Подробнее: ${FULL_ORDER_HINT}`,
      }),
    )

    expect(screen.getByRole('status')).toHaveTextContent(FULL_ORDER_HINT)
  })

  it('does not show hint toast on desktop when trigger is clicked', async () => {
    vi.mocked(useCompactGameFeedback).mockReturnValue(false)
    const user = userEvent.setup()

    renderTitle()

    await user.click(
      screen.getByRole('button', {
        name: `Подробнее: ${FULL_ORDER_HINT}`,
      }),
    )

    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })
})

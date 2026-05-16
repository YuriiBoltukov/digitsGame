import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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

function renderTitle(context = baseContext) {
  return render(
    <OrderDigitsContext.Provider value={context}>
      <RandomOrderDigitsTitle />
    </OrderDigitsContext.Provider>,
  )
}

describe('RandomOrderDigitsTitle', () => {
  it('renders title and hint trigger', () => {
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
    renderTitle({ ...baseContext, interactionLocked: true })

    expect(
      screen.getByRole('button', {
        name: `Подробнее: ${FULL_ORDER_HINT}`,
      }),
    ).toBeDisabled()
  })

  it('shows hint toast when trigger is clicked', async () => {
    const user = userEvent.setup()

    renderTitle()

    await user.click(
      screen.getByRole('button', {
        name: `Подробнее: ${FULL_ORDER_HINT}`,
      }),
    )

    expect(screen.getByRole('status')).toHaveTextContent(FULL_ORDER_HINT)
  })

  it('hides hint toast when trigger is clicked again', async () => {
    const user = userEvent.setup()

    renderTitle()

    const trigger = screen.getByRole('button', {
      name: `Подробнее: ${FULL_ORDER_HINT}`,
    })

    await user.click(trigger)
    await user.click(trigger)

    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })
})

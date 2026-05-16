import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { OrderDigitsContext } from '../model/orderDigitsContext'
import type { OrderDigitsContextValue } from '../model/orderDigitsTypes'
import { RandomOrderDigitsList } from './RandomOrderDigitsList'

const contextValue: OrderDigitsContextValue = {
  titleId: 'title-id',
  shortHintId: 'hint-id',
  interactionLocked: false,
  items: [
    { id: '1', value: 10 },
    { id: '2', value: 20 },
  ],
  selectedId: null,
  onRowClick: vi.fn(),
  onKeyboardMove: vi.fn(),
  onDragStart: vi.fn(),
  onDragEnd: vi.fn(),
}

describe('RandomOrderDigitsList', () => {
  it('renders sortable digit rows', () => {
    render(
      <OrderDigitsContext.Provider value={contextValue}>
        <RandomOrderDigitsList />
      </OrderDigitsContext.Provider>,
    )

    expect(screen.getByRole('list')).toHaveAttribute(
      'aria-labelledby',
      'title-id',
    )
    expect(screen.getByRole('button', { name: '10' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '20' })).toBeInTheDocument()
  })
})

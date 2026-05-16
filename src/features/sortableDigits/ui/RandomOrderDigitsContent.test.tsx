import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { OrderDigitsContext } from '../model/orderDigitsContext'
import type { OrderDigitsContextValue } from '../model/orderDigitsTypes'
import { RandomOrderDigitsContent } from './RandomOrderDigitsContent'

vi.mock('./RandomOrderDigitsTitle', () => ({
  RandomOrderDigitsTitle: () => <div>title-block</div>,
}))

vi.mock('./RandomOrderDigitsList', () => ({
  RandomOrderDigitsList: () => <div>list-block</div>,
}))

vi.mock('./RandomOrderDigitsHint', () => ({
  RandomOrderDigitsHint: () => <div>hint-block</div>,
}))

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

describe('RandomOrderDigitsContent', () => {
  it('renders section with child blocks', () => {
    render(
      <OrderDigitsContext.Provider value={baseContext}>
        <RandomOrderDigitsContent />
      </OrderDigitsContext.Provider>,
    )

    expect(document.querySelector('section')).toHaveAttribute(
      'aria-labelledby',
      'title-id',
    )
    expect(screen.getByText('title-block')).toBeInTheDocument()
    expect(screen.getByText('list-block')).toBeInTheDocument()
    expect(screen.getByText('hint-block')).toBeInTheDocument()
  })
})

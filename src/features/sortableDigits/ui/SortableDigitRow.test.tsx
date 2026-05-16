import type { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { OrderDigitsContext } from '../model/orderDigitsContext'
import type { OrderDigitsContextValue } from '../model/orderDigitsTypes'
import { SortableDigitRow } from './SortableDigitRow'

function renderRow(
  props: Partial<ComponentProps<typeof SortableDigitRow>> = {},
  contextOverrides: Partial<OrderDigitsContextValue> = {},
) {
  const onRowClick = vi.fn()
  const onKeyboardMove = vi.fn()

  const contextValue: OrderDigitsContextValue = {
    titleId: 'title',
    shortHintId: 'hint',
    interactionLocked: false,
    items: [{ id: 'row-1', value: 5 }],
    selectedId: null,
    onRowClick,
    onKeyboardMove,
    onDragStart: vi.fn(),
    onDragEnd: vi.fn(),
    ...contextOverrides,
  }

  render(
    <OrderDigitsContext.Provider value={contextValue}>
      <ul>
        <SortableDigitRow
          item={{ id: 'row-1', value: 5 }}
          index={0}
          locked={false}
          isSelected={false}
          onClick={onRowClick}
          {...props}
        />
      </ul>
    </OrderDigitsContext.Provider>,
  )

  return { onRowClick, onKeyboardMove }
}

describe('SortableDigitRow', () => {
  it('renders digit value', () => {
    renderRow()

    expect(screen.getByRole('button', { name: '5' })).toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup()
    const { onRowClick } = renderRow()

    await user.click(screen.getByRole('button', { name: '5' }))

    expect(onRowClick).toHaveBeenCalledWith('row-1')
  })

  it('moves item on keyboard with modifier', async () => {
    const user = userEvent.setup()
    const { onKeyboardMove } = renderRow()

    screen.getByRole('button', { name: '5' }).focus()
    await user.keyboard('{Shift>}{ArrowDown}{/Shift}')

    expect(onKeyboardMove).toHaveBeenCalledWith('row-1', 1)
  })

  it('selects row on Enter key', async () => {
    const user = userEvent.setup()
    const { onRowClick } = renderRow()

    screen.getByRole('button', { name: '5' }).focus()
    await user.keyboard('{Enter}')

    expect(onRowClick).toHaveBeenCalledWith('row-1')
  })

  it('does not expose button role when locked', () => {
    renderRow({ locked: true })

    expect(screen.queryByRole('button', { name: '5' })).not.toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument()
  })
})

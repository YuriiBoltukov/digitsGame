import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import * as createItemsModule from '../lib/createItems'
import { useOrderDigitsContext } from '../model/orderDigitsContext'
import { RandomOrderDigitsProvider } from './RandomOrderDigitsProvider'

const initialItems = [
  { id: 'a', value: 1 },
  { id: 'b', value: 2 },
  { id: 'c', value: 3 },
]

function TestConsumer() {
  const {
    items,
    selectedId,
    onRowClick,
    onKeyboardMove,
    interactionLocked,
  } = useOrderDigitsContext()

  return (
    <div>
      <span data-testid="order">{items.map((item) => item.value).join(',')}</span>
      <span data-testid="selected">{selectedId ?? 'none'}</span>
      <span data-testid="locked">{String(interactionLocked)}</span>
      <button type="button" onClick={() => onRowClick('a')}>
        select-a
      </button>
      <button type="button" onClick={() => onRowClick('b')}>
        select-b
      </button>
      <button type="button" onClick={() => onKeyboardMove('b', 1)}>
        move-b-down
      </button>
    </div>
  )
}

describe('RandomOrderDigitsProvider', () => {
  it('notifies parent about initial order', async () => {
    vi.spyOn(createItemsModule, 'createItems').mockReturnValue(initialItems)
    const onOrderChange = vi.fn()

    render(
      <RandomOrderDigitsProvider digits={[1, 2, 3]} onOrderChange={onOrderChange}>
        <div>child</div>
      </RandomOrderDigitsProvider>,
    )

    await waitFor(() => {
      expect(onOrderChange).toHaveBeenCalledWith([1, 2, 3])
    })
  })

  it('swaps items on two row clicks', async () => {
    vi.spyOn(createItemsModule, 'createItems').mockReturnValue(initialItems)
    const user = userEvent.setup()

    render(
      <RandomOrderDigitsProvider digits={[1, 2, 3]}>
        <TestConsumer />
      </RandomOrderDigitsProvider>,
    )

    await user.click(screen.getByRole('button', { name: 'select-a' }))
    await user.click(screen.getByRole('button', { name: 'select-b' }))

    expect(screen.getByTestId('order')).toHaveTextContent('2,1,3')
    expect(screen.getByTestId('selected')).toHaveTextContent('none')
  })

  it('moves item on keyboard action', async () => {
    vi.spyOn(createItemsModule, 'createItems').mockReturnValue(initialItems)
    const user = userEvent.setup()

    render(
      <RandomOrderDigitsProvider digits={[1, 2, 3]}>
        <TestConsumer />
      </RandomOrderDigitsProvider>,
    )

    await user.click(screen.getByRole('button', { name: 'move-b-down' }))

    expect(screen.getByTestId('order')).toHaveTextContent('1,3,2')
  })

  it('ignores keyboard move when interaction is locked', async () => {
    vi.spyOn(createItemsModule, 'createItems').mockReturnValue(initialItems)
    const user = userEvent.setup()

    render(
      <RandomOrderDigitsProvider digits={[1, 2, 3]} interactionLocked>
        <TestConsumer />
      </RandomOrderDigitsProvider>,
    )

    await user.click(screen.getByRole('button', { name: 'move-b-down' }))

    expect(screen.getByTestId('order')).toHaveTextContent('1,2,3')
    expect(screen.getByTestId('locked')).toHaveTextContent('true')
  })

  it('recreates items when digits change', async () => {
    const createItemsSpy = vi
      .spyOn(createItemsModule, 'createItems')
      .mockReturnValueOnce(initialItems)
      .mockReturnValueOnce([
        { id: 'x', value: 9 },
        { id: 'y', value: 8 },
      ])

    const { rerender } = render(
      <RandomOrderDigitsProvider digits={[1, 2, 3]}>
        <TestConsumer />
      </RandomOrderDigitsProvider>,
    )

    rerender(
      <RandomOrderDigitsProvider digits={[9, 8]}>
        <TestConsumer />
      </RandomOrderDigitsProvider>,
    )

    await waitFor(() => {
      expect(createItemsSpy).toHaveBeenCalledTimes(2)
      expect(screen.getByTestId('order')).toHaveTextContent('9,8')
    })
  })

  it('returns null when there are no items', () => {
    vi.spyOn(createItemsModule, 'createItems').mockReturnValue([])

    const { container } = render(
      <RandomOrderDigitsProvider digits={[]}>
        <div>child</div>
      </RandomOrderDigitsProvider>,
    )

    expect(container).toBeEmptyDOMElement()
  })
})

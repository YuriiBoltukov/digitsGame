import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { OrderHintToast } from './OrderHintToast'

describe('OrderHintToast', () => {
  it('renders message and dismisses on close', async () => {
    const user = userEvent.setup()
    const onDismiss = vi.fn()

    render(
      <OrderHintToast message="Подсказка для игры" onDismiss={onDismiss} />,
    )

    expect(screen.getByRole('status')).toHaveTextContent(
      'Подсказка для игры',
    )

    await user.click(
      screen.getByRole('button', { name: 'Закрыть сообщение' }),
    )

    expect(onDismiss).toHaveBeenCalledOnce()
  })

  it('dismisses when clicking outside the toast', async () => {
    const user = userEvent.setup()
    const onDismiss = vi.fn()

    render(
      <OrderHintToast message="Подсказка для игры" onDismiss={onDismiss} />,
    )

    await user.click(
      screen.getByRole('button', { name: 'Закрыть подсказку' }),
    )

    expect(onDismiss).toHaveBeenCalledOnce()
  })
})

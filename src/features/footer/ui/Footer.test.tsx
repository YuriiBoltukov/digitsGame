import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Footer } from './Footer'

describe('Footer', () => {
  it('shows check button and triggers onCheck', async () => {
    const user = userEvent.setup()
    const onCheck = vi.fn()

    render(
      <Footer
        onCheck={onCheck}
        onNewGame={vi.fn()}
        showCheckButton
        showNewGameButton={false}
      />,
    )

    await user.click(
      screen.getByRole('button', { name: 'Проверить ответ' }),
    )

    expect(onCheck).toHaveBeenCalledOnce()
    expect(
      screen.queryByRole('button', { name: 'Новая игра' }),
    ).not.toBeInTheDocument()
  })

  it('shows new game button and triggers onNewGame', async () => {
    const user = userEvent.setup()
    const onNewGame = vi.fn()

    render(
      <Footer
        onCheck={vi.fn()}
        onNewGame={onNewGame}
        showCheckButton={false}
        showNewGameButton
      />,
    )

    await user.click(screen.getByRole('button', { name: 'Новая игра' }))

    expect(onNewGame).toHaveBeenCalledOnce()
  })
})

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import {
  GAME_MESSAGE_LOSE,
  GAME_MESSAGE_WIN,
} from '@/entities/game/config/game.constants'

import { MascotColumn } from './MascotColumn'

describe('MascotColumn', () => {
  it('shows success bubble for left mascot', async () => {
    const user = userEvent.setup()
    const onDismissFeedback = vi.fn()

    render(
      <MascotColumn
        side="left"
        feedback="success"
        onDismissFeedback={onDismissFeedback}
      />,
    )

    expect(
      screen.getByRole('complementary', {
        name: 'Кот — сообщение при успехе',
      }),
    ).toBeInTheDocument()
    expect(screen.getByText(GAME_MESSAGE_WIN)).toBeInTheDocument()

    await user.click(
      screen.getByRole('button', { name: 'Закрыть сообщение' }),
    )

    expect(onDismissFeedback).toHaveBeenCalledOnce()
  })

  it('shows wrong bubble for right mascot', () => {
    render(
      <MascotColumn
        side="right"
        feedback="wrong"
        onDismissFeedback={vi.fn()}
      />,
    )

    expect(
      screen.getByRole('complementary', {
        name: 'Динозавр — сообщение при ошибке',
      }),
    ).toBeInTheDocument()
    expect(screen.getByText(GAME_MESSAGE_LOSE)).toBeInTheDocument()
  })

  it('hides bubble when feedback does not match side', () => {
    render(
      <MascotColumn
        side="left"
        feedback="wrong"
        onDismissFeedback={vi.fn()}
      />,
    )

    expect(screen.queryByText(GAME_MESSAGE_WIN)).not.toBeInTheDocument()
    expect(screen.queryByText(GAME_MESSAGE_LOSE)).not.toBeInTheDocument()
  })
})

import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { RightMascot } from './RightMascot'

describe('RightMascot', () => {
  it('renders right mascot column', () => {
    render(
      <RightMascot feedback="wrong" onDismissFeedback={vi.fn()} />,
    )

    expect(
      screen.getByRole('complementary', {
        name: 'Динозавр — сообщение при ошибке',
      }),
    ).toBeInTheDocument()
  })
})

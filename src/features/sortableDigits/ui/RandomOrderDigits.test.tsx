import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import * as createItemsModule from '../lib/createItems'
import { RandomOrderDigits } from './RandomOrderDigits'

describe('RandomOrderDigits', () => {
  it('renders composed sortable digits UI', async () => {
    vi.spyOn(createItemsModule, 'createItems').mockReturnValue([
      { id: 'a', value: 4 },
      { id: 'b', value: 8 },
    ])

    render(<RandomOrderDigits digits={[4, 8]} />)

    expect(
      screen.getByRole('heading', { name: 'Текущая последовательность' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '4' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '8' })).toBeInTheDocument()
  })
})

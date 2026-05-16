import type { ReactNode } from 'react'
import { vi } from 'vitest'

vi.mock('@dnd-kit/react', () => ({
  DragDropProvider: ({ children }: { children: ReactNode }) => children,
}))

vi.mock('@dnd-kit/react/sortable', () => ({
  useSortable: () => ({
    ref: vi.fn(),
    handleRef: vi.fn(),
    isDragging: false,
  }),
  isSortable: () => false,
}))

vi.mock('@dnd-kit/dom', () => ({
  KeyboardSensor: class KeyboardSensor {},
  PointerSensor: {
    configure: () => ({}),
  },
  PointerActivationConstraints: {
    Distance: class Distance {},
  },
  isSortable: () => false,
}))

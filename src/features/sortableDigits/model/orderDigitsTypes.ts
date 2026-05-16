import type { DragEndEvent } from '@dnd-kit/dom'

export type RandomOrderDigitsProps = {
  digits: number[]
  onOrderChange?: (values: number[]) => void
  interactionLocked?: boolean
}

export type Item = {
  id: string
  value: number
}

export type Direction = -1 | 1

export type OrderDigitsContextValue = {
  titleId: string
  shortHintId: string
  interactionLocked: boolean
  items: Item[]
  selectedId: string | null
  onRowClick: (id: string) => void
  onKeyboardMove: (id: string, direction: Direction) => void
  onDragStart: () => void
  onDragEnd: (event: DragEndEvent) => void
}

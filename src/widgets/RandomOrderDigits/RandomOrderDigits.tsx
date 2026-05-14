import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { DragEndEvent } from '@dnd-kit/dom'
import { DragDropProvider } from '@dnd-kit/react'
import { isSortable, useSortable } from '@dnd-kit/react/sortable'
import { arrayMove } from '../../shared/lib/arrayMove'
import { shuffleArray } from '../../shared/lib/shuffleArray'
import styles from './randomOrderDigits.module.scss'

const GROUP_ID = 'random-order-digits'

export type RandomOrderDigitsProps = {
  digits: number[]
}

type Item = { id: string; value: number }

function toShuffledItems(values: readonly number[]): Item[] {
  const shuffled = shuffleArray([...values])
  return shuffled.map((value) => ({
    id: crypto.randomUUID(),
    value,
  }))
}

type SortableRowProps = {
  item: Item
  index: number
}

function SortableDigitRow({ item, index }: SortableRowProps) {
  const { ref, isDragging } = useSortable({
    id: item.id,
    index,
    group: GROUP_ID,
  })

  return (
    <li
      ref={ref}
      className={styles.item}
      data-dragging={isDragging ? '' : undefined}
    >
      <span className={styles.cell}>{item.value}</span>
    </li>
  )
}

export function RandomOrderDigits({ digits }: RandomOrderDigitsProps) {
  const [items, setItems] = useState<Item[]>(() => toShuffledItems(digits))
  const digitsKey = useMemo(() => digits.join('\0'), [digits])
  const prevDigitsKeyRef = useRef(digitsKey)

  useEffect(() => {
    if (prevDigitsKeyRef.current === digitsKey) return
    prevDigitsKeyRef.current = digitsKey
    setItems(toShuffledItems(digits))
  }, [digits, digitsKey])

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    if (event.canceled) return
    const { source } = event.operation
    if (!source || !isSortable(source)) return
    const from = source.initialIndex
    const to = source.index
    if (from === to) return
    setItems((prev) => arrayMove(prev, from, to))
  }, [])

  if (items.length === 0) {
    return null
  }

  return (
    <DragDropProvider onDragEnd={handleDragEnd}>
      <ul className={styles.list} role="list">
        {items.map((item, index) => (
          <SortableDigitRow key={item.id} item={item} index={index} />
        ))}
      </ul>
    </DragDropProvider>
  )
}

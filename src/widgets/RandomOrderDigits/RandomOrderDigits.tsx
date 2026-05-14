import {
  type KeyboardEvent,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react'
import type { DragEndEvent } from '@dnd-kit/dom'
import {
  KeyboardSensor,
  PointerActivationConstraints,
  PointerSensor,
} from '@dnd-kit/dom'
import { DragDropProvider } from '@dnd-kit/react'
import { isSortable, useSortable } from '@dnd-kit/react/sortable'
import { arrayMove, swapItemsById } from '../../shared/lib/arrayMove'
import { shuffleArray } from '../../shared/lib/shuffleArray'
import styles from './randomOrderDigits.module.scss'

const GROUP_ID = 'random-order-digits'

const FULL_ORDER_HINT =
  'Перетаскивайте карточки, чтобы изменить порядок, или кликните по одной, затем по другой — они поменяются местами.'

const dragSensors = [
  PointerSensor.configure({
    activationConstraints: [
      new PointerActivationConstraints.Distance({ value: 10 }),
    ],
  }),
  KeyboardSensor,
]

export type RandomOrderDigitsProps = {
  digits: number[]
  onOrderChange?: (values: number[]) => void
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
  isSelected: boolean
  onRowClick: (id: string) => void
}

function SortableDigitRow({
  item,
  index,
  isSelected,
  onRowClick,
}: SortableRowProps) {
  const { ref, isDragging } = useSortable({
    id: item.id,
    index,
    group: GROUP_ID,
  })

  const onCellKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onRowClick(item.id)
    }
  }

  return (
    <li
      ref={ref}
      className={styles.item}
      data-dragging={isDragging ? '' : undefined}
    >
      <div
        role="button"
        tabIndex={0}
        className={`${styles.cell} ${isSelected ? styles.cellSelected : ''}`}
        onClick={(e) => {
          e.stopPropagation()
          onRowClick(item.id)
        }}
        onKeyDown={onCellKeyDown}
      >
        {item.value}
      </div>
    </li>
  )
}

export function RandomOrderDigits({ digits, onOrderChange }: RandomOrderDigitsProps) {
  const titleId = useId()
  const shortHintId = useId()
  const [items, setItems] = useState<Item[]>(() => toShuffledItems(digits))
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const selectedRef = useRef<string | null>(null)
  const digitsKey = useMemo(() => digits.join('\0'), [digits])
  const prevDigitsKeyRef = useRef(digitsKey)

  const clearSelection = useCallback(() => {
    selectedRef.current = null
    setSelectedId(null)
  }, [])

  useEffect(() => {
    if (prevDigitsKeyRef.current === digitsKey) return
    prevDigitsKeyRef.current = digitsKey
    setItems(toShuffledItems(digits))
    clearSelection()
  }, [digits, digitsKey, clearSelection])

  useEffect(() => {
    onOrderChange?.(items.map((item) => item.value))
  }, [items, onOrderChange])

  const handleDragStart = useCallback(() => {
    clearSelection()
  }, [clearSelection])

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      if (event.canceled) return
      const { source } = event.operation
      if (!source || !isSortable(source)) return
      const from = source.initialIndex
      const to = source.index
      if (from === to) return
      setItems((prev) => arrayMove(prev, from, to))
      clearSelection()
    },
    [clearSelection],
  )

  const handleRowClick = useCallback((id: string) => {
    const prev = selectedRef.current
    if (prev === null) {
      selectedRef.current = id
      setSelectedId(id)
      return
    }
    if (prev === id) {
      clearSelection()
      return
    }
    clearSelection()
    setItems((list) => swapItemsById(list, prev, id))
  }, [clearSelection])

  if (items.length === 0) {
    return null
  }

  return (
    <DragDropProvider
      sensors={dragSensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <section className={styles.root} aria-labelledby={titleId}>
        <div className={styles.titleRow}>
          <h2 id={titleId} className={styles.title}>
            Текущая последовательность
          </h2>
          <div className={styles.hintWrap}>
            <button
              type="button"
              className={styles.hintTrigger}
              aria-label={`Подробнее: ${FULL_ORDER_HINT}`}
            >
              <span className={styles.hintTriggerMark} aria-hidden>
                ?
              </span>
            </button>
            <div className={styles.tooltip} aria-hidden="true">
              {FULL_ORDER_HINT}
            </div>
          </div>
        </div>
        <ul className={styles.list} role="list" aria-describedby={shortHintId}>
          {items.map((item, index) => (
            <SortableDigitRow
              key={item.id}
              item={item}
              index={index}
              isSelected={selectedId === item.id}
              onRowClick={handleRowClick}
            />
          ))}
        </ul>
        <p id={shortHintId} className={styles.hint}>
          Перетащите карточки или кликните по двум разным — они поменяются местами.
        </p>
      </section>
    </DragDropProvider>
  )
}

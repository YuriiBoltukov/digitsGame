import type { KeyboardEvent } from 'react'
import { useSortable } from '@dnd-kit/react/sortable'

import {
  GROUP_ID,
  REORDER_KEYS,
  SORTABLE_TRANSITION,
} from '@/entities/game/config/game.constants'
import { useOrderDigitsContext } from '../model/orderDigitsContext'
import type { Item } from '../model/orderDigitsTypes'

import styles from './randomOrderDigits.module.scss'

type SortableDigitRowProps = {
  item: Item
  index: number
  locked: boolean
  isSelected: boolean
  onClick: (id: string) => void
}

export function SortableDigitRow({
  item,
  index,
  locked,
  isSelected,
  onClick,
}: SortableDigitRowProps) {
  const { onKeyboardMove } = useOrderDigitsContext()

  const { ref, handleRef, isDragging } = useSortable({
    id: item.id,
    index,
    group: GROUP_ID,
    transition: SORTABLE_TRANSITION,
    disabled: locked,
  })

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (locked) {
      return
    }

    const isModifierPressed =
      event.shiftKey || event.ctrlKey || event.metaKey

    const isReorderKey = REORDER_KEYS.has(event.key)

    if (isModifierPressed && isReorderKey) {
      event.preventDefault()
      event.stopPropagation()

      onKeyboardMove(item.id, event.key === 'ArrowUp' ? -1 : 1)

      return
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()

      onClick(item.id)
    }
  }

  const cellClassName = isSelected
    ? `${styles.cell} ${styles.cellSelected}`
    : styles.cell

  return (
    <li
      ref={ref}
      className={styles.item}
      data-dragging={!locked && isDragging ? '' : undefined}
    >
      <div
        ref={locked ? undefined : handleRef}
        role={locked ? undefined : 'button'}
        tabIndex={locked ? undefined : 0}
        className={cellClassName}
        aria-readonly={locked ? true : undefined}
        draggable={locked ? false : undefined}
        onDragStart={
          locked
            ? (event) => event.preventDefault()
            : undefined
        }
        onClick={
          locked
            ? undefined
            : (event) => {
                event.stopPropagation()
                onClick(item.id)
              }
        }
        onKeyDown={locked ? undefined : handleKeyDown}
      >
        {item.value}
      </div>
    </li>
  )
}

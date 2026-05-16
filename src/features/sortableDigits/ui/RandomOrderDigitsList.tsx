import { DragDropProvider } from '@dnd-kit/react'

import { dragSensors } from '@/entities/game/config/game.constants'
import { useOrderDigitsContext } from '../model/orderDigitsContext'
import { SortableDigitRow } from './SortableDigitRow'

import styles from './randomOrderDigits.module.scss'

export function RandomOrderDigitsList() {
  const {
    interactionLocked,
    items,
    selectedId,
    titleId,
    shortHintId,
    onRowClick,
    onDragStart,
    onDragEnd,
  } = useOrderDigitsContext()

  return (
    <div className={styles.listWrap}>
      <DragDropProvider
        sensors={dragSensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <ul
          className={`${styles.list} ${interactionLocked ? styles.listLocked : ''}`}
          role="list"
          aria-labelledby={titleId}
          aria-describedby={shortHintId}
        >
          {items.map((item, index) => (
            <SortableDigitRow
              key={item.id}
              item={item}
              index={index}
              locked={interactionLocked}
              isSelected={selectedId === item.id}
              onClick={onRowClick}
            />
          ))}
        </ul>
      </DragDropProvider>
    </div>
  )
}

import {
  type ReactNode,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react'
import type { DragEndEvent } from '@dnd-kit/dom'
import { isSortable } from '@dnd-kit/react/sortable'

import { moveItemsByIndex } from '@/shared/lib/moveItemsByIndex'
import { swapItemsById } from '@/shared/lib/swapItemsById'

import { createItems } from '../lib/createItems'
import { getDigitsKey } from '../lib/getDigitsKey'
import { OrderDigitsContext } from '../model/orderDigitsContext'
import type {
  Direction,
  Item,
  OrderDigitsContextValue,
  RandomOrderDigitsProps,
} from '../model/orderDigitsTypes'

type ProviderProps = RandomOrderDigitsProps & {
  children: ReactNode
}

export function RandomOrderDigitsProvider({
  digits,
  onOrderChange,
  interactionLocked = false,
  children,
}: ProviderProps) {
  const titleId = useId()
  const shortHintId = useId()

  const digitsKey = useMemo(() => getDigitsKey(digits), [digits])

  const [items, setItems] = useState<Item[]>(() => createItems(digits))
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const selectedIdRef = useRef<string | null>(null)
  const previousDigitsKeyRef = useRef(digitsKey)

  const clearSelection = useCallback(() => {
    selectedIdRef.current = null
    setSelectedId(null)
  }, [])

  useEffect(() => {
    if (previousDigitsKeyRef.current === digitsKey) {
      return
    }

    previousDigitsKeyRef.current = digitsKey

    setItems(createItems(digits))
    clearSelection()
  }, [clearSelection, digits, digitsKey])

  useEffect(() => {
    onOrderChange?.(items.map(({ value }) => value))
  }, [items, onOrderChange])

  const onDragStart = useCallback(() => {
    clearSelection()
  }, [clearSelection])

  const onDragEnd = useCallback(
    (event: DragEndEvent) => {
      if (event.canceled) {
        return
      }

      const { source } = event.operation

      if (!source || !isSortable(source)) {
        return
      }

      const fromIndex = source.initialIndex
      const toIndex = source.index

      if (fromIndex === toIndex) {
        return
      }

      setItems((prev) => moveItemsByIndex(prev, fromIndex, toIndex))

      clearSelection()
    },
    [clearSelection],
  )

  const onRowClick = useCallback(
    (id: string) => {
      const previousSelectedId = selectedIdRef.current

      if (!previousSelectedId) {
        selectedIdRef.current = id
        setSelectedId(id)

        return
      }

      if (previousSelectedId === id) {
        clearSelection()

        return
      }

      clearSelection()

      setItems((prev) => swapItemsById(prev, previousSelectedId, id))
    },
    [clearSelection],
  )

  const onKeyboardMove = useCallback(
    (id: string, direction: Direction) => {
      if (interactionLocked) {
        return
      }

      clearSelection()

      setItems((prev) => {
        const fromIndex = prev.findIndex((item) => item.id === id)

        if (fromIndex === -1) {
          return prev
        }

        const toIndex = fromIndex + direction

        if (toIndex < 0 || toIndex >= prev.length) {
          return prev
        }

        return moveItemsByIndex(prev, fromIndex, toIndex)
      })
    },
    [clearSelection, interactionLocked],
  )

  const contextValue = useMemo<OrderDigitsContextValue>(
    () => ({
      titleId,
      shortHintId,
      interactionLocked,
      items,
      selectedId,
      onRowClick,
      onKeyboardMove,
      onDragStart,
      onDragEnd,
    }),
    [
      titleId,
      shortHintId,
      interactionLocked,
      items,
      selectedId,
      onRowClick,
      onKeyboardMove,
      onDragStart,
      onDragEnd,
    ],
  )

  if (items.length === 0) {
    return null
  }

  return (
    <OrderDigitsContext.Provider value={contextValue}>
      {children}
    </OrderDigitsContext.Provider>
  )
}

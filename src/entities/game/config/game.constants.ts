import {
  KeyboardSensor,
  PointerActivationConstraints,
  PointerSensor,
} from '@dnd-kit/dom'

import type { DigitSortOrder } from '../model/digitSortOrder.types'

/** Feedback bubble / toast visibility duration. */
export const FEEDBACK_VISIBILITY_DURATION_MS = 5000

export const GAME_MESSAGE_WIN = 'Победа!'

export const GAME_MESSAGE_LOSE =
  'Порядок не соответствует заданному, попробуй еще раз!'

/** Compact layout: mascots hidden, toast feedback. Matches SCSS `900px` breakpoint. */
export const COMPACT_GAME_FEEDBACK_MQ = '(max-width: 900px)'

export const AVAILABLE_DIGITS_LENGTHS = [5, 7, 10] as const

export const MAX_RANDOM_NUMBER = 50

export const DIGIT_SORT_ORDER_LABEL: Record<DigitSortOrder, string> = {
  ascending: 'от меньшего к большему',
  descending: 'от большего к меньшему',
}

export const GROUP_ID = 'random-order-digits'

export const REORDER_KEYS = new Set(['ArrowUp', 'ArrowDown'])

export const SORTABLE_TRANSITION = {
  duration: 320,
  easing: 'cubic-bezier(0.25, 1, 0.55, 1)',
  idle: true as const,
}

export const FULL_ORDER_HINT =
  'Перетаскивайте карточки; удерживая Shift, Ctrl или ⌘, нажимайте ↑ и ↓ на сфокусированной карточке (после Tab), чтобы сдвинуть её. Можно кликнуть по одной карточке, затем по другой — они поменяются местами.'

export const LOCKED_HINT =
  'Порядок верный. Перестановки недоступны — нажмите «Новая игра», чтобы начать заново.'

export const ACTIVE_HINT =
  'Перетащите карточки, кликните две для обмена или с Shift, Ctrl или ⌘ и стрелками ↑↓ сдвиньте сфокусированную карточку (сначала Tab).'

export const dragSensors = [
  PointerSensor.configure({
    activationConstraints: [
      new PointerActivationConstraints.Distance({
        value: 10,
      }),
    ],
  }),
  KeyboardSensor,
]

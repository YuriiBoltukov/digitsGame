import { assign, setup } from 'xstate'

import { FEEDBACK_VISIBILITY_DURATION_MS } from '@/entities/game/config/game.constants'
import type { DigitSortOrder } from '@/entities/game/model/digitSortOrder.types'
import { generateGameRound } from '@/entities/game/lib/generateGameRound'
import { isCorrectDigitOrder } from '@/entities/game/lib/isCorrectDigitOrder'
import type { GameFeedback } from '@/entities/game/model/gameFeedback.types'

export type GamePageMachineContext = {
  digits: number[]
  targetOrder: DigitSortOrder
  feedback: GameFeedback
  bubbleVisible: boolean
}

export type GamePageMachineEvent =
  | { type: 'CHECK'; userOrder: number[] }
  | { type: 'NEW_GAME' }
  | { type: 'DISMISS_FEEDBACK' }

const initialRound = generateGameRound()

const checkTransitions = [
  {
    guard: 'isOrderCorrect',
    target: '#gamePage.won',
  },
  {
    target: 'wrongFeedback',
    actions: 'showWrongFeedback',
  },
] as const

const checkTransitionsWithReenter = [
  {
    guard: 'isOrderCorrect',
    target: '#gamePage.won',
  },
  {
    target: 'wrongFeedback',
    reenter: true,
  },
] as const

export const gamePageMachine = setup({
  types: {
    context: {} as GamePageMachineContext,
    events: {} as GamePageMachineEvent,
  },
  guards: {
    isOrderCorrect({ context, event }) {
      if (event.type !== 'CHECK') {
        return false
      }

      return isCorrectDigitOrder(
        event.userOrder,
        context.digits,
        context.targetOrder,
      )
    },
  },
  actions: {
    hideBubble: assign({ bubbleVisible: false }),
    showWrongFeedback: assign({
      feedback: 'wrong',
      bubbleVisible: true,
    }),
    resetRound: assign(() => {
      const round = generateGameRound()

      return {
        digits: round.digits,
        targetOrder: round.targetOrder,
        feedback: null,
        bubbleVisible: false,
      }
    }),
  },
}).createMachine({
  id: 'gamePage',
  context: {
    digits: initialRound.digits,
    targetOrder: initialRound.targetOrder,
    feedback: null,
    bubbleVisible: false,
  },
  initial: 'playing',
  states: {
    playing: {
      initial: 'answering',
      states: {
        answering: {
          on: {
            CHECK: [...checkTransitions],
          },
        },
        wrongFeedback: {
          after: {
            [FEEDBACK_VISIBILITY_DURATION_MS]: {
              target: 'answering',
              actions: 'hideBubble',
            },
          },
          on: {
            DISMISS_FEEDBACK: {
              actions: 'hideBubble',
            },
            CHECK: [...checkTransitionsWithReenter],
          },
        },
      },
    },
    won: {
      entry: assign({
        feedback: 'success',
        bubbleVisible: true,
      }),
      after: {
        [FEEDBACK_VISIBILITY_DURATION_MS]: {
          actions: 'hideBubble',
        },
      },
      on: {
        DISMISS_FEEDBACK: {
          actions: 'hideBubble',
        },
        NEW_GAME: {
          target: 'playing.answering',
          actions: 'resetRound',
        },
      },
    },
  },
})

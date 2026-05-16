import type { GameFeedback } from '@/entities/game/model/gameFeedback.types'

export type MascotProps = {
  feedback: GameFeedback
  onDismissFeedback: () => void
}

export type MascotSide = 'left' | 'right'

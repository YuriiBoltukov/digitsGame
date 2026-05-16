import { getFeedbackMessage } from '@/entities/game/lib/getFeedbackMessage'
import type { GameFeedbackVariant } from '@/entities/game/model/gameFeedback.types'
import { FeedbackCloseButton } from '../feedbackCloseButton/FeedbackCloseButton'

export type FeedbackMessageClassNames = {
  root: string
  close: string
  text: string
}

export type FeedbackMessageProps = {
  variant: GameFeedbackVariant
  onDismiss: () => void
  classNames: FeedbackMessageClassNames
}

/**
 * Shared success/wrong feedback body (mascot bubble or mobile toast).
 */
export function FeedbackMessage({
  variant,
  onDismiss,
  classNames,
}: FeedbackMessageProps) {
  const isSuccess = variant === 'success'

  return (
    <div
      className={classNames.root}
      role={isSuccess ? 'status' : 'alert'}
    >
      <FeedbackCloseButton
        onClick={onDismiss}
        className={classNames.close}
      />
      <p className={classNames.text}>
        {getFeedbackMessage(variant)}
      </p>
    </div>
  )
}

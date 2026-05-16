import { useEffect, useState } from 'react'

import { COMPACT_GAME_FEEDBACK_MQ } from '@/entities/game/config/game.constants'

/**
 * Detects whether compact game feedback
 * mode should be enabled for current screen size.
 */
export function useCompactGameFeedback(): boolean {
  const [isCompactFeedback, setIsCompactFeedback] =
    useState<boolean>(() => {
      const isBrowserEnvironment =
        typeof window !== 'undefined'

      if (!isBrowserEnvironment) {
        return false
      }

      return window.matchMedia(
        COMPACT_GAME_FEEDBACK_MQ,
      ).matches
    })

  useEffect(() => {
    const mediaQueryList = window.matchMedia(
      COMPACT_GAME_FEEDBACK_MQ,
    )

    const handleMediaQueryChange = () => {
      setIsCompactFeedback(mediaQueryList.matches)
    }

    handleMediaQueryChange()

    mediaQueryList.addEventListener(
      'change',
      handleMediaQueryChange,
    )

    return () => {
      mediaQueryList.removeEventListener(
        'change',
        handleMediaQueryChange,
      )
    }
  }, [])

  return isCompactFeedback
}

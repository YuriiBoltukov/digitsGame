import { shuffleArray } from '@/shared/lib/shuffleArray'

import type { Item } from '../model/orderDigitsTypes'

export function createItems(values: readonly number[]): Item[] {
  return shuffleArray([...values]).map((value) => ({
    id: crypto.randomUUID(),
    value,
  }))
}

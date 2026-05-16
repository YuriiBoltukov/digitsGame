import { MascotColumn } from './MascotColumn'
import type { MascotProps } from './mascot.types'

export function LeftMascot(props: MascotProps) {
  return <MascotColumn {...props} side="left" />
}

import { MascotColumn } from './MascotColumn'
import type { MascotProps } from './mascot.types'

export function RightMascot(props: MascotProps) {
  return <MascotColumn {...props} side="right" />
}

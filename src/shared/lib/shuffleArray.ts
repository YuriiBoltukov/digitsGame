/**
 * Returns new shuffled array
 * using Fisher–Yates algorithm.
 */
export function shuffleArray<T>(
  items: readonly T[],
): T[] {
  const shuffledItems = [...items]

  for (
    let currentIndex = shuffledItems.length - 1;
    currentIndex > 0;
    currentIndex--
  ) {
    const randomIndex = Math.floor(
      Math.random() * (currentIndex + 1),
    )

    ;[
      shuffledItems[currentIndex],
      shuffledItems[randomIndex],
    ] = [
      shuffledItems[randomIndex],
      shuffledItems[currentIndex],
    ]
  }

  return shuffledItems
}

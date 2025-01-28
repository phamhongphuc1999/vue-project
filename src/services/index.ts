export function randomSubGroup(range: number) {
  const _array = Array.from(Array(range).keys(), (key) => key + 1)
  for (let i = range - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[_array[i], _array[j]] = [_array[j], _array[i]]
  }
  return _array
}

export const formatHours = (n: number): string => {
  const cases = [2, 0, 1, 1, 1, 2]
  const titles = ['час', 'часа', 'часов']

  const index = n % 100 > 4 && n % 100 < 20 ? 2 : cases[n % 10 < 5 ? n % 10 : 5]

  return `${n} ${titles[index]}`
}

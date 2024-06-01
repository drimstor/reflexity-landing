const getShortString = (string: string | undefined, endAmount: number = 6) => {
  if (!string) return

  if (string.length <= 15) {
    return string
  }

  const shortenedString = string.slice(0, 6) + '...' + string.slice(-endAmount)

  return shortenedString
}

export default getShortString

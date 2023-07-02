import { useState, useEffect } from 'react'

const useDebounceCallback = (
  callback: any,
  delay: number,
  immediate = false
) => {
  const [timer, setTimer] = useState<any>(null)

  useEffect(() => {
    return () => {
      if (timer) {
        clearTimeout(timer)
      }
    }
  }, [timer])

  const debouncedCallback = (...args: any) => {
    if (timer) {
      clearTimeout(timer)
    }

    if (immediate) {
      callback(...args)
      return
    }

    const newTimer = setTimeout(() => {
      callback(...args)
    }, delay)

    setTimer(newTimer)
  }

  return debouncedCallback
}
export default useDebounceCallback

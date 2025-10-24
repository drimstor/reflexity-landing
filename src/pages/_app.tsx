import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { amplitudeService } from '../../lib/services/amplitude'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  // Инициализация Amplitude при монтировании приложения
  useEffect(() => {
    amplitudeService.init()
  }, [])

  // Трек изменения страниц
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      amplitudeService.trackPageView(url, document.title)
    }

    // Трек первой загрузки страницы
    amplitudeService.trackPageView(router.pathname, document.title)

    // Подписка на изменения роутера
    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router])

  return (
    <main id='body'>
      <Component {...pageProps} />
    </main>
  )
}

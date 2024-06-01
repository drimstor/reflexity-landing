import '@/styles/globals.scss'
import { Inter } from '@next/font/google'
import type { AppProps } from 'next/app'

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '600'],
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main id='body' className={inter.className}>
      <Component {...pageProps} />
    </main>
  )
}

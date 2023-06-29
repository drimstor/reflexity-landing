import Head from 'next/head'
import { Inter } from '@next/font/google'
import Header from 'components/Header/Header'
import clsx from 'clsx'
import PageCarousel from 'components/PageCarousel/PageCarousel'

const inter = Inter({ subsets: ['latin', 'cyrillic'], weight: ['400', '600'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>BITCONCE</title>
      </Head>
      <main className={inter.className}>
        <Header />
        <PageCarousel />
      </main>
    </>
  )
}

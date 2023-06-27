import Head from 'next/head'
import { Inter } from '@next/font/google'
import Header from 'components/Header/Header'
import clsx from 'clsx'

const inter = Inter({ subsets: ['latin'], weight: ['400', '600'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>BITCONCE</title>
      </Head>
      <main className={clsx(inter.className, 'landingPage')}>
        <Header />
      </main>
    </>
  )
}

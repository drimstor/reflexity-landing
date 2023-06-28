import Head from 'next/head'
import { Inter } from '@next/font/google'
import Header from 'components/Header/Header'
import clsx from 'clsx'
import mainCircle from '../../public/mainCircle.svg'
import Image from 'next/image'

const inter = Inter({ subsets: ['latin', 'cyrillic'], weight: ['400', '600'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>BITCONCE</title>
      </Head>
      <main className={clsx(inter.className, 'landingPage')}>
        <Header />
        {/* <Image src={mainCircle} alt='circle' /> */}
      </main>
    </>
  )
}

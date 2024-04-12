import Head from 'next/head'
import { Inter } from '@next/font/google'
import PageCarousel from 'components/PageCarousel/PageCarousel'
import Button from 'components/UI-kit/Buttons/Button'
import { useEffect, useState } from 'react'

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '600'],
})

export default function Home() {
  return (
    <>
      <Head>
        <title>Paykins</title>
      </Head>
        <main id='body' className={inter.className}>
          <PageCarousel />
        </main>
    </>
  )
}

import Head from 'next/head'
import { Inter } from '@next/font/google'
import PageCarousel from 'components/PageCarousel/PageCarousel'
import Button from 'components/UI-kit/Buttons/Button'
import { useEffect, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '600'],
})

const PASSWORD = 'edac624e-11ed-434e-9d83-785d99ee0ec9'
// const TEST_SITE_KEY = '6Ld-LCgnAAAAAPbyJRGPBQGXvBvLEEIFJWbPZr2b'
const TEST_SITE_KEY = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'

export default function Home() {
  const [isShow, setIsShow] = useState(false)
  const [captchaIsDone, setCaptchaIsDone] = useState(false)

  function onChange() {
    setCaptchaIsDone(true)
  }

  const onSubmitHandler = (e: any) => {
    e.preventDefault()
    if (e.target.input.value === PASSWORD && captchaIsDone) {
      setIsShow(true)
      localStorage.setItem('password', e.target.input.value)
    }
  }

  useEffect(() => {
    if (localStorage.getItem('password') === PASSWORD) {
      setIsShow(true)
    }
  }, [])

  return (
    <>
      <Head>
        <title>Paykins</title>
      </Head>
      {!isShow ? (
        <form
          onSubmit={onSubmitHandler}
          className={inter.className}
          style={{
            position: 'absolute',
            left: '39%',
            top: '40%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <h2>Введите пароль:</h2>
          <input
            name='input'
            style={{
              height: '36px',
              borderRadius: '8px',
              width: '300px',
              border: 'none',
              paddingLeft: '8px',
            }}
            type='text'
          />
          <ReCAPTCHA sitekey={TEST_SITE_KEY} onChange={onChange} />
          <Button typeSubmit variant='contained' size='small'>
            Ок
          </Button>
        </form>
      ) : (
        <main className={inter.className}>
          <PageCarousel />
        </main>
      )}
    </>
  )
}

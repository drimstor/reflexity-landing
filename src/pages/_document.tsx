import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        {/* Базовые SEO метаданные */}
        <meta
          name='description'
          content='Reflexity - Your Personal AI Life Manager'
        />
        <meta
          name='keywords'
          content='Reflexity, AI, Life Manager, Цифровые продукты, Цифровое развитие'
        />
        <meta name='author' content='Reflexity Team' />

        {/* Open Graph для социальных сетей */}
        <meta property='og:type' content='website' />
        <meta property='og:title' content='Reflexity' />
        <meta
          property='og:description'
          content='Your Personal AI Life Manager'
        />
        <meta property='og:image' content='/social-banner.png' />
        <meta property='og:image:width' content='1200' />
        <meta property='og:image:height' content='630' />
        <meta property='og:url' content='https://reflexity.pro' />
        <meta property='og:site_name' content='Reflexity' />

        {/* Twitter Card */}
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content='Reflexity' />
        <meta
          name='twitter:description'
          content='Your Personal AI Life Manager'
        />
        <meta name='twitter:image' content='/twitter-banner.png' />
        <meta name='twitter:image:width' content='1200' />
        <meta name='twitter:image:height' content='675' />
        {/* Дополнительные метаданные */}
        <meta name='robots' content='index, follow' />
        <link rel='canonical' href='https://reflexity.pro' />

        <link rel='icon' href='/favicon.ico' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

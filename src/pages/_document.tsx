import { Head, Html, Main, NextScript } from 'next/document'

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
          content='Reflexity, AI, Life Manager, journaling, mindfulness, self-growth'
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
        <meta name='twitter:image' content='/social-banner.png' />
        <meta name='twitter:image:width' content='1200' />
        <meta name='twitter:image:height' content='675' />
        {/* Дополнительные метаданные */}
        <meta name='robots' content='index, follow' />
        <link rel='canonical' href='https://reflexity.pro' />

        {/* Favicon для различных браузеров */}
        <link rel='icon' type='image/x-icon' href='/favicon.ico' />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon-16x16.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='48x48'
          href='/favicon-48x48.png'
        />

        {/* Apple Touch Icons для iOS */}
        <link
          rel='apple-touch-icon'
          sizes='57x57'
          href='/apple-touch-icon-57x57.png'
        />
        <link
          rel='apple-touch-icon'
          sizes='60x60'
          href='/apple-touch-icon-60x60.png'
        />
        <link
          rel='apple-touch-icon'
          sizes='72x72'
          href='/apple-touch-icon-72x72.png'
        />
        <link
          rel='apple-touch-icon'
          sizes='76x76'
          href='/apple-touch-icon-76x76.png'
        />
        <link
          rel='apple-touch-icon'
          sizes='114x114'
          href='/apple-touch-icon-114x114.png'
        />
        <link
          rel='apple-touch-icon'
          sizes='120x120'
          href='/apple-touch-icon-120x120.png'
        />
        <link
          rel='apple-touch-icon'
          sizes='144x144'
          href='/apple-touch-icon-144x144.png'
        />
        <link
          rel='apple-touch-icon'
          sizes='152x152'
          href='/apple-touch-icon-152x152.png'
        />
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/apple-touch-icon-180x180.png'
        />
        <link rel='apple-touch-icon' href='/apple-touch-icon.png' />

        {/* Android/Chrome Icons */}
        <link
          rel='icon'
          type='image/png'
          sizes='192x192'
          href='/android-chrome-192x192.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='512x512'
          href='/android-chrome-512x512.png'
        />

        {/* Safari Pinned Tab */}
        <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#000000' />

        {/* Manifest для PWA (опционально) */}
        <link rel='manifest' href='/site.webmanifest' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

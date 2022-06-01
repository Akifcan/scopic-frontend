import '../styles/globals.css'
import type { AppProps } from 'next/app'
import 'bootstrap/dist/css/bootstrap.css'
import '@/styles/globals.css'
import Head from "next/head"
import { AuthProvider } from '@/hooks/useAuth'
import Script from 'next/script'

function MyApp({ Component, pageProps }: AppProps) {

  return <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    <AuthProvider>
      <Component {...pageProps} />
      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW" crossOrigin="anonymous" />
    </AuthProvider>
  </>
}

export default MyApp

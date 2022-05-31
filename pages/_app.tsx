import '../styles/globals.css'
import type { AppProps } from 'next/app'
import 'bootstrap/dist/css/bootstrap.css'
import '@/styles/globals.css'
import Head from "next/head"
import { AuthProvider } from '@/hooks/useAuth'

function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  </>
}

export default MyApp

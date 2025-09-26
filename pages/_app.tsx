import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { usePathname } from 'next/navigation'

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient()
  const pathname = usePathname()

  return (
    <>
      <Head>
        <title>AIchhörnchen</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=1"/>
      </Head>
      <QueryClientProvider client={queryClient}>
         <Component {...pageProps} />
      </QueryClientProvider>
    </>
  )
}

export default MyApp
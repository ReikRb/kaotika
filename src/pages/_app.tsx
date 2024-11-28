import { SessionProvider } from "next-auth/react";
import { AppProps } from 'next/app';
import "../styles/globals.css";
import {NextUIProvider} from "@nextui-org/react";
import Head from "next/head";


function MyApp({ Component, pageProps }: AppProps) {

  const mockSession = {
    user: {
      name: 'Il Ratto',
      email: 'victor.duran@ikasle.aeg.eus',
      image: '',
    },
     accessToken:'',
     refreshToken: '',
     email: '',
     expires:''
  }

  return (
    <SessionProvider session={mockSession}>
      <NextUIProvider>
          <Head>
            <link rel='icon' href='/favicon.ico' />
          </Head>
          <Component {...pageProps} />
      </NextUIProvider>
    </SessionProvider>
  );

}

export default MyApp;
import { SessionProvider } from "next-auth/react";
import { AppProps } from 'next/app';
import "../styles/globals.css";
import {NextUIProvider} from "@nextui-org/react";
import Head from "next/head";

const mockSession = {
  user: {
    name: 'Unai',
    email: 'unai.roca@ikasle.aeg.eus',
    image: 'https://lh3.googleusercontent.com/a/ACg8ocI06V7E80-0BX0KSzg6VsriKhB7RhGne3im2QsX5awsoeZ2vgM=s96-c',
  },
   accessToken:'',
   refreshToken: '',
   email: '',
   expires:''
}

function MyApp({ Component, pageProps }: AppProps) {
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
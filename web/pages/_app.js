"use client";
import { NextUIProvider } from "@nextui-org/react";
import '../styles/tailwind.css'; // Import Tailwind CSS
import '../styles/main.css'; // Import global CSS
import Head from 'next/head';
import RootLayout from "../layouts/layout";
import { Kumbh_Sans } from 'next/font/google';
const inter = Kumbh_Sans({ subsets: ['latin'] })
function MyApp({ Component, pageProps }) {
  return (

    <NextUIProvider>
        <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;1,100&display=swap" rel="stylesheet"/>
      </Head>
      <main className={inter.className}>
        <RootLayout>
            <Component {...pageProps} />
        </RootLayout>
      </main>
    </NextUIProvider>
  );
}
export default MyApp;

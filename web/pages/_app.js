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
      <main className={inter.className} >
        <RootLayout>
            <Component {...pageProps} />
        </RootLayout>
      </main>
    </NextUIProvider>
  );
}
export default MyApp;

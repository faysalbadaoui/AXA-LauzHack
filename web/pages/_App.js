"use client";
import { NextUIProvider } from "@nextui-org/react";
import '../styles/tailwind.css'; // Import Tailwind CSS
import '../styles/main.css'; // Import global CSS
import './mouseCard.css';
import RootLayout from "../layouts/layout.js";
import { Kumbh_Sans } from 'next/font/google';
import Head from "next/head";

const inter = Kumbh_Sans({ subsets: ['latin'] })
function MyApp({ Component, pageProps }) {
  return (

    <NextUIProvider>
      
      <main className={inter.className}>
        <RootLayout>
            <Component {...pageProps} />
        </RootLayout>
      </main>
    </NextUIProvider>
  );
}
export default MyApp;

"use client";
import { NextUIProvider } from "@nextui-org/react";
import '../styles/tailwind.css'; // Import Tailwind CSS
import '../styles/main.css'; // Import global CSS
import RootLayout from "../layouts/layout";

function MyApp({ Component, pageProps }) {
  return (

    <NextUIProvider>
      <main>
        <RootLayout>
            <Component {...pageProps} />
        </RootLayout>
      </main>
    </NextUIProvider>
  );
}
export default MyApp;

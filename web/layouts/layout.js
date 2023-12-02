"use client";
import React from "react";
import Head from 'next/head';
export default function RootLayout({ children }) {
  return (
    
    <div style={{ display: "flex", flexDirection: "column"}} className="items-center justify-center w-full h-full">
        {children}
    </div>
  );
}

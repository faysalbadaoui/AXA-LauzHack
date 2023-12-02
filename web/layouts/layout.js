"use client";
import React from "react";
import Head from 'next/head';
export default function RootLayout({ children }) {
  return (
    
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <div style={{ flex: 1, overflowY: "auto" }}>
        {children}
        </div>
    </div>
  );
}

"use client";
import React from "react";
import NavBarSecutry from '../components/navbar';
import Head from 'next/head';
import { Analytics } from '@vercel/analytics/react';
export default function RootLayout({ children }) {
  return (
    
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
  
      <NavBarSecutry />
      <div style={{ flex: 1, overflowY: "auto" }}>
        {children}
        <Analytics />
        </div>
    </div>
  );
}

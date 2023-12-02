"use client";
import React from "react";
import Head from "next/head";
import { Button } from "@nextui-org/button";
function HomePage() {
  const [step, setStep] = React.useState(1);

  return (
      <div className="w-full h-full bg-gradient-to-b from-[#000435] to-[#28002E]">
        {step === 1 && (
          <div className="flex flex-col items-center justify-center h-[80vh] p-20 w-[90vw] min-w-[800px] max-w-[1200px] bg-[#000000] bg-opacity-50">
            <h1>
              Describe your situation
            </h1>
          </div>    
        )} 

      </div>
    
  );
}

export default HomePage;

"use client";
import React from "react";
import Head from "next/head";
import { Button } from "@nextui-org/button";
function HomePage() {
  const [step, setStep] = React.useState(1);

  return (
      <div className="w-full h-full bg-gradient-to-b from-[#000435] to-[#28002E] items-center justify-center">
        {step === 1 && (
          <div className="self-center flex flex-col h-[80vh] p-20 w-[90vw] min-w-[800px] max-w-[1200px] bg-[#000000] bg-opacity-50 rounded-[40px]">
            <h1 className="text-center font-bold text-[4vh]">
              Describe your situation
            </h1>
          </div>    
        )} 

      </div>
    
  );
}

export default HomePage;

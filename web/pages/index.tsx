"use client";
import React from "react";
import Head from "next/head";
import { Button } from "@nextui-org/button";
import {Textarea} from "@nextui-org/react";

function HomePage() {
  const [step, setStep] = React.useState(1);
  const [globalContext, setGlobalContext] = React.useState(""); // State variable for user input
  const [userSituation, setUserSituation] = React.useState(""); // State variable for user input

  const handleSituationChange = (e) => {
    setUserSituation(e.target.value); 
    console.log(userSituation);
  };
  const onSubmit = () => {
    setStep(2);
  }
  return (
    <>
    <Head>
      <title>What Insurance could I need?</title>
    </Head>
    <div className="flex w-full h-screen items-center justify-center bg-gradient-to-b from-[#000435] to-[#28002E]">
        {step === 1 && (
          <div className="self-center flex flex-col sm:p-20 p-5 sm:m-0 m-2 sm:w-[700px] w-[490px] sm:h-[650px] h-[600px] sm:min-w-[200px] bg-[#000000] bg-opacity-50 rounded-[40px] items-center justify-center">
            <h1 className="text-center font-bold text-[4vh] mb-10">
              What Insurance could you need?
            </h1>
            <Textarea
              label="Tell us"
              variant="bordered"
              placeholder="Enter your situation"
              disableAnimation
              disableAutosize
              value={userSituation} // Bind state to Textarea
              onChange={handleSituationChange} // Set the change handler
              classNames={{
                base: "sm:w-[600px] w-[400px]",
                input: "resize-y min-h-[190px]",
              }}
            />
            <Button className="bg-[#9932CC] mt-10" onPress={onSubmit}>
              Submit
            </Button>
          </div>    
        )} 
        {step === 2 && (
          <div className="self-center flex flex-col sm:p-20 p-5 sm:m-0 m-2 sm:w-[700px] w-[490px] sm:h-[650px] h-[600px] sm:min-w-[200px] bg-[#000000] bg-opacity-50 rounded-[40px] items-center justify-center">
            <h1 className="text-center font-bold text-[4vh] mb-10">
              Describe your situation
            </h1>
            <Textarea
              label="Tell us"
              variant="bordered"
              placeholder="Enter your situation"
              disableAnimation
              disableAutosize
              value={userSituation} // Bind state to Textarea
              onChange={handleSituationChange} // Set the change handler
              classNames={{
                base: "sm:w-[600px] w-[400px]",
                input: "resize-y min-h-[190px]",
              }}
            />
            <Button className="bg-[#9932CC] mt-10" onPress={onSubmit}>
              Submit
            </Button>
          </div>    
        )} 

      </div>
    </>
  );
}

export default HomePage;

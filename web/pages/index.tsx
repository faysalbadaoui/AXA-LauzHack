"use client";
import React from "react";
import Head from "next/head";
import { Button } from "@nextui-org/button";
import {Spinner, Textarea} from "@nextui-org/react";
import MessageArea from "../components/textArea.js";
import {GPTChatService} from "./services/gpt.ts";

function HomePage() {
  const [step, setStep] = React.useState(1);
  const [userSituation, setUserSituation] = React.useState(""); // State variable for user input
  const gptService = new GPTChatService(); // State variable for user input
  const [clicked, setClicked] = React.useState(false); // State variable for user input
  const handleSituationChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setUserSituation(e.target.value); 
    console.log(userSituation);
  };

  const onSubmit = () => {
    setClicked(true);
    const result = gptService.initGptStorie(userSituation)
      .then(result => {
        console.log(result);
        setClicked(false);
        setStep(2);
      })
      .catch(error => {
        console.error('Error:', error);
        setClicked(false);
      });  
    console.log(result);
  }
  return (
    <>
    <Head>
      <title>What Insurance could I need?</title>
    </Head>
    <div className="flex w-full flex-col h-screen items-center justify-center bg-gradient-to-b from-[#000435] to-[#28002E]">
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
            {clicked && (
              <Spinner className="mt-10" color="primary" />
            )}
            {!clicked && (
              <Button className="bg-[#9932CC] mt-10" onPress={onSubmit}>
                Submit
              </Button>
            )}
          </div>    
        )} 
        {step === 2 && (
          <div className="self-center flex flex-col sm:p-20 p-5 sm:m-0 m-2 sm:min-w-[700px] w-[490px] sm:min-h-[650px] min-h-[600px] sm:min-w-[200px] bg-[#000000] bg-opacity-50 rounded-[40px] items-center justify-center">
            <h1 className="text-center font-bold text-[4vh] mb-10">
              Here's what Insunator thinks:
            </h1>
            <MessageArea text=""/>
          </div>    
        )} 

        
      </div>
    </>
  );
}

export default HomePage;

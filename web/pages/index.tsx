"use client";
import React from "react";
import Head from "next/head";
import { Button } from "@nextui-org/button";
import {Textarea} from "@nextui-org/react";
import MessageArea from "../components/textArea.js";
import {GPTChatService} from "./services/gpt.ts";
function HomePage() {
  const [step, setStep] = React.useState(1);
  const [userSituation, setUserSituation] = React.useState(""); // State variable for user input
  const gptService = new GPTChatService(); // State variable for user input
  const handleSituationChange = (e) => {
    setUserSituation(e.target.value); 
    console.log(userSituation);
  };
  const onSubmit = () => {
    const result = gptService.getGptStorieOptions([{ role: 'user', content: 'Va un gos i cau.' }, { role: 'assistant', content: 'Un gos verd anava al cole' },{ role: 'system', content: 'Give me two words separated by a comma that are key to continuing the story, then they will be used to further generate the story.' }]);
    console.log(result);
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
          <div className="self-center flex flex-col sm:p-20 p-5 sm:m-0 m-2 sm:min-w-[700px] w-[490px] sm:min-h-[650px] min-h-[600px] sm:min-w-[200px] bg-[#000000] bg-opacity-50 rounded-[40px] items-center justify-center">
            <h1 className="text-center font-bold text-[4vh] mb-10">
              Here's what Insunator thinks:
            </h1>
            <MessageArea text="You should get a car insurance sad
            d asd asdsa sadsadddddddddddddar insurance sad
            " />
          </div>    
          
        )} 

      </div>
    </>
  );
}

export default HomePage;

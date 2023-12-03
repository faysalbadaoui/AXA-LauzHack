import { useEffect, useState } from "react";
import { Button, Textarea, button, image } from "@nextui-org/react";
import { Image } from "@nextui-org/react";
import Typewriter from 'typewriter-effect';

function EndArea({ text, imageUrl, service, onClickTheButton }) {
    const chunkSize = 10;
    const [currentText, setCurrentText] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTyping, setIsTyping] = useState(false);
    console.log(imageUrl)
    const serviceNameValue = service.serviceName
    const serviceUrlValue = service.serviceURL
    console.log(service)
    console.log(serviceNameValue)
    console.log(serviceUrlValue)
    
    const onClickButton = (button) => {
        onClickTheButton(button)
    }
  return (
    <>
        <div className="w-full min-h-[60px] bg-white bg-opacity-10 rounded-[30px] p-4">
        
        <Typewriter
            onInit={(typewriter) => {
                setIsTyping(true);
                typewriter.typeString(text)
                .callFunction(() => {
                    setCurrentText(true);
                    console.log('String typed out!');
                    setIsTyping(false);
                })
                .pauseFor(10000000000000)
                .callFunction(() => {
                    console.log('All strings were deleted');
                })
                .start();
            }}
            />

        {!isTyping ? <span className="text-white mt-6">The best AXA service that suits with the story is: { serviceNameValue } <a href={serviceUrlValue}>{serviceUrlValue}</a> </span> : <span></span>}
                
        </div>

    </>

  );
}

export default EndArea;

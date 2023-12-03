import { useEffect, useState } from "react";
import { Button, Textarea, button, image } from "@nextui-org/react";
import { Image } from "@nextui-org/react";
import Typewriter from 'typewriter-effect';

function EndArea({ text, imageUrl, buttons, onClickTheButton }) {
    const chunkSize = 10;
    const [currentText, setCurrentText] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    console.log(imageUrl)
    
    const onClickButton = (button) => {
        onClickTheButton(button)
    }
  return (
    <>
        <div className="w-full min-h-[60px] bg-white bg-opacity-10 rounded-[30px] p-4">
        
        <Typewriter
            onInit={(typewriter) => {
                typewriter.typeString(text)
                .callFunction(() => {
                    setCurrentText(true);
                    console.log('String typed out!');
                })
                .pauseFor(10000000000000)
                .callFunction(() => {
                    console.log('All strings were deleted');
                })
                .start();
            }}
            />
                
        </div>

    </>

  );
}

export default EndArea;

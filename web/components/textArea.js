import { useEffect, useState } from "react";
import { Button, Textarea, button } from "@nextui-org/react";
import Typewriter from 'typewriter-effect'; 

function MessageArea({ text, imageUrl, buttons, onClickTheButton }) {
    const chunkSize = 10;
    const [currentText, setCurrentText] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    
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

        {currentText && (
            <div className="w-full flex flex-col mt-5 justify-around ">
                <Button className="bg-[#9932CC] m-2" onClick={() => {onClickButton(buttons[0])}}>{buttons[0]}</Button>
                <Button className="bg-[#9932CC] m-2" onClick={() => {onClickButton(buttons[1])}}>{buttons[1]}</Button>
                <Button className="bg-[#FF0000] m-2" onClick={() => {onClickButton("End")}}>End Story</Button>
            </div>
        )}
    </>

  );
}

export default MessageArea;

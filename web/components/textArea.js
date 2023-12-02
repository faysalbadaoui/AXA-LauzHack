import { useEffect, useState } from "react";
import { Button, Textarea, button } from "@nextui-org/react";
import Typewriter from 'typewriter-effect'; 

function MessageArea({ text, buttons, onClickTheButton }) {
    const chunkSize = 10;
    const [currentText, setCurrentText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    
    const onClickButton = (button) => {
        onClickTheButton(button)
    }

    useEffect(() => {
      /*const interval = setInterval(() => {
        if (currentIndex < text.length) {
          const nextChunk = text.slice(currentIndex, currentIndex + chunkSize);
          setCurrentText(currentText => currentText + nextChunk);
          setCurrentIndex(currentIndex => currentIndex + chunkSize);
        } else {
          clearInterval(interval);
        }
      }, 700);
  
      return () => clearInterval(interval);*/
    }, [currentIndex, text]);
  return (
    <>
        <div className="w-full min-h-[60px] bg-white bg-opacity-10 rounded-[30px] p-4">
            <Typewriter 
                onInit={(typewriter) => { 
                typewriter.typeString(text) 
                    .callFunction(() => { 
                        setCurrentText(text);
                    console.log('String typed out!'); 
                    }) 
                    .start();
                }} 
        /> 
        </div>

        {currentText == text && (
            <div className="w-full flex flex.row justify-around mt-5">
                <Button className="bg-[#9932CC]" onClick={onClickButton(buttons[0])}>{buttons[0]}</Button>
                <Button className="bg-[#9932CC]" onClick={onClickButton(buttons[1])}>{buttons[0]}</Button>
                <Button className="bg-[#FF0000]" onClick={onClickButton("End")}>End Story</Button>
            </div>
        )}
    </>

  );
}

export default MessageArea;

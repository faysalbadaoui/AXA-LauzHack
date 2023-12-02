import { useEffect, useState } from "react";
import { Button, Textarea, button } from "@nextui-org/react";
function MessageArea({ text, buttons }) {
    const chunkSize = 10;
    const [currentText, setCurrentText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    
    useEffect(() => {
      const interval = setInterval(() => {
        if (currentIndex < text.length) {
          const nextChunk = text.slice(currentIndex, currentIndex + chunkSize);
          setCurrentText(currentText => currentText + nextChunk);
          setCurrentIndex(currentIndex => currentIndex + chunkSize);
        } else {
          clearInterval(interval);
        }
      }, 700);
  
      return () => clearInterval(interval);
    }, [currentIndex, text]);
  return (
    <>
        <div className="w-full min-h-[40px] bg-white bg-opacity-10 rounded-[30px] p-4">
        {currentText}
        </div>
        {currentText == text && (
            <div className="w-full flex flex.row justify-around mt-5">
                <Button className="bg-[#9932CC]">{buttons[0]}</Button>
                <Button className="bg-[#9932CC]">{buttons[0]}</Button>
                <Button className="bg-[#FF0000]">End</Button>
            </div>
        )}
    </>

  );
}

export default MessageArea;

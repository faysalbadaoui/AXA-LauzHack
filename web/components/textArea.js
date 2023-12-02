import { useEffect, useState } from "react";
import { Button, Textarea } from "@nextui-org/react";
function MessageArea({ text }) {
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
                <Button className="bg-[#800080]">Creative</Button>
                <Button className="bg-[#800080]">Professional</Button>
                <Button className="bg-[#FF0000]">X</Button>
            </div>
        )}
    </>

  );
}

export default MessageArea;

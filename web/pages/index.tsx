"use client";
import React, { useEffect } from "react";
import Head from "next/head";
import { Button } from "@nextui-org/button";
import {Spinner, Textarea} from "@nextui-org/react";
import MessageArea from "../components/textArea.js";
import EndArea from "../components/endArea.js";
import {GPTChatService} from "../components/gpt";
import Image from "next/image";
const { ethers } = require('ethers');
import Web3 from 'web3';

const CONTRACT_ADDRESS = "0x2492d1CeF3d23EC48ADa469003D8652375d791f0";



const mintNFTUser = async (clientS) => {
    console.log("clientS: ", clientS);
    if(window !== undefined && (window as any).ethereum !== undefined){
      try{
          const web3 = new Web3((window as any).ethereum);
          await (window as any).ethereum.enable();
          const contractArtifact = require('./AxaToken.json');
          const contractABI = contractArtifact.abi;
          const providerU = process.env.NEXT_PUBLIC_providerUrl;
          const contractAddress = CONTRACT_ADDRESS;
          const accountPrivateKey = process.env.NEXT_PUBLIC_accountPrivateKey
          const provider = new ethers.providers.JsonRpcProvider(providerU);
          const signer = new ethers.Wallet(accountPrivateKey, provider);
          const contract = new ethers.Contract(contractAddress, contractABI, signer);
          
          console.log("Account address: ", signer.address);
          try{
            const tx = contract.mint(clientS, ethers.utils.parseUnits("30"));
          }catch(error){
            console.error('Error:', error);
          }
         
        
      }catch(error){
        console.error('Error:', error);
      }
    }

}

function HomePage() {
  const [title, setTitle] = React.useState("Title of your story");
  const [isWalletConnected, setIsWalletConnected] = React.useState(false);
  const [step, setStep] = React.useState(1);
  const [userSituation, setUserSituation] = React.useState(""); 
  const gptService = new GPTChatService(); 
  const [clicked, setClicked] = React.useState(false); 
  const [story, setStory] = React.useState(""); 
  const [client, setClient] = React.useState("");
  const handleSituationChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setUserSituation(e.target.value); 
  };
  const [buttons, setButtons] = React.useState([]);
  const [imageUrl, setImageUrl] = React.useState("");
  
  const connectWallet = async () => {
    if (typeof (window as any).ethereum !== 'undefined') {
      try {
        const clientR = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
        console.log('client:', clientR);     
        setClient(clientR[0]);
        console.log('client:', clientR[0]);
        setIsWalletConnected(true);
        mintNFTUser(clientR[0]);
      } catch (error) {
        console.error('Error connecting to wallet:', error);
      }
    } else {
      console.log('Ethereum wallet is not installed');
    }
  };

  const onSubmit = () => {
    setClicked(true);
    gptService.getGptTitle(userSituation).then(result => {
      setTitle(result);
      console.log(result);
    })
    gptService.getGptStorie(userSituation)
      .then(result => {
        setStory(result);
        setClicked(false);
        console.log(result);
        gptService.getGptStorieOptions().then(result => {
          setButtons(result);
          console.log(result);
        }).catch(error => {
          console.error('Error:', error);
        });
        gptService.getGptImage(result).then(result => {
          setImageUrl(result);
          console.log(result);


          // aqui


        }).catch(error => {
          console.error('Error:', error);
        });
        setStep(2);
      })
      .catch(error => {
        console.error('Error:', error);
        setClicked(false);
      }); 
  }

  const onClickButtonsPage = (num, button) => {
    setStep(4);
    setImageUrl("");
    console.log(num);
    console.log(button);
    if(num === 0 || num ===1){
      gptService.doGptStorieOption(button)
      .then(result => {
        setStory(result);
        console.log(result);
        gptService.getGptStorieOptions().then(result => {
          setButtons(result);
          console.log(result);
        }).catch(error => {
          console.error('Error:', error);
        });
        gptService.getGptImage(result).then(result => {
          setImageUrl(result);
          console.log(result);
        }).catch(error => {
          console.error('Error:', error);
        });
        setStep(2);
      })
      .catch(error => {
        console.error('Error:', error);
      }); 
    }else{
      gptService.doGptStorieEnding().then(result => {
        setStory(result);
        setStep(3);
    }).catch(error => {
      console.error('Error:', error);
    });
  }
  }

  return (
    <>
      <Head>
        <title>What Insurance could I need?</title>
      </Head>
      <div className="flex w-full flex-col h-screen items-center justify-center bg-gradient-to-b from-[#00008F] to-[#28002E]">
          <div className="flex flex-row">
            <Image src="/res/logo.png" alt="logo" width={250} height={150} />
          </div>
          {step === 1 && (
            <div className="self-center flex flex-col sm:p-20 shadow shadow-red-500/90 hover:shadow-red-500/90 p-5 sm:m-0 m-2 sm:h-[650px] h-[600px] sm:min-w-[200px] bg-[#000000] bg-opacity-50 rounded-[40px] items-center justify-center">
              <h1 className="text-center font-bold sm:text-[4vh] text-[3vh] mb-10">
               {title}
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
                  base: "sm:w-[600px] w-[320px]",
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
            <div className="self-center shadow shadow-red-500/90 hover:shadow-red-500/90 flex flex-col sm:p-20 p-5 sm:m-0 m-2 sm:min-w-[700px] max-w-[490px] sm:min-h-[650px] min-h-[600px] sm:min-w-[200px] bg-[#000000] bg-opacity-50 rounded-[40px] items-center justify-center">
              <h1 className="text-center font-bold text-[4vh] mb-10">
                {title}
              </h1>
              <MessageArea text={story} imageUrl = {imageUrl} buttons = {buttons} onClickTheButton={onClickButtonsPage}/>
            </div>    
          )}      
          {step === 3 && (
            <div className="self-center shadow shadow-red-500/90 hover:shadow-red-500/90 flex flex-col sm:p-20 p-5 sm:m-0 m-2 sm:min-w-[700px] max-w-[490px] sm:min-h-[650px] min-h-[600px] sm:min-w-[200px] bg-[#000000] bg-opacity-50 rounded-[40px] items-center justify-center">
              <h1 className="text-center font-bold text-[4vh] mb-10">
                We're done. Now generate some tokens!
              </h1>
              <EndArea text={story} imageUrl = {imageUrl} buttons = {buttons} onClickTheButton={onClickButtonsPage}/>
              { !isWalletConnected && (
                  <Button className="bg-[#9932CC] mt-10" onPress={connectWallet}>
                  Mint $AKA tokens
                  </Button>
              )}
            </div>    
          )}  
          {step === 4 && (
            <div className="self-center shadow shadow-red-500/90 hover:shadow-red-500/90 flex flex-col sm:p-20 p-5 sm:m-0 m-2 sm:min-w-[700px] max-w-[490px] sm:min-h-[650px] min-h-[600px] sm:min-w-[200px] bg-[#000000] bg-opacity-50 rounded-[40px] items-center justify-center">
              <Spinner/>
            </div>    
          )} 
          <div className="flex flex-col h-[100px]"></div>
          <div className="self-center  w-full max-w-[77%]  flex flex-col sm:p-20 shadow shadow-red-500/90 hover:shadow-red-500/90 p-5 sm:m-0 m-2 h-[auto] bg-[#000000] bg-opacity-50 rounded-[40px] justify-start mt-[180px] items-center">
          <h1 className="text-center font-bold text-[4vh] mb-10 items-start">
                          History
                        </h1>
            <div id="elements" className="mt-[50px] items-center ">
            </div>
          </div>
          <div className="flex flex-col h-[100px]"></div>

      </div>
    </>
  );
}

export default HomePage;

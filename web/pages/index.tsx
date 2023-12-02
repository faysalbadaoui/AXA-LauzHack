"use client";
import React, { useEffect } from "react";
import Head from "next/head";
import { Button } from "@nextui-org/button";
import {Spinner, Textarea} from "@nextui-org/react";
import MessageArea from "../components/textArea.js";
import {GPTChatService} from "../components/gpt";
import Image from "next/image";
const { ethers } = require('ethers');
import Web3 from 'web3';

const CONTRACT_ADDRESS = "0x2492d1CeF3d23EC48ADa469003D8652375d791f0";

const mintNFTUser = async () => {

    if(window !== undefined){
      try{
          const web3 = new Web3(window.ethereum);
          await window.ethereum.enable();
          const { ethereum } = window;
          const contractArtifact = require('./AxaToken.json');
          const contractABI = contractArtifact.abi;
          const providerU = "https://thrumming-boldest-scion.ethereum-goerli.quiknode.pro/78519f495e10e3f34c65ea1d477f8dbc4de92688/";
          const contractAddress = CONTRACT_ADDRESS;
          const accountPrivateKey = "0f8c237210aa9b0a3a47ee8fefc4a6f5166b9b26acc6e634d24a00a255d174ca";
          const provider = new ethers.providers.JsonRpcProvider(providerU);
          const signer = new ethers.Wallet(accountPrivateKey, provider);
          const contract = new ethers.Contract(contractAddress, contractABI, signer);
          
          console.log("Account address: ", signer.address);
          try{
            const tx = contract.mint(signer.address, ethers.utils.parseUnits("30"));
          }catch(error){
            console.error('Error:', error);
          }
         
        
      }catch(error){
        console.error('Error:', error);
      }
    }

}

function HomePage() {

  const [isWalletConnected, setIsWalletConnected] = React.useState(false);
  const [step, setStep] = React.useState(1);
  const [userSituation, setUserSituation] = React.useState(""); 
  const gptService = new GPTChatService(); 
  const [clicked, setClicked] = React.useState(false); 
  const [story, setStory] = React.useState(""); 

  const handleSituationChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setUserSituation(e.target.value); 
    console.log(userSituation);
  };
  const [buttons, setButtons] = React.useState([]);
  const [imageUrl, setImageUrl] = React.useState("");
  
  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        setIsWalletConnected(true);
        mintNFTUser();
      } catch (error) {
        console.error('Error connecting to wallet:', error);
      }
    } else {
      console.log('Ethereum wallet is not installed');
    }
  };

  const onSubmit = () => {
    setClicked(true);
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
        setStep(2);
      })
      .catch(error => {
        console.error('Error:', error);
        setClicked(false);
      }); 
  }

  const onClickButtonsPage = (num, button) => {
    console.log(num);
    console.log(button);
    gptService.getGptStorie(userSituation)
      .then(result => {
        setStory(result);
        console.log(result);
        gptService.getGptStorieOptions().then(result => {
          setButtons(result);
          console.log(result);
        }).catch(error => {
          console.error('Error:', error);
        });
        setStep(2);
      })
      .catch(error => {
        console.error('Error:', error);
      }); 
  }

  return (
    <>
      <Head>
        <title>What Insurance could I need?</title>
      </Head>
      <div className="flex w-full flex-col h-screen items-center justify-center bg-gradient-to-b from-[#00008F] to-[#28002E]">
          <div className="flex flex-row">
          <Image src="/res/logo.png" alt="logo" width={250} height={150} />
          { !isWalletConnected && (
            <Button className="bg-[#9932CC] mt-10" onPress={connectWallet}>
              Connect Wallet
            </Button>
        )}

          </div>
          
          {step === 1 && (
            <div className="self-center flex flex-col sm:p-20 shadow shadow-red-500/90 hover:shadow-red-500/90 p-5 sm:m-0 m-2 sm:h-[650px] h-[600px] sm:min-w-[200px] bg-[#000000] bg-opacity-50 rounded-[40px] items-center justify-center">
              <h1 className="text-center font-bold sm:text-[4vh] text-[3vh] mb-10">
                Title of your  story
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
                Here's what Insunator thinks:
              </h1>
              <MessageArea text={story} imageUrl = {imageUrl} buttons = {buttons} onClickTheButton={() => {onClickButtonsPage}}/>
            </div>    
          )}      
          {step === 3 && (
            <div className="self-center shadow shadow-red-500/90 hover:shadow-red-500/90 flex flex-col sm:p-20 p-5 sm:m-0 m-2 sm:min-w-[700px] max-w-[490px] sm:min-h-[650px] min-h-[600px] sm:min-w-[200px] bg-[#000000] bg-opacity-50 rounded-[40px] items-center justify-center">
              <h1 className="text-center font-bold text-[4vh] mb-10">
                We're done. Now generate some tokens!
              </h1>
              { isWalletConnected && (
                  <h2>Mint $AKA tokens</h2>
              )}
            </div>    
          )}  
      </div>
    </>
  );
}

export default HomePage;

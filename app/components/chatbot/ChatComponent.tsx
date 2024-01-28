import { Dispatch, KeyboardEvent, SetStateAction, useEffect, useState } from "react";
import { Button } from "../button";
import { TextField } from "../textfield/TextField";
import { ChatHistoryType } from "./ChatHistory";
import ErrorComponent from "./ErrorComponent";
import LoadingSpinner from "./LoadingSpinner";
import { InstructionType } from "@/app/lib/model/Instruction";
// import { useAccount, useChainId } from "wagmi";
// import { bsc, bscTestnet } from 'wagmi/chains'
import { ChatRequest } from "@/app/lib/model/ChatRequest";
import { ChainId, useAddress, useChainId, useConnectionStatus } from "@thirdweb-dev/react";

type ChatComponentProps = {
  chatHistory: ChatHistoryType[]
  setChatHistory: (state: SetStateAction<ChatHistoryType[]>) => void
}

export default function ChatComponent({ chatHistory, setChatHistory }: ChatComponentProps) {
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const address = useAddress();
  
  // const { address, isConnected } = useAccount();

  const chainId = useChainId();
  const connectionStatus = useConnectionStatus();

  const isConnected = connectionStatus === 'connected';


  // Function to send user message and update chat history
  const sendUserMessage = async () => {
    if (userInput.trim() === '') return;

    // Disable input and button during API call
    setIsLoading(true);

    // Create a new chat history entry for the user's message
    const userChatEntry = { message: userInput, isBot: false };

    // Clear user input
    setUserInput('');
    setChatHistory([...chatHistory, userChatEntry]); // hacky
    try {
      // Send user message to the API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: userInput,
          chathistory: [...chatHistory, userChatEntry], // Include chat history
        } as ChatRequest),
      });

      // console.log(response);
      // if (!response.ok) {
      //   throw new Error('Failed to get a response from the API');
      // }

      // // Parse API response
      const data = await response.json() as ChatRequest;

      // // Update chat history with bot's response
      // const botChatEntry = { message: data.answer, isBot: true };
      // setChatHistory([...chatHistory, botChatEntry]);

      // Enable input and button
      // setTimeout(() => {
      //   const response = { isBot: true, message: 'Hello, world' };
      //   setChatHistory([...chatHistory, userChatEntry, response]);
      //   setIsLoading(false);
      // }, 1000);
      setChatHistory(data.chathistory);
    } catch (error) {
      // Handle API error
      console.log(error);
      setErrorMessage('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle user input
  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isLoading) {
      return;
    } 
    setUserInput(e.target.value);
  };

  const handleKeyPressed = (e: KeyboardEvent<Element>) => {
    if (isLoading) {
      return;
    } 
    if (e.shiftKey && e.key === "Enter") {
      return;
    }
    if (e.key === 'Enter') {
      sendUserMessage();
      return;
    }
  }

  useEffect(() => {
    if (isConnected) {
      return;
    }
    if (connectionStatus === 'unknown') {
      return;
    }
    setChatHistory([{
      isBot: true,
      message: "Before we begin, lets connect your metamask to the website. We'll use Metamask and your wallet to deploy the smart contracts.",
    }, {
      isBot: false,
      message: "Please connect to your metamask",
      instruction: InstructionType.CONNECT_WALLET,
    }])
  }, [isConnected, setChatHistory]);

  useEffect(() => {
    if (!isConnected) {
      return;
    }
    if (chainId !== ChainId.BinanceSmartChainTestnet) {
      return;
    }
    setChatHistory([...chatHistory, {
      isBot: true,
      message: `Awesome you're connected as ${address}. Let me know what you'd like to do.`,
      instruction: InstructionType.CONNECT_WALLET,
    }]);
  }, [isConnected, chainId])

  return <div className="flex gap-4 mt-4">
    {errorMessage && (
      <ErrorComponent
        errorMessage={errorMessage}
        onRetry={() => {
          // Implement retry functionality if needed
          setErrorMessage('');
        }}
      />
    )}
    <TextField
      type="text"
      placeholder="How can I help you today?"
      value={userInput}
      onChange={handleUserInput}
      onPress={handleKeyPressed}
      className='flex-1 h-20'
      autoFocus={true}><></></TextField>
    <div className="my-auto">{isLoading && <LoadingSpinner />}</div>
    <Button onClick={sendUserMessage} disabled={isLoading}>
      Send
    </Button>
  </div>
}
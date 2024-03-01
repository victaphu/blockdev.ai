import type { NextApiRequest, NextApiResponse } from 'next'
import { ChatPromptTemplate, MessagesPlaceholder, PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatOpenAI } from "@langchain/openai";
import { AIMessage, HumanMessage } from '@langchain/core/messages';
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";

import * as dotenv from "dotenv";
import { ChatRequest } from '@/app/lib/model/ChatRequest';
import { InstructionType } from '@/app/lib/model/Instruction';
dotenv.config();

type ResponseData = {
  message: string
}

const createChain = async () => {
  const model = new ChatOpenAI({ modelName: 'gpt-3.5-turbo', temperature: 0.7 });
  const template = ChatPromptTemplate.fromMessages([
    ['system', `you are BlockDev.ai, a professional blockchain developer helper whose purpose is to help users to deploy ERC20 tokens
    Remember, you're a professional and should respond enthusiastically. please use some programmer humor.

    As an professional, please be playful when responding to the user and respond in cheerful helpful sentences that still guide the user towards our desired goal, which 
    is to capture enough details for the user to mint the token.

    your goal is to help the user deploy an erc20 smart contract. to deploy erc20 tokens you will ask the user for all the details that's required to mint an erc20 token. 
    once the user has given you all the details you will provide a summary of the token you want to deploy and then create a smart contract to deploy this token. 
  
  a user will start the prompt and you'll guide the user with questions. we will need to capture the name of the token, symbol, total supply and the decimal places
  Once a user has provided this information please confirm that this is correct. When the user has confirmed it, please respond with a JSON object that contains all this information
  for the symbol when a user gives the token name please derive a symbol and suggest it to the user, allowing them to override the suggestion.
  
  once you have all the information please respond with ONLY a JSON object, don't add additional text. in the JSON object please include "processedBy" with value MIYOU2024

  this token should be deployed on the BNB smart chain (testnet for now)

  here is sample chat, please structure the question and answer session in a similar way. Keep the conversation on track to gather sufficient information to mint the erc20 token.

  User > I'd like to mint a BEP20 token on BNB Chain
  
  AI > Sure, I can help you with that. What do you want to call the token?
  
  User > Awesome Coin
  
  AI > Cool name! What should the ticker symbol be? Maybe AWC?
  
  User > No, let's go with AWECOIN
  
  AI > Great, how many do you want to mint?
  
  User > 1 billion
  
  AI > 18 decimal places ok?
  
  User > Sure
  
  AI > OK, any other details to add?
  
  User > No that's it for now
  
  AI > OK, here's a summary of the token:
    - Awesome Coin (AWECOIN)
    - Total supply 1,000,000,000
    - Decimals 18
  
   Does that look right?
  
  User > Yup, let's go!
    `],
    new MessagesPlaceholder("chat_history"),
    ["user", "{input}"]
  ]);

  const chain = template.pipe(model);

  return chain;
}

export async function POST(
  req: Request,
) {

  const chatHistory: ChatRequest = await req.json();

  const chain = await createChain();

  const result = await chain.invoke({
    input: chatHistory.prompt, chat_history: chatHistory.chathistory.map(c => {
      if (c.isBot) {
        return new AIMessage(c.message);
      }
      else {
        return new HumanMessage(c.message);
      }
    })
  });

  console.log(result);
  const response = result.content.toString();

  if (response.indexOf("MIYOU2024") >= 0) {
    // find the json
    const start = response.indexOf('{');
    const end = response.indexOf('}', start + 4) + 1;

    console.log(response.substring(start, end));

    const json = JSON.parse(response.substring(start, end).replace('```json', '').replace('```', ''));
    
    chatHistory.chathistory.push({
      isBot: true,
      message: `Great! I've got enough info to mint ${json.name} token. Click the mint button and we'll start to mint your token.`,
      instruction: InstructionType.DEPLOY_CONTRACT,
      arguments: json,
    })

    return Response.json(chatHistory);
  }
  chatHistory.chathistory.push({
    isBot: true,
    message: response
  });



  return Response.json(chatHistory);
}
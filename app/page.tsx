"use client"

import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react';
import { Binance, BinanceTestnet } from '@thirdweb-dev/chains'
import { ThemeProvider, createTheme } from "@mui/material";
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import ChatContainer from './components/chat/chatcontainer';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <ThemeProvider theme={createTheme()}>
        <ThirdwebProvider supportedChains={[Binance, BinanceTestnet]} autoSwitch activeChain={BinanceTestnet} clientId='396fcd2ea31d6d2ea00beab66df77e25'>

          <Header />
          <div className='flex flex-row w-full flex-1 h-screen'>
            <Sidebar />
            <ChatContainer />
          </div>
        </ThirdwebProvider>
      </ThemeProvider>
    </main>
  );
}

"use client"
import { type CSSObject, Global } from '@emotion/react';
import {
  createAppTheme, createAppStylesBaseline,
  type AnimatorGeneralProviderSettings,
  AnimatorGeneralProvider,
  type BleepsProviderSettings,
  BleepsProvider,
  GridLines, Dots, MovingLines, Animator

} from '@arwes/react';
import { ReactElement } from "react";
import Main from './Main';
import { ThemeProvider } from '@mui/material';
import { Theme, createTheme } from '@arwes/design';

import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react';
import { Binance, BinanceTestnet } from '@thirdweb-dev/chains'

const theme_setting = createAppTheme();
const stylesBaseline = createAppStylesBaseline(theme_setting);
const animatorsSettings: AnimatorGeneralProviderSettings = {
  // Durations in seconds.
  duration: {
    enter: 0.2,
    exit: 0.2,
    stagger: 0.04
  }
};

const bleepsSettings: BleepsProviderSettings = {
  // Shared global audio settings.
  master: {
    volume: 0.9
  },
  bleeps: {
    // A transition bleep sound to play when the user enters the app.
    intro: {
      sources: [
        { src: 'https://arwes.dev/assets/sounds/intro.mp3', type: 'audio/mpeg' }
      ]
    },
    // An interactive bleep sound to play when user clicks.
    click: {
      sources: [
        { src: 'https://arwes.dev/assets/sounds/click.mp3', type: 'audio/mpeg' }
      ]
    }
  }
};

const Background = (): ReactElement => {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: theme_setting.colors.primary.bg(1)
      }}
    >
      <GridLines lineColor={theme_setting.colors.primary.deco(0)} />
      <Dots color={theme_setting.colors.primary.deco(1)} />
      <MovingLines lineColor={theme_setting.colors.primary.deco(2)} />
    </div>
  );
};

export default function Home() {
  const theme: Theme = createTheme({
    space: 1,
    size: () => '20px',
    color: () => [0, 0, 0, 0],
    font: [{ fontSize: '10px' }],
    palette: {
      primary: { main: '#00f8f8' },
      secondary: { main: '#F8F800' },
      text: { main: '#2CFFFF' },
      neutral: { main: '#021114' },
    },
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Global styles={stylesBaseline as Record<string, CSSObject>} />
      <ThemeProvider theme={{ ...theme }}>
        <AnimatorGeneralProvider {...animatorsSettings}>
          <BleepsProvider {...bleepsSettings}>
            <Animator>
              <Background />
            </Animator>
            <Animator manager='stagger'>
              <ThirdwebProvider supportedChains={[Binance, BinanceTestnet]} autoSwitch activeChain={BinanceTestnet} clientId='396fcd2ea31d6d2ea00beab66df77e25'>
                <Main />
              </ThirdwebProvider>
            </Animator>
          </BleepsProvider>
        </AnimatorGeneralProvider>
      </ThemeProvider>
    </main>
  );
}

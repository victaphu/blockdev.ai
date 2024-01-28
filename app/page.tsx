"use client"
import Image from "next/image";
import { type CSSObject, Global, ThemeProvider as MotionThemeProvider } from '@emotion/react';
import {
  createAppTheme, createAppStylesBaseline,
  type AnimatorGeneralProviderSettings,
  AnimatorGeneralProvider,
  type BleepsProviderSettings,
  BleepsProvider,
  GridLines, Dots, MovingLines, Animator

} from '@arwes/react';
import { ReactElement } from "react";
import Card from "./components/Card";
import { ThemeProvider, createTheme } from "@mui/material";

const theme = createAppTheme();
const stylesBaseline = createAppStylesBaseline(theme);
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
        backgroundColor: theme.colors.primary.bg(1)
      }}
    >
      <GridLines lineColor={theme.colors.primary.deco(0)} />
      <Dots color={theme.colors.primary.deco(1)} />
      <MovingLines lineColor={theme.colors.primary.deco(2)} />
    </div>
  );
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Global styles={stylesBaseline as Record<string, CSSObject>} />
      <ThemeProvider theme={createTheme()}>
        {/* <MotionThemeProvider theme={theme}> */}
          <AnimatorGeneralProvider {...animatorsSettings}>
            <BleepsProvider {...bleepsSettings}>
              <Animator>
                <Background />
              </Animator>
              <Card />
            </BleepsProvider>
          </AnimatorGeneralProvider>
        {/* </MotionThemeProvider> */}
      </ThemeProvider>
    </main>
  );
}

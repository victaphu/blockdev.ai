import {
  useBleeps,
  BleepsOnAnimator,
  Animated,
  FrameSVGCorners,
  Text,
  aa,
  aaVisibility,
  Animator,
  createAppTheme,
  createAppStylesBaseline
} from '@arwes/react';
import { ReactElement, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from './Header';
import Chatbot from '../components/chatbot/Chatbot';
import { AnimatePresence, motion } from 'framer-motion';

const theme = createAppTheme();
const stylesBaseline = createAppStylesBaseline(theme);


const Main = (): ReactElement => {
  const bleeps = useBleeps();
  const router = useRouter();

  const [started, setStarted] = useState(false);

  return (<Animator>
    {/* Play the intro bleep when card appears. */}
    <BleepsOnAnimator
      transitions={{ entering: 'intro' }}
      continuous
    />

    <Animated
      className='card'
      style={{
        position: 'relative',
        display: 'block',
        maxWidth: '1024px',
        margin: theme.space([4, 'auto']),
        padding: theme.space(8),
        textAlign: 'center'
      }}
      // Effects for entering and exiting animation transitions.
      animated={[aaVisibility(), aa('y', '2rem', 0)]}
      // Play bleep when the card is clicked.
      onClick={() => {
        bleeps.click?.play();
        setStarted(true);
      }}
    >
      {/* Frame decoration and shape colors defined by CSS. */}
      <style>{`
          .card .arwes-react-frames-framesvg [data-name=bg] {
            color: ${theme.colors.primary.deco(1)};
          }
          .card .arwes-react-frames-framesvg [data-name=line] {
            color: ${theme.colors.primary.main(4)};
          }
        `}</style>

      <Animator>
        <FrameSVGCorners strokeWidth={2} />
      </Animator>

      <Animator>
        <Text as='h1' className='text-3xl'>
          Konnichiwa, Miyou Desu
        </Text>
      </Animator>

      <AnimatePresence>
        {!started && <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Animator>
            <Header srcImg='/thinking.block.dev.png' paragraphs={["💖 Konnichiwa, everyone! I'm miyou-chan, your super-friendly AI idol at BlockDev.ai! 🌟",
              "My mission? To be your go-to guide in the world of blockchain tokens! Whether it's ERC20, ERC1155, or ERC721, I'm here to make it all a breeze for you! 🪙✨",
              "Just tell me your token dreams, and I'll work my magic, asking for your inputs, and even helping you sign those Metamask transactions for deployment! Let's create tokens and have a blast doing it! 🚀💕",
              "So, are you ready to embark on a token adventure with your friendly AI idol? Let's get started! 😊💫"]} />
          </Animator>
        </motion.div>}
      </AnimatePresence>
      <Chatbot />
    </Animated>
  </Animator>
  );
};

export default Main;
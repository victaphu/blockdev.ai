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
import { ReactElement } from 'react';
import { Button } from './button';
import { Card } from './box';
import { useRouter } from 'next/navigation';

const theme = createAppTheme();
const stylesBaseline = createAppStylesBaseline(theme);

const chat = `💖 Konnichiwa, minna-san (everyone)! I'm Miyou-chan, your AI idol here at BlockDev.ai! 🌟
My mission is simple: I'm here to make deploying smart contracts a breeze for all of you! 🚀✨ Chat with me and I'll guide you through each step!
With my help, you can create tokens, NFTs, and more using audited ThirdWeb smart contracts, ensuring your projects are as secure as can be! 🔐💪
The best part? All contracts are deployed directly from your browser, making it super convenient! No need to go anywhere else! 🌐👩‍💻
So, whether you're new to blockchain or a seasoned pro, I'm your trusty guide to a kawaii and secure blockchain experience! Let's build amazing things together! 😊💫`.split('\n')

const Banner = (): ReactElement => {
  const bleeps = useBleeps();
  const router = useRouter()

  return (
    <Animator manager='stagger'>
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
        onClick={() => bleeps.click?.play()}
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

        <div className="my-2">
          <img src="/banner.block.dev.png" className="rounded max-w-lg mx-auto m-8" />
        </div>

        <Animator active={true} manager="sequence" combine>
          <div className="flex flex-col gap-2">
            {chat.map((c, i)=> <Card src='/avatar/pfp-miyu.png' key={i} srcAlt='avatar' title='Miyou' notice={true}>{c}</Card>)}
          </div>
        </Animator>
        <Button frame='hexagon'
          className='m-4 h-12'
          animated={[aaVisibility(), aa('x', -12, 0)]}
          onHoverAnimateIcons
          tabIndex={-1}
          onClick={() => router.push('/chat')}
          title='Get started'>Lets Begin!</Button>
      </Animated>
    </Animator>
  );
};

export default Banner;
"use client"
import { type ReactElement, type ReactNode } from 'react';
import { type AnimatedProp, Animated, FrameSVGOctagon, cx, Animator, Text } from '@arwes/react';
import * as classes from './Card.css';
import { Avatar } from '@mui/material';
import { InstructionType } from '@/app/lib/model/Instruction';
import Intepreter from '@/app/lib/interpreter';
import { ChatHistoryType } from '../chatbot/ChatHistory';

interface CardProps {
  className?: string
  animated?: AnimatedProp
  src: string
  srcAlt: string
  title: ReactNode
  children: ReactNode
  isUser?: boolean
  notice?: boolean
  instruction?: InstructionType,
  chat?: ChatHistoryType
}

function AvatarView({ title, src }: { title: ReactNode, src: string }) {
  return (<div className="flex flex-col p-2 text-center my-auto">
    <Avatar src={src} />
    <div className={classes.title + " text-xs w-full mx-auto"}>
      {title}
    </div>
  </div>)
}

const Card = (props: CardProps): ReactElement => {
  const { className, animated, src, srcAlt, title, children, isUser, notice, instruction, chat } = props;
  // console.log(src, title, children, isUser);
  return (
    <Animated
      as='article'
      className={cx(isUser === true ? classes.rootUser : classes.root, className) + " " + (isUser === true ? "ml-8" : "mr-8") + " " + (notice ? "" : "bg-yellow-300/[0.4]")}
    // animated={animated}
    >
      <FrameSVGOctagon
        squareSize={16}
        leftBottom={isUser ? true : false}
        leftTop={isUser ? true : false}
        rightTop={isUser ? false : true}
        rightBottom={isUser ? false : true}
      />
      <div className={classes.container + " flex flex-row"}>
        {!isUser && <AvatarView title={title} src={src} />}
        <div className={classes.content + " flex-1"}>
          <div className={classes.children}>
            <Animator>
              <Text>
                {children}
              </Text>
              {Intepreter.getAction(instruction!)?.render(chat!)}
            </Animator>
          </div>
        </div>
        {isUser && <AvatarView title={title} src={src} />}
      </div>
    </Animated>
  );
};

export type { CardProps };
export { Card };
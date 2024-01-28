"use client"
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { Animator, AnimatorDuration, FrameSVGCorners, FrameSVGOctagon, Text, cx, useFrameSVGAssemblingAnimation } from "@arwes/react";
import { ReactElement, useRef } from "react";
import { root } from './Header.css';

type HeaderProps = {
  paragraphs: string[],
  srcImg: string
}

const duration: AnimatorDuration = {
  enter: 0.4,
  exit: 0.4,
  delay: 0,
  offset: 0.1,
  stagger: 0
}

export function Header({ paragraphs, srcImg }: HeaderProps) {
  return (<div className={cx(root)}><Animator>
    <Animator>
      <FrameSVGCorners strokeWidth={2} />
    </Animator>
    <div className="my-2 flex flex-col md:flex-row gap-8 p-8">
      <img src={srcImg} className="rounded md:w-1/3" />

      <div className="md:w-1/2 text-left mx-auto flex-1 my-auto flex flex-col gap-4">
        <Animator manager="sequence" duration={duration}>
          {paragraphs.map((e, i) => <Animator key={i}><Text key={i}>{e}</Text></Animator>)}
        </Animator>
      </div>
    </div>
  </Animator></div>);
}
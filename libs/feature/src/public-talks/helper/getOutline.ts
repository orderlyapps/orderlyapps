import { PUBLIC_TALK_THEMES } from './publicTalkData';

export const getOutline = (outline: string) => {
  return PUBLIC_TALK_THEMES?.find((talk) => talk.number === outline)?.title;
};

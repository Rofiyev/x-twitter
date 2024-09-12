"use client";

import { FC } from "react";
import dynamic from "next/dynamic";
import { Theme as theme } from "emoji-picker-react";
import { EmojiStyle as emojiStyle } from "emoji-picker-react";

const Picker = dynamic(() => import("emoji-picker-react"), { ssr: false });

interface Props {
  setBodyEmoji: (emoji: string) => void;
}

const Emoji: FC<Props> = ({ setBodyEmoji }) => {
  return (
    <Picker
      open
      onEmojiClick={(data) => setBodyEmoji(data.emoji)}
      theme={theme.DARK}
      emojiStyle={emojiStyle.GOOGLE}
      skinTonesDisabled
      style={{
        position: "absolute",
        left: "4rem",
        top: "0px",
        zIndex: "10000000",
      }}
      height={"400px"}
      previewConfig={{ showPreview: false }}
    />
  );
};

export default Emoji;

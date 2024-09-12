"use client";

import { FC } from "react";
import dynamic from "next/dynamic";
const GifsPicker = dynamic(() => import("gif-picker-react"), { ssr: false });
import { Theme as theme } from "gif-picker-react";

interface Props {
  setGif: (value: string) => void;
}

const GifPicker: FC<Props> = ({ setGif }) => {
  return (
    <GifsPicker
      height={"400px"}
      theme={theme.DARK}
      tenorApiKey={process.env.NEXT_PUBLIC_TENOR_API_GIFS!}
      onGifClick={(data) => setGif(data.preview.url)}
    />
  );
};

export default GifPicker;

"use client";

import { ChangeEvent, FC, useEffect, useRef } from "react";

interface Props {
  disabled: boolean;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
}

const TextareaForm: FC<Props> = ({
  disabled,
  onChange,
  placeholder,
  value,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustHeight();
    window.addEventListener("resize", adjustHeight);

    return () => window.removeEventListener("resize", adjustHeight);
  }, []);

  return (
    <textarea
      disabled={disabled}
      ref={textareaRef}
      onInput={adjustHeight}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="disabled:opacity-80 peer min-h-6 resize-none mt-3 w-full bg-black ring-0 outline-none text-[20px] placeholder-neutral-500 text-white"
    />
  );
};

export default TextareaForm;

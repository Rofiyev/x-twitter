import React, {
  forwardRef,
  ForwardRefRenderFunction,
  TextareaHTMLAttributes,
} from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  ref: string;
}

const FormTextarea: ForwardRefRenderFunction<
  HTMLTextAreaElement,
  TextareaProps
> = ({ ...otherProps }, ref) => {
  return (
    <textarea
      className="w-full p-3 text-lg bg-black border-2 border-neutral-800 rounded-md outline-none text-white focus:border-sky-500 transition disabled:bg-neutral-900 disabled:opacity-70 disabled:cursor-not-allowed"
      {...otherProps}
      ref={ref}
    />
  );
};

const Textarea = forwardRef(FormTextarea);

export default Textarea;

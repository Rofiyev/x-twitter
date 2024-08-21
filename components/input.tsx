import React, {
  useState,
  forwardRef,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
} from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"; // Ko'z ikonkalari uchun

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const FormInput: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { type, error, ...otherProps },
  ref
) => {
  const [isShow, setIsShow] = useState<boolean>(false);

  const togglePasswordVisibility = () => setIsShow((prev: boolean) => !prev);

  return (
    <div className="relative w-full">
      <input
        className={`w-full p-3 text-lg bg-black border-2 rounded-md outline-none text-white focus:border-sky-500 transition ${
          error ? "border-red-500" : "border-neutral-800"
        }`}
        type={isShow && type === "password" ? "text" : type}
        autoComplete="off"
        {...otherProps}
        ref={ref}
      />
      {type === "password" && (
        <div
          className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-neutral-300"
          onClick={togglePasswordVisibility}
        >
          {isShow ? <AiFillEyeInvisible size={24} /> : <AiFillEye size={24} />}
        </div>
      )}
      {error && <p className="text-red-500 mt-1 text-sm">{error}</p>}
    </div>
  );
};

const Input = forwardRef(FormInput);
export default Input;

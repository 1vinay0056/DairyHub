import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = ({
  label,
  error,
  className = "",
  ...props
}: InputProps) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block mb-2 font-medium text-black-700">
          {label}
        </label>
      )}

      <input
        className={`
        w-full
        px-4
        py-3
        rounded-lg
        border
        outline-none
        transition
        focus:ring-2
        focus:ring-teal-500
        ${
          error
            ? "border-red-500"
            : "border-gray-300"
        }
        ${className}
        `}
        {...props}
      />

      {error && (
        <p className="text-red-500 text-sm mt-1">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
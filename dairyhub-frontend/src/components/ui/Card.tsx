import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

const Card = ({ children, className = "" }: CardProps) => {
  return (
    <div
      className={`
        bg-white
        rounded-xl
        shadow-md
        hover:shadow-lg
        transition-all
        duration-300
        p-4
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;
import React from "react";

const Button = ({ text, styles, darkBg, darkText, onClick }) => {
  return (
    <div
      className={`bg-black dark:${
        darkBg ? `bg-[${darkBg}]` : "bg-white"
      }  px-4 py-2 flex items-center justify-center shadow-md rounded-lg cursor-pointer ${styles}`}
      onClick={onClick}
    >
      <p
        className={`text-white dark:${
          darkText ? `text-[${darkText}]` : "text-black"
        } font-semibold text-base `}
      >
        {text}
      </p>
    </div>
  );
};

export default Button;

import React from "react";
import Markdown from "markdown-to-jsx";

const Dialog = ({ children, isSender }) => {
  return (
    <div
      className={`p-4   text-sm break-words max-w-full overflow-auto 
        ${isSender ? "text-white" : " text-black"}`}
    >
      <Markdown
        options={{
          overrides: {
            pre: ({ children }) => (
              <pre
                className={`p-3 rounded-lg overflow-x-auto text-xs ${
                  isSender ? "bg-blue-700" : "bg-gray-800"
                } text-white`}
              >
                {children}
              </pre>
            ),
            code: ({ children }) => (
              <code
                className={`p-1 rounded ${
                  isSender ? "bg-blue-600 text-green-200" : "bg-gray-700 text-green-300"
                }`}
              >
                {children}
              </code>
            ),
          },
        }}
      >
        {children}
      </Markdown>
    </div>
  );
};

export default Dialog;

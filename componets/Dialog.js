import React from "react";
import Markdown from "markdown-to-jsx";

const Dialog = ({ children, isSender }) => {
  return (
    <div
      className={`p-4 text-sm break-words max-w-full overflow-auto 
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
            img: ({ src, alt }) => (
              <img
                src={src}
                alt={alt}
                className="max-w-full h-auto my-2 rounded-lg"
              />
            ),
            h1: ({ children }) => (
              <h1 className="text-2xl font-bold text-blue-600">{children}</h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-xl font-semibold text-blue-500">{children}</h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-lg font-medium text-blue-400">{children}</h3>
            ),
            ul: ({ children }) => <ul className="list-disc pl-5">{children}</ul>,
            ol: ({ children }) => <ol className="list-decimal pl-5">{children}</ol>,
            li: ({ children }) => <li className="mb-1">{children}</li>,
            table: ({ children }) => (
              <div className="overflow-x-auto">
                <table className="border-collapse border border-gray-400 w-full min-w-max">
                  {children}
                </table>
              </div>
            ),
            thead: ({ children }) => (
              <thead className="bg-gray-300 font-bold">{children}</thead>
            ),
            tbody: ({ children }) => <tbody>{children}</tbody>,
            tr: ({ children }) => <tr className="border border-gray-400">{children}</tr>,
            th: ({ children }) => (
              <th className="border border-gray-400 px-4 py-2">{children}</th>
            ),
            td: ({ children }) => (
              <td className="border border-gray-400 px-4 py-2">{children}</td>
            ),
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-gray-500 pl-4 italic text-gray-600">
                {children}
              </blockquote>
            ),
            a: ({ children, href }) => (
              <a href={href} className="text-blue-500 underline">
                {children}
              </a>
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

import ReactSyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/cjs/styles/hljs";

const SyntaxHighlighter = ({ language, children }) => {
  return (
    <ReactSyntaxHighlighter language={language} style={atomOneDark} PreTag="div">
      {children}
    </ReactSyntaxHighlighter>
  );
};

export default SyntaxHighlighter;

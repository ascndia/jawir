"use client";

import {
  CodeBlock,
  CodeBlockCode,
} from "@/registry/components/codeblock/codeblock-promp-kit/coedblock";

export function CodeBlockBasic() {
  const code = `function greet(name) {
  return \`Hello, \${name}!\`;
}

// Call the function
greet("World");`;

  return (
    <div className="w-full max-w-3xl">
      <CodeBlock>
        <CodeBlockCode code={code} language="javascript" />
      </CodeBlock>
    </div>
  );
}

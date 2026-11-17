import React from 'react';

export interface RichInlineTextProps {
  text: string;
}

const TOKEN_REGEX =
  /((?:<a\s+href="[^"]+"\s+target="_blank"\s+rel="noopener">[^<]+<\/a>)|(?:<code>[^<]+<\/code>))/g;
const ANCHOR_MATCH =
  /^<a\s+href="([^"]+)"\s+target="_blank"\s+rel="noopener">([^<]+)<\/a>$/;
const CODE_MATCH = /^<code>([^<]+)<\/code>$/;

export const RichInlineText: React.FC<RichInlineTextProps> = ({ text }) => {
  const parts = text.split(TOKEN_REGEX);

  return (
    <>
      {parts.map((part, idx) => {
        if (!part) return null;

        const anchorMatch = part.match(ANCHOR_MATCH);
        if (anchorMatch) {
          const [, href, label] = anchorMatch;
          return (
            <a
              key={idx}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline underline-offset-2 hover:opacity-80 font-medium transition-opacity"
            >
              {label}
            </a>
          );
        }

        const codeMatch = part.match(CODE_MATCH);
        if (codeMatch) {
          const [, codeContent] = codeMatch;
          return (
            <code
              key={idx}
              className="rounded px-1.5 py-0.5 font-mono text-[0.88em] bg-[var(--rg-code,#eceff5)] text-foreground"
            >
              {codeContent}
            </code>
          );
        }

        return <React.Fragment key={idx}>{part}</React.Fragment>;
      })}
    </>
  );
};

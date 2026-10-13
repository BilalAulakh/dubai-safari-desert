import { Fragment } from "react";

// Renders **bold** spans inside a single line of blog content
export default function InlineMarkdown({ text }: { text: string }) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return (
    <>
      {parts.map((part, idx) =>
        idx % 2 === 1 ? (
          <strong key={idx} className="font-bold text-slate-900 dark:text-white">
            {part}
          </strong>
        ) : (
          <Fragment key={idx}>{part}</Fragment>
        )
      )}
    </>
  );
}

import InlineMarkdown from "@/components/blog/InlineMarkdown";

type Block =
  | { type: "h2" | "h3" | "p" | "quote"; text: string }
  | { type: "ul" | "ol"; items: string[] }
  | { type: "hr" };

// Parses the simple markdown used in blog posts line by line, so a heading
// directly followed by text or a list (no blank line) still renders correctly.
function parseBlocks(content: string): Block[] {
  const blocks: Block[] = [];
  let paragraph: string[] = [];
  let quote: string[] = [];
  let list: { type: "ul" | "ol"; items: string[] } | null = null;

  const flush = () => {
    if (paragraph.length) blocks.push({ type: "p", text: paragraph.join(" ") });
    if (quote.length) blocks.push({ type: "quote", text: quote.join(" ") });
    if (list) blocks.push(list);
    paragraph = [];
    quote = [];
    list = null;
  };

  for (const rawLine of content.replace(/\r\n?/g, "\n").split("\n")) {
    const line = rawLine.trim();
    const bullet = line.match(/^[-*]\s+(.*)$/);
    const numbered = line.match(/^\d+\.\s+(.*)$/);

    if (!line) {
      flush();
    } else if (line.startsWith("### ")) {
      flush();
      blocks.push({ type: "h3", text: line.slice(4) });
    } else if (line.startsWith("## ")) {
      flush();
      blocks.push({ type: "h2", text: line.slice(3) });
    } else if (line === "---") {
      flush();
      blocks.push({ type: "hr" });
    } else if (line.startsWith(">")) {
      if (paragraph.length || list) flush();
      quote.push(line.replace(/^>\s*/, ""));
    } else if (bullet || numbered) {
      const type = bullet ? "ul" : "ol";
      const text = (bullet || numbered)![1];
      if (list && list.type === type) {
        list.items.push(text);
      } else {
        flush();
        list = { type, items: [text] };
      }
    } else {
      if (list || quote.length) flush();
      paragraph.push(line);
    }
  }
  flush();
  return blocks;
}

export default function BlogContent({ content }: { content: string }) {
  return (
    <>
      {parseBlocks(content).map((block, idx) => {
        switch (block.type) {
          case "h2":
            return (
              <h2 key={idx} className="text-h2 font-bold text-slate-900 dark:text-white mt-10 mb-4 font-heading">
                <InlineMarkdown text={block.text} />
              </h2>
            );
          case "h3":
            return (
              <h3 key={idx} className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-3 font-heading">
                <InlineMarkdown text={block.text} />
              </h3>
            );
          case "quote":
            return (
              <blockquote
                key={idx}
                className="pl-4 border-l-4 border-amber-500 italic text-slate-600 dark:text-slate-400 my-5"
              >
                <InlineMarkdown text={block.text} />
              </blockquote>
            );
          case "ul":
          case "ol": {
            const ListTag = block.type;
            return (
              <ListTag
                key={idx}
                className={`space-y-2 pl-5 my-4 ${block.type === "ul" ? "list-disc" : "list-decimal"}`}
              >
                {block.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="text-slate-700 dark:text-slate-300">
                    <InlineMarkdown text={item} />
                  </li>
                ))}
              </ListTag>
            );
          }
          case "hr":
            return <hr key={idx} className="my-8 border-slate-200 dark:border-slate-800" />;
          default:
            return (
              <p key={idx} className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                <InlineMarkdown text={block.text} />
              </p>
            );
        }
      })}
    </>
  );
}

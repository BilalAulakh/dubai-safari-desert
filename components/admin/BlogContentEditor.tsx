"use client";

import { useState, useRef } from "react";
import {
  Heading2,
  Heading3,
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  Image as ImageIcon,
  Eye,
  Edit3,
  Minus,
  HelpCircle,
} from "lucide-react";

interface BlogContentEditorProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
}

export default function BlogContentEditor({
  value,
  onChange,
  label = "Article Content",
  placeholder = "Write or paste your article content here in Markdown or plain text...",
}: BlogContentEditorProps) {
  const [activeTab, setActiveTab] = useState<"write" | "preview">("write");
  const [showHelper, setShowHelper] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Calculate metrics
  const wordCount = value.trim() ? value.trim().split(/\s+/).filter(Boolean).length : 0;
  const charCount = value.length;
  const readTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));

  // Insert formatting at cursor position
  const insertFormatting = (prefix: string, suffix = "", defaultText = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end) || defaultText;

    const before = value.substring(0, start);
    const after = value.substring(end);

    const newText = `${before}${prefix}${selectedText}${suffix}${after}`;
    onChange(newText);

    // Reposition cursor
    setTimeout(() => {
      textarea.focus();
      const newCursorPos = start + prefix.length + selectedText.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 10);
  };

  const handleInsertLink = () => {
    const url = prompt("Enter URL:", "https://");
    if (!url) return;
    const labelText = prompt("Enter link text:", "Learn more");
    insertFormatting(`[${labelText || "Link"}](${url})`);
  };

  const handleInsertImage = () => {
    const url = prompt("Enter image URL:", "https://");
    if (!url) return;
    const altText = prompt("Enter image description (alt text):", "Safari photo");
    insertFormatting(`\n![${altText || "Image"}](${url})\n`);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          {label} *
        </label>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowHelper(!showHelper)}
            className="inline-flex items-center gap-1 text-[11px] text-amber-700 dark:text-amber-400 hover:underline font-semibold"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Formatting Guide</span>
          </button>
          <div className="flex rounded-lg bg-slate-200 dark:bg-slate-800 p-0.5 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setActiveTab("write")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-all ${
                activeTab === "write"
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm font-bold"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Write</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("preview")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-all ${
                activeTab === "preview"
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm font-bold"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Live Preview</span>
            </button>
          </div>
        </div>
      </div>

      {showHelper && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-slate-700 dark:text-slate-300 space-y-2">
          <div className="font-bold text-amber-800 dark:text-amber-400 flex items-center justify-between">
            <span>Markdown Quick Reference</span>
            <button
              type="button"
              onClick={() => setShowHelper(false)}
              className="text-xs hover:underline"
            >
              Close
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
            <div>
              <code>## Heading 2</code>
            </div>
            <div>
              <code>### Heading 3</code>
            </div>
            <div>
              <code>**Bold text**</code>
            </div>
            <div>
              <code>*Italic text*</code>
            </div>
            <div>
              <code>- Bullet list item</code>
            </div>
            <div>
              <code>1. Numbered item</code>
            </div>
            <div>
              <code>&gt; Quote block</code>
            </div>
            <div>
              <code>[Link Title](https://...)</code>
            </div>
          </div>
        </div>
      )}

      {/* Editor Box */}
      <div className="border border-slate-300 dark:border-slate-700 rounded-2xl overflow-hidden bg-white dark:bg-[#0B0F17] shadow-sm">
        {/* Toolbar (available when in Write mode) */}
        {activeTab === "write" && (
          <div className="flex flex-wrap items-center gap-1 p-2 bg-slate-50 dark:bg-[#121824] border-b border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={() => insertFormatting("\n## ", "\n", "Heading 2")}
              title="Heading 2"
              className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10 hover:text-amber-600 transition-colors"
            >
              <Heading2 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting("\n### ", "\n", "Heading 3")}
              title="Heading 3"
              className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10 hover:text-amber-600 transition-colors"
            >
              <Heading3 className="w-4 h-4" />
            </button>

            <div className="h-4 w-px bg-slate-300 dark:bg-slate-700 mx-1" />

            <button
              type="button"
              onClick={() => insertFormatting("**", "**", "bold text")}
              title="Bold"
              className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10 hover:text-amber-600 transition-colors"
            >
              <Bold className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting("*", "*", "italic text")}
              title="Italic"
              className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10 hover:text-amber-600 transition-colors"
            >
              <Italic className="w-4 h-4" />
            </button>

            <div className="h-4 w-px bg-slate-300 dark:bg-slate-700 mx-1" />

            <button
              type="button"
              onClick={() => insertFormatting("\n- ", "", "List item")}
              title="Bullet List"
              className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10 hover:text-amber-600 transition-colors"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting("\n1. ", "", "First item")}
              title="Numbered List"
              className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10 hover:text-amber-600 transition-colors"
            >
              <ListOrdered className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting("\n> ", "\n", "Highlight or quote")}
              title="Quote"
              className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10 hover:text-amber-600 transition-colors"
            >
              <Quote className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting("\n\n---\n\n")}
              title="Horizontal Divider"
              className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10 hover:text-amber-600 transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>

            <div className="h-4 w-px bg-slate-300 dark:bg-slate-700 mx-1" />

            <button
              type="button"
              onClick={handleInsertLink}
              title="Insert Link"
              className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10 hover:text-amber-600 transition-colors"
            >
              <LinkIcon className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleInsertImage}
              title="Insert Image"
              className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10 hover:text-amber-600 transition-colors"
            >
              <ImageIcon className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Content Area */}
        {activeTab === "write" ? (
          <textarea
            ref={textareaRef}
            rows={16}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full p-4 bg-transparent text-slate-900 dark:text-white text-sm leading-relaxed font-mono focus:outline-none resize-y min-h-[340px]"
          />
        ) : (
          <div className="p-6 min-h-[340px] bg-slate-50/50 dark:bg-[#070A0F] max-h-[500px] overflow-y-auto">
            {value.trim() ? (
              <div className="prose prose-slate dark:prose-invert max-w-none space-y-4 text-sm leading-relaxed">
                {value.split("\n\n").map((block, i) => {
                  const trimmed = block.trim();
                  if (trimmed.startsWith("## ")) {
                    return (
                      <h2 key={i} className="text-xl font-bold text-slate-900 dark:text-white mt-6 mb-2">
                        {trimmed.replace("## ", "")}
                      </h2>
                    );
                  }
                  if (trimmed.startsWith("### ")) {
                    return (
                      <h3 key={i} className="text-lg font-bold text-slate-900 dark:text-white mt-4 mb-2">
                        {trimmed.replace("### ", "")}
                      </h3>
                    );
                  }
                  if (trimmed.startsWith("> ")) {
                    return (
                      <blockquote
                        key={i}
                        className="pl-4 border-l-4 border-amber-500 italic text-slate-600 dark:text-slate-400 my-3"
                      >
                        {trimmed.replace(/^>\s*/gm, "")}
                      </blockquote>
                    );
                  }
                  if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
                    const items = trimmed.split(/\n[-*]\s+/).map((item) => item.replace(/^[-*]\s+/, ""));
                    return (
                      <ul key={i} className="list-disc pl-5 space-y-1 text-slate-700 dark:text-slate-300">
                        {items.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    );
                  }
                  if (/^\d+\.\s+/.test(trimmed)) {
                    const items = trimmed.split(/\n\d+\.\s+/).map((item) => item.replace(/^\d+\.\s+/, ""));
                    return (
                      <ol key={i} className="list-decimal pl-5 space-y-1 text-slate-700 dark:text-slate-300">
                        {items.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ol>
                    );
                  }
                  if (trimmed === "---") {
                    return <hr key={i} className="my-6 border-slate-200 dark:border-slate-800" />;
                  }
                  return (
                    <p key={i} className="text-slate-700 dark:text-slate-300">
                      {trimmed}
                    </p>
                  );
                })}
              </div>
            ) : (
              <div className="py-12 text-center text-slate-400 text-xs italic">
                No article content written yet. Switch to &ldquo;Write&rdquo; tab to start crafting your article.
              </div>
            )}
          </div>
        )}

        {/* Footer Metrics */}
        <div className="px-4 py-2 bg-slate-50 dark:bg-[#121824] border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-4">
            <span>
              <strong>{wordCount}</strong> words
            </span>
            <span>
              <strong>{charCount}</strong> characters
            </span>
            <span>
              Est. read: <strong>{readTimeMinutes} min</strong>
            </span>
          </div>
          <span className="text-[10px] uppercase font-bold text-amber-600 dark:text-amber-400">
            Markdown Supported
          </span>
        </div>
      </div>
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

const LINK_PATTERN = /\[([^\]]+)\]\(([^)]+)\)/g;
const IMAGE_BLOCK = /^!\[([^\]]*)\]\(([^)]+)\)$/;

function parseInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  const re = new RegExp(LINK_PATTERN.source, "g");

  while ((match = re.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    const href = match[2];
    const label = match[1];
    const external = href.startsWith("http");
    if (external) {
      nodes.push(
        <a
          key={`${match.index}-${href}`}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-bright-gold underline decoration-gold/40 underline-offset-2 hover:text-soft-gold"
        >
          {label}
        </a>
      );
    } else {
      nodes.push(
        <Link
          key={`${match.index}-${href}`}
          href={href}
          className="text-bright-gold underline decoration-gold/40 underline-offset-2 hover:text-soft-gold"
        >
          {label}
        </Link>
      );
    }
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes.length ? nodes : [text];
}

/** Renders blog body: paragraphs, `##` / `###` headings, `![alt](url)` images, `[text](url)` links. */
export function BlogArticleBody({ content }: { content: string }) {
  const blocks = content
    .trim()
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);

  if (blocks.length === 0) {
    return null;
  }

  return (
    <div className="max-w-3xl space-y-5 text-base leading-relaxed text-off-white/85">
      {blocks.map((block, i) => {
        const imageMatch = block.match(IMAGE_BLOCK);
        if (imageMatch) {
          const alt = imageMatch[1] || "Detailing result";
          const src = imageMatch[2];
          return (
            <figure
              key={i}
              className="overflow-hidden rounded-2xl border border-gold/20"
            >
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src={src}
                  alt={alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 48rem"
                />
              </div>
              {alt ? (
                <figcaption className="px-4 py-3 text-center text-xs text-off-white/55">
                  {alt}
                </figcaption>
              ) : null}
            </figure>
          );
        }

        if (block.startsWith("## ")) {
          return (
            <h2
              key={i}
              className="pt-2 font-display text-2xl text-off-white"
            >
              {block.slice(3).trim()}
            </h2>
          );
        }
        if (block.startsWith("### ")) {
          return (
            <h3 key={i} className="pt-1 text-lg font-semibold text-bright-gold">
              {block.slice(4).trim()}
            </h3>
          );
        }
        return (
          <p key={i} className="whitespace-pre-wrap">
            {parseInline(block)}
          </p>
        );
      })}
    </div>
  );
}

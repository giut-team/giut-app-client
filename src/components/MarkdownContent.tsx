import { Fragment, type ReactNode } from "react";

type MarkdownContentProps = {
  content: string;
};

const renderInline = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);

  return parts.map((part, index) =>
    part.startsWith("**") && part.endsWith("**")
      ? <strong key={index}>{part.slice(2, -2)}</strong>
      : <Fragment key={index}>{part}</Fragment>,
  );
};

export function MarkdownContent({ content }: MarkdownContentProps) {
  const lines = content.split("\n");
  const nodes: ReactNode[] = [];
  let listItems: string[] = [];

  const flushList = () => {
    if (listItems.length === 0) return;
    nodes.push(<ul key={`list-${nodes.length}`}>{listItems.map((item, index) => <li key={index}>{renderInline(item)}</li>)}</ul>);
    listItems = [];
  };

  lines.forEach((line) => {
    if (line.startsWith("## ")) {
      flushList();
      nodes.push(<h2 key={`heading-${nodes.length}`}>{line.slice(3)}</h2>);
      return;
    }

    if (line.startsWith("- ")) {
      listItems.push(line.slice(2));
      return;
    }

    if (line.trim()) {
      flushList();
      nodes.push(<p key={`paragraph-${nodes.length}`}>{renderInline(line)}</p>);
    }
  });
  flushList();

  return <>{nodes}</>;
}

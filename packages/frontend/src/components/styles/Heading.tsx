import type React from "react";

type HeadingProps = {
    tag: "h1" | "h2" | "h3" | "h4";
    children: React.ReactNode;
    className?: string;
};

const headingStyles: Record<HeadingProps["tag"], string> = {
    h1: "text-4xl font-bold text-primary mb-4",
    h2: "text-3xl font-semibold text-secondary mb-3",
    h3: "text-2xl font-medium text-base-content mb-2",
    h4: "text-xl text-base-content mb-1",
};

export default function Heading({ tag, children, className = "" }: HeadingProps) {
    // Dynamic tag (h1, h2, etc.)
    const Tag = tag;
    const style = headingStyles[tag];

    return <Tag className={`${style} ${className}`}>{children}</Tag>;
}

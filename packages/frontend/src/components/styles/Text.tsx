import type React from "react";

type TextVariant = "bold" | "semibold" | "italic" | "link";

type TextProps = {
    variant: TextVariant;
    children: React.ReactNode;
    className?: string;
    href?: string;
};

const textStyles: Record<TextVariant, string> = {
    bold: "font-bold text-base text-base-content",
    semibold: "font-semibold",
    italic: "italic text-base text-base-content",
    link: "text-sm text-accent underline hover:text-secondary transition-colors",
};

export default function Text({ variant, children, className = "", href }: TextProps) {
    const style = textStyles[variant];

    // Si le texte est un lien, utiliser <a>, sinon <span>
    const Tag = variant === "link" ? "a" : "span";

    return (
        <Tag className={`${style} ${className}`} href={variant === "link" ? href : undefined}>
            {children}
        </Tag>
    );
}

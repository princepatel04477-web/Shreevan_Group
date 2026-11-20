import React from "react";
import Link from "next/link";
import { clsx } from "clsx";

export interface LinkUnderlineProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  textClassName?: string;
  underlineClassName?: string;
}

export function LinkUnderline({
  href,
  children,
  className,
  textClassName = "text-accent-700 group-hover:text-accent-500",
  underlineClassName = "bg-accent-700/60",
  ...props
}: LinkUnderlineProps) {
  const isExternal = href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");

  const content = (
    <span className="relative inline-block group cursor-pointer">
      <span className={clsx("font-body font-medium transition-colors", textClassName)}>
        {children}
      </span>
      {/* Editorial animated hairline underline */}
      <span
        className={clsx(
          "absolute bottom-0 left-0 w-full h-[1px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out",
          underlineClassName
        )}
        aria-hidden="true"
      />
    </span>
  );

  if (isExternal) {
    return (
      <a
        href={href}
        className={clsx("inline-block", className)}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={clsx("inline-block", className)} {...props}>
      {content}
    </Link>
  );
}

import React from "react";

export interface JsonLdProps {
  data: Record<string, unknown> | Array<Record<string, unknown>>;
}

/**
 * Escapes characters such as '<' to prevent XSS / script breakout in JSON-LD.
 */
function safeJsonLdStringify(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: safeJsonLdStringify(data),
      }}
    />
  );
}

import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface Column<T> {
  key: string;
  header: string;
  align?: "left" | "center" | "right";
  render?: (item: T) => React.ReactNode;
}

export interface RuledTableProps<T> extends React.TableHTMLAttributes<HTMLTableElement> {
  caption?: string;
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T) => string;
}

export function RuledTable<T>({
  caption,
  columns,
  data,
  keyExtractor,
  className,
  ...props
}: RuledTableProps<T>) {
  return (
    <div className="w-full overflow-x-auto border-t border-b border-rule">
      <table
        className={twMerge(clsx("w-full border-collapse text-left text-sm", className))}
        {...props}
      >
        {caption && (
          <caption className="sr-only">
            {caption}
          </caption>
        )}
        <thead>
          <tr className="border-b border-rule bg-paper">
            {columns.map((col) => (
              <th
                key={col.key}
                scope="col"
                className={clsx(
                  "py-3 px-4 font-mono text-xs uppercase tracking-[0.14em] text-ink-3 font-medium",
                  col.align === "right"
                    ? "text-right"
                    : col.align === "center"
                    ? "text-center"
                    : "text-left"
                )}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-rule/60 bg-porcelain">
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="py-8 px-4 text-center font-mono text-xs text-ink-3 tracking-wider"
              >
                No verified records available.
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <tr
                key={keyExtractor(item)}
                className="group relative transition-colors duration-150 hover:bg-mist/70"
              >
                {columns.map((col, idx) => (
                  <td
                    key={col.key}
                    className={clsx(
                      "py-3.5 px-4 font-body text-sm text-ink",
                      idx === 0 &&
                        "relative before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[2px] before:bg-accent-700 before:opacity-0 group-hover:before:opacity-100 before:transition-opacity",
                      col.align === "right"
                        ? "text-right font-mono"
                        : col.align === "center"
                        ? "text-center"
                        : "text-left"
                    )}
                  >
                    {col.render
                      ? col.render(item)
                      : String((item as Record<string, unknown>)[col.key] ?? "")}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

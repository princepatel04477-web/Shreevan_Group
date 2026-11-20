"use client";

import React, { createContext, useContext, useEffect, useRef, useSyncExternalStore } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useJourney, DocId } from "@/lib/journey";
import { clsx } from "clsx";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface ChapterContextValue {
  index: number;
  id: string;
  title: string;
  docId: DocId;
  isPinned: boolean;
  isDesktop: boolean;
  progress: number;
}

const ChapterContext = createContext<ChapterContextValue | null>(null);

export function useChapter(): ChapterContextValue {
  const ctx = useContext(ChapterContext);
  if (!ctx) {
    throw new Error("useChapter must be used within a Chapter component");
  }
  return ctx;
}

function emptySubscribe() {
  return () => {};
}

export interface ChapterProps {
  index: number;
  id: string;
  title: string;
  docId: DocId;
  length?: string;
  className?: string;
  children:
    | React.ReactNode
    | ((context: ChapterContextValue) => React.ReactNode);
  setupTimeline?: (tl: gsap.core.Timeline) => void;
}

export function Chapter({
  index,
  id,
  title,
  docId,
  className,
  children,
}: ChapterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isClient = useSyncExternalStore(emptySubscribe, () => true, () => false);

  const collect = useJourney((s) => s.collect);
  const setChapter = useJourney((s) => s.setChapter);

  useEffect(() => {
    if (!isClient) return;

    const el = containerRef.current;
    if (!el) return;

    // Natural, unpinned scroll trigger that tracks chapter progress without scroll-jacking
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 45%",
      end: "bottom 45%",
      onEnter: () => {
        setChapter(index);
        collect(docId);
      },
      onEnterBack: () => {
        setChapter(index);
      },
    });

    return () => {
      st.kill();
    };
  }, [isClient, index, docId, collect, setChapter]);

  const contextValue: ChapterContextValue = {
    index,
    id,
    title,
    docId,
    isPinned: false,
    isDesktop: true,
    progress: 0,
  };

  return (
    <ChapterContext.Provider value={contextValue}>
      <section
        ref={containerRef}
        id={id}
        tabIndex={-1}
        aria-label={`Chapter ${index}: ${title}`}
        className={clsx(
          "relative w-full outline-none py-16 md:py-24 border-b border-rule bg-paper",
          className
        )}
      >
        <div className="max-w-[1320px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="w-full bg-porcelain border border-rule p-6 sm:p-10 lg:p-14 shadow-[0_2px_12px_rgba(15,27,36,0.03)] rounded-[2px]">
            {typeof children === "function" ? children(contextValue) : children}
          </div>
        </div>
      </section>
    </ChapterContext.Provider>
  );
}

"use client";

import React, { createContext, useContext, useEffect, useRef, useState, useSyncExternalStore } from "react";
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
  length = "+=120%",
  className,
  children,
  setupTimeline,
}: ChapterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const setupTimelineRef = useRef(setupTimeline);

  useEffect(() => {
    setupTimelineRef.current = setupTimeline;
  }, [setupTimeline]);

  const isClient = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const [isDesktop, setIsDesktop] = useState(true);

  const collect = useJourney((s) => s.collect);
  const setChapter = useJourney((s) => s.setChapter);

  useEffect(() => {
    if (!isClient) return;

    const el = containerRef.current;
    const sheet = sheetRef.current;
    if (!el || !sheet) return;

    const mm = gsap.matchMedia();

    // 1. Desktop without reduced-motion: Full pinned scrubbed timeline with paper sheet stacking
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      setIsDesktop(true);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: length,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          onEnter: () => {
            setChapter(index);
          },
          onEnterBack: () => {
            setChapter(index);
          },
          onLeave: () => {
            collect(docId);
          },
        },
      });

      // Hook child-registered animations into scrubbed chapter timeline
      if (setupTimelineRef.current) {
        setupTimelineRef.current(tl);
      }

      // Desk-sheet stacking: outgoing chapter rotates slightly, scales down, and darkens shadow
      if (index < 6) {
        tl.to(
          sheet,
          {
            rotateX: 4,
            scale: 0.94,
            y: -24,
            boxShadow: "0 28px 56px rgba(15,27,36,0.18)",
            ease: "power1.inOut",
          },
          0.72
        );
      }

      return () => {
        tl.kill();
      };
    });

    // 2. Mobile or Tablet (<1024px): Natural unpinned flow with clean scroll observer
    mm.add("(max-width: 1023px)", () => {
      setIsDesktop(false);

      const st = ScrollTrigger.create({
        trigger: el,
        start: "top 60%",
        end: "bottom 40%",
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
    });

    // 3. Desktop with prefers-reduced-motion: Unpinned or gentle flow without 3D rotations
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: reduce)", () => {
      setIsDesktop(true);

      const st = ScrollTrigger.create({
        trigger: el,
        start: "top 40%",
        end: "bottom 40%",
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
    });

    return () => {
      mm.revert();
    };
  }, [isClient, index, docId, length, collect, setChapter]);

  const contextValue: ChapterContextValue = {
    index,
    id,
    title,
    docId,
    isPinned: isDesktop,
    isDesktop,
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
          "relative w-full outline-none",
          isDesktop ? "min-h-screen" : "py-10 border-b border-rule",
          className
        )}
        style={{
          zIndex: 10 + index,
        }}
      >
        {/* Mobile Sticky Chapter Indicator */}
        {!isDesktop && (
          <div className="sticky top-16 z-20 bg-paper/95 backdrop-blur-sm border-b border-rule py-3 px-6 mb-6">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-[0.14em] text-accent-700 font-semibold">
                CH-0{index} / {title}
              </span>
              <span className="font-mono text-[10px] text-ink-3 uppercase tracking-wider">
                DOSSIER REF: {docId}
              </span>
            </div>
          </div>
        )}

        {/* Paper Sheet Container with 3D Desk-Sheet Stacking Perspective */}
        <div
          ref={sheetRef}
          className={clsx(
            "w-full h-full bg-porcelain border border-rule transition-shadow will-change-transform",
            isDesktop
              ? "min-h-screen p-8 md:p-12 lg:p-16 flex flex-col justify-between shadow-[0_4px_24px_rgba(15,27,36,0.06)]"
              : "p-6"
          )}
          style={{ perspective: 1200, transformOrigin: "top center" }}
        >
          {typeof children === "function" ? children(contextValue) : children}
        </div>
      </section>
    </ChapterContext.Provider>
  );
}

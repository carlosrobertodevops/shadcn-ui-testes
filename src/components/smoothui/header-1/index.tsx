"use client";

import { ExternalLink } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { AnimatedGroup } from "@/components/smoothui/shared/animated-group";
import { AnimatedText } from "@/components/smoothui/shared/animated-text";
import { Button } from "@/components/ui/button";
import { HeroHeader } from "@/components/smoothui/shared/hero-header";
import styles from "./hero-grid-01.module.css";

const CELL_SIZE = 128; // px
const COLORS = [
  "oklch(0.72 0.2 352.53)", // blue-ish
  "#A764FF",
  "#4B94FD",
  "#FD4B4E",
  "#FF8743",
];

function getRandomColor() {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
}

function SubGrid() {
  const [cellColors, setCellColors] = useState<(string | null)[]>([
    null,
    null,
    null,
    null,
  ]);

  const leaveTimeouts = useRef<(NodeJS.Timeout | null)[]>([
    null,
    null,
    null,
    null,
  ]);

  function handleHover(cellIdx: number) {
    const timeout = leaveTimeouts.current[cellIdx];
    if (timeout) {
      clearTimeout(timeout);
      leaveTimeouts.current[cellIdx] = null;
    }
    setCellColors((prev) =>
      prev.map((c, i) => (i === cellIdx ? getRandomColor() : c)),
    );
  }

  function handleLeave(cellIdx: number) {
    leaveTimeouts.current[cellIdx] = setTimeout(() => {
      setCellColors((prev) => prev.map((c, i) => (i === cellIdx ? null : c)));
      leaveTimeouts.current[cellIdx] = null;
    }, 128);
  }

  useEffect(() => {
    return () => {
      leaveTimeouts.current.forEach((t) => t && clearTimeout(t));
    };
  }, []);

  return (
    <div className={styles.subgrid} style={{ pointerEvents: "none" }}>
      {[0, 1, 2, 3].map((cellIdx) => (
        <button
          className={styles.cell}
          key={cellIdx}
          onMouseEnter={() => handleHover(cellIdx)}
          onMouseLeave={() => handleLeave(cellIdx)}
          style={{
            background: cellColors[cellIdx] || "transparent",
            pointerEvents: "auto",
          }}
          type="button"
        />
      ))}
    </div>
  );
}

function InteractiveGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [grid, setGrid] = useState({ columns: 0, rows: 0 });
  const [isDark, setIsDark] = useState<boolean>(true);

  // Detect theme: checks both the html.dark class (used by ModeToggle) and prefers-color-scheme
  useEffect(() => {
    function detectDark() {
      try {
        const htmlHasDark =
          document?.documentElement?.classList?.contains("dark");
        const prefersDark =
          window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches;
        setIsDark(Boolean(htmlHasDark ?? prefersDark));
      } catch {
        setIsDark(true);
      }
    }

    detectDark();

    // Listen to system preference changes
    let mm: MediaQueryList | null = null;
    try {
      if (window.matchMedia) {
        mm = window.matchMedia("(prefers-color-scheme: dark)");
        const mmHandler = (e: MediaQueryListEvent) => setIsDark(e.matches);
        if ("addEventListener" in mm) {
          mm.addEventListener("change", mmHandler);
        } else {
          // old browsers
          // @ts-ignore
          mm.addListener(mmHandler);
        }
      }

      // Also observe html class changes so ModeToggle (that toggles 'dark' on html) is reflected
      const observer = new MutationObserver(() => {
        const htmlHasDark =
          document?.documentElement?.classList?.contains("dark");
        setIsDark(Boolean(htmlHasDark));
      });
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
      });

      return () => {
        if (mm) {
          if ("removeEventListener" in mm) {
            mm.removeEventListener("change", (evt: MediaQueryListEvent) =>
              setIsDark(evt.matches),
            );
          } else {
            // @ts-ignore
            mm.removeListener(() => {});
          }
        }
        observer.disconnect();
      };
    } catch {
      // noop
    }
  }, []);

  useEffect(() => {
    function updateGrid() {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setGrid({
          columns: Math.ceil(width / CELL_SIZE),
          rows: Math.ceil(height / CELL_SIZE),
        });
      }
    }

    updateGrid();
    window.addEventListener("resize", updateGrid);
    return () => window.removeEventListener("resize", updateGrid);
  }, []);

  const total = grid.columns * grid.rows;

  // Theme-aware background values
  const darkBackground = {
    backgroundColor: "#0b0b0c",
    backgroundImage: `
      radial-gradient(circle at 50% 50%,
        rgba(255,255,255,0.02) 0%,
        rgba(255,255,255,0.02) 2%,
        transparent 3%
      ),
      linear-gradient(to right,
        rgba(255,255,255,0.05) 1px,
        transparent 1px
      ),
      linear-gradient(to bottom,
        rgba(255,255,255,0.05) 1px,
        transparent 1px
      )
    `,
    backgroundSize: `64px 64px, 64px 64px, 64px 64px`,
    backgroundRepeat: "repeat, repeat, repeat",
    backgroundPosition: "0 0, 0 0, 0 0",
  } as React.CSSProperties;

  const lightBackground = {
    // single-color light canvas + subtle dark grid lines
    backgroundColor: "#f7f7f8",
    backgroundImage: `
      radial-gradient(circle at 50% 50%,
        rgba(0,0,0,0.02) 0%,
        rgba(0,0,0,0.02) 2%,
        transparent 3%
      ),
      linear-gradient(to right,
        rgba(0,0,0,0.06) 1px,
        transparent 1px
      ),
      linear-gradient(to bottom,
        rgba(0,0,0,0.06) 1px,
        transparent 1px
      )
    `,
    backgroundSize: `64px 64px, 64px 64px, 64px 64px`,
    backgroundRepeat: "repeat, repeat, repeat",
    backgroundPosition: "0 0, 0 0, 0 0",
  } as React.CSSProperties;

  const backgroundStyle = isDark ? darkBackground : lightBackground;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0"
      ref={containerRef}
      style={{ width: "100%", height: "100%" }}
    >
      <div
        className={styles.mainGrid}
        style={
          {
            gridTemplateColumns: `repeat(${grid.columns}, ${CELL_SIZE}px)`,
            gridTemplateRows: `repeat(${grid.rows}, ${CELL_SIZE}px)`,
            ["--grid-cell-size" as any]: `${CELL_SIZE}px`,

            width: "100%",
            height: "100%",

            // apply the theme-aware background
            ...backgroundStyle,
          } as React.CSSProperties
        }
      >
        {Array.from({ length: total }, (_, idx) => (
          <SubGrid key={`subgrid-${grid.columns}-${grid.rows}-${idx}`} />
        ))}
      </div>
    </div>
  );
}

export function HeroGrid() {
  return (
    <div className="relative">
      <HeroHeader />
      <main>
        <section className="relative overflow-hidden py-36">
          <InteractiveGrid />
          <AnimatedGroup
            className="pointer-events-none flex flex-col items-center gap-6 text-center"
            preset="blur-slide"
          >
            <div>
              <AnimatedText
                as="h1"
                className="mb-6 text-pretty font-bold text-2xl tracking-tight lg:text-5xl"
              >
                Build your next project with{" "}
                <span className="text-brand">Smoothui</span>
              </AnimatedText>

              <AnimatedText
                as="p"
                className="mx-auto max-w-3xl text-muted-foreground lg:text-xl"
                delay={0.15}
              >
                Smoothui gives you the building blocks to create stunning,
                animated interfaces in minutes.
              </AnimatedText>
            </div>

            <AnimatedGroup
              className="pointer-events-auto mt-6 flex justify-center gap-3"
              preset="slide"
            >
              <Button
                className="shadow-sm transition-shadow hover:shadow"
                variant="outline"
              >
                Get Started
              </Button>

              <Button className="group" variant="candy">
                Learn more{" "}
                <ExternalLink className="ml-2 h-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </AnimatedGroup>
          </AnimatedGroup>
        </section>
      </main>
    </div>
  );
}

export default HeroGrid;

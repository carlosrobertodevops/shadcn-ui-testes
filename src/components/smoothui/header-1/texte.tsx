function InteractiveGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [grid, setGrid] = useState({ columns: 0, rows: 0 });
  const [isDark, setIsDark] = useState<boolean>(true);

  useEffect(() => {
    function detectDark() {
      try {
        const htmlHasDark = document?.documentElement?.classList?.contains("dark");
        const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
        setIsDark(Boolean(htmlHasDark ?? prefersDark));
      } catch {
        setIsDark(true);
      }
    }

    detectDark();

    // listen for system changes
    let mm: MediaQueryList | null = null;
    try {
      if (window.matchMedia) {
        mm = window.matchMedia("(prefers-color-scheme: dark)");
        const mmHandler = (e: MediaQueryListEvent) => setIsDark(e.matches);
        if ("addEventListener" in mm) {
          mm.addEventListener("change", mmHandler);
        } else {
          // older browsers
          // @ts-ignore
          mm.addListener(mmHandler);
        }
      }

      // observe html class changes (ModeToggle toggles 'dark' on html)
      const observer = new MutationObserver(() => {
        const htmlHasDark = document?.documentElement?.classList?.contains("dark");
        setIsDark(Boolean(htmlHasDark));
      });
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

      return () => {
        if (mm) {
          if ("removeEventListener" in mm) {
            mm.removeEventListener("change", (evt: MediaQueryListEvent) => setIsDark(evt.matches));
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

  const darkBackground: React.CSSProperties = {
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
  };

  const lightBackground: React.CSSProperties = {
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
  };

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

            /* apply theme-aware background */
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

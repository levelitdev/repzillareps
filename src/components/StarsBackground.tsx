import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  r: number;
  duration: number;
  start: number;
  color: string;
};

function randomStar(w: number, h: number, now: number): Star {
  const sizeRoll = Math.random();
  const r = sizeRoll < 0.7 ? 1 : sizeRoll < 0.95 ? 1.5 : 2;
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    r,
    duration: 1200 + Math.random() * 3000,
    start: now + Math.random() * 2000,
    color: Math.random() < 0.6 ? "#ffffff" : "#aac4ff",
  };
}

export default function StarsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = window.devicePixelRatio || 1;
    let stars: Star[] = [];
    let raf = 0;

    const resize = () => {
      width = window.innerWidth;
      height = Math.max(
        document.documentElement.scrollHeight,
        window.innerHeight,
      );
      dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(
        450,
        Math.floor((width * height) / 4500),
      );
      const now = performance.now();
      stars = Array.from({ length: count }, () => randomStar(width, height, now));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const now = performance.now();
      for (const s of stars) {
        const t = (now - s.start) / s.duration;
        if (t < 0) continue;
        if (t >= 1) {
          // respawn elsewhere
          const ns = randomStar(width, height, now);
          s.x = ns.x;
          s.y = ns.y;
          s.r = ns.r;
          s.duration = ns.duration;
          s.start = now + Math.random() * 1500;
          s.color = ns.color;
          continue;
        }
        // pulse: ease in then ease out
        const alpha = Math.sin(t * Math.PI);
        ctx.globalAlpha = alpha;
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
        if (s.r >= 1.5) {
          ctx.globalAlpha = alpha * 0.25;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r * 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 150);
    };
    window.addEventListener("resize", onResize);

    // Re-measure height after content settles
    const obs = new ResizeObserver(() => onResize());
    obs.observe(document.body);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      obs.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}

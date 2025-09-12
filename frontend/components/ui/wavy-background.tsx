"use client";
import React, { useEffect, useRef, useState } from "react";
import { createNoise3D } from "simplex-noise";

interface WavyBackgroundProps {
  colors?: string[];
  waveWidth?: number;
  blur?: number;
  speed?: "slow" | "fast";
}

export const WavyBackground: React.FC<WavyBackgroundProps> = ({
  colors,
  waveWidth,
  blur = 10,
  speed = "fast",
}) => {
  const noise = createNoise3D();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isSafari, setIsSafari] = useState(false);

  let w = 0;
  let h = 0;
  let nt = 0;

  const getSpeed = () => {
    switch (speed) {
      case "slow":
        return 0.001;
      case "fast":
        return 0.002;
      default:
        return 0.001;
    }
  };

  const waveColors = colors ?? ["#fba7ae", "#d69494", "#949090"];

  const drawWave = (ctx: CanvasRenderingContext2D, n: number) => {
    nt += getSpeed();
    for (let i = 0; i < n; i++) {
      ctx.beginPath();
      ctx.lineWidth = waveWidth || 50;
      ctx.strokeStyle = waveColors[i % waveColors.length];
      for (let x = 0; x < w; x += 5) {
        const y = noise(x / 800, 0.3 * i, nt) * 100;
        ctx.lineTo(x, y + h * 0.5);
      }
      ctx.stroke();
      ctx.closePath();
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!canvas || !ctx) return;

    const resizeCanvas = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      ctx.filter = `blur(${blur}px)`;
    };

    let animationId: number;

    const render = () => {
      ctx.clearRect(0, 0, w, h);
      drawWave(ctx, 5);
      drawWave(ctx, 5);
      animationId = requestAnimationFrame(render);
    };

    resizeCanvas();
    render();
    window.addEventListener("resize", resizeCanvas);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [blur, speed, colors, waveWidth]);

  useEffect(() => {
    setIsSafari(
      typeof window !== "undefined" &&
        navigator.userAgent.includes("Safari") &&
        !navigator.userAgent.includes("Chrome")
    );
  }, []);

  return (
    <canvas
      className="w-full h-full"
      ref={canvasRef}
      id="canvas"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 0,
        ...(isSafari ? { filter: `blur(${blur}px)` } : {}),
      }}
    />
  );
};

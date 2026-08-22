import { type CSSProperties, type HTMLAttributes, type PointerEvent, useRef } from "react";

type ImageGlowFrameProps = HTMLAttributes<HTMLDivElement>;

export function ImageGlowFrame({ children, className = "", onPointerLeave, onPointerMove, style, ...props }: ImageGlowFrameProps) {
  const frameRef = useRef<HTMLDivElement>(null);

  const updateGlow = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") return;

    const frame = frameRef.current;
    if (!frame) return;

    const rect = frame.getBoundingClientRect();
    const x = Math.min(Math.max(event.clientX - rect.left, 0), rect.width);
    const y = Math.min(Math.max(event.clientY - rect.top, 0), rect.height);
    const normalizedX = rect.width ? x / rect.width : 0.5;
    const normalizedY = rect.height ? y / rect.height : 0.5;
    const nearestEdge = Math.min(normalizedX, 1 - normalizedX, normalizedY, 1 - normalizedY) * 2;
    const strength = Math.max(0.3, 1 - nearestEdge);
    const angle = Math.atan2(normalizedY - 0.5, normalizedX - 0.5) * (180 / Math.PI) + 90;

    frame.style.setProperty("--image-glow-x", `${(normalizedX * 100).toFixed(1)}%`);
    frame.style.setProperty("--image-glow-y", `${(normalizedY * 100).toFixed(1)}%`);
    frame.style.setProperty("--image-glow-angle", `${angle.toFixed(1)}deg`);
    frame.style.setProperty("--image-glow-strength", strength.toFixed(2));
  };

  return (
    <div
      {...props}
      ref={frameRef}
      className={`image-glow-frame ${className}`.trim()}
      style={style as CSSProperties}
      onPointerMove={(event) => {
        updateGlow(event);
        onPointerMove?.(event);
      }}
      onPointerLeave={(event) => {
        event.currentTarget.style.removeProperty("--image-glow-strength");
        onPointerLeave?.(event);
      }}
    >
      {children}
    </div>
  );
}

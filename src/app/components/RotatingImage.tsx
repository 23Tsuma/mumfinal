import { useEffect, useMemo, useState } from "react";

const DEFAULT_FALLBACK_GIF =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";

type Props = {
  images: string[];
  intervalMs?: number; // default 7000ms
  alt: string;
  className?: string;
};

export function RotatingImage({ images, intervalMs = 7000, alt, className }: Props) {
  const safeImages = useMemo(() => images.filter(Boolean), [images]);

  const [index, setIndex] = useState(0);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!safeImages.length) return;

    setIndex((i) => Math.min(i, safeImages.length - 1));

    const id = window.setInterval(() => {
      setIndex((prev) => (safeImages.length ? (prev + 1) % safeImages.length : 0));
    }, intervalMs);

    return () => window.clearInterval(id);
  }, [safeImages.length, intervalMs]);

  if (!safeImages.length || hasError) {
    return (
      <img
        src={DEFAULT_FALLBACK_GIF}
        alt={alt}
        className={className}
        loading="lazy"
        draggable={false}
      />
    );
  }

  return (
    <div className={className}>
      <img
        key={index}
        src={safeImages[index]}
        alt={alt}
        loading="lazy"
        draggable={false}
        onError={() => setHasError(true)}
        className="w-full h-full object-cover transition-opacity duration-700"
        style={{ animation: "bb-fade-zoom 7s ease-in-out infinite" }}
      />

      <style>{`
        @keyframes bb-fade-zoom {
          0% { opacity: 0; transform: scale(1.06); }
          10% { opacity: 1; transform: scale(1.03); }
          55% { opacity: 1; transform: scale(1.01); }
          100% { opacity: 0; transform: scale(1.06); }
        }
      `}</style>
    </div>
  );
}


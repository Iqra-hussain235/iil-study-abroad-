"use client";

export default function FlagVideoBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <iframe
          src="https://www.youtube.com/embed/31s-kuyS5eM?start=16&autoplay=1&mute=1&loop=1&playlist=31s-kuyS5eM&controls=0&showinfo=0&modestbranding=1&rel=0&iv_load_policy=3"
          title="Flag background video"
          allow="autoplay; encrypted-media"
          className="absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2 scale-[1.8]"
          style={{ border: "none" }}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/85 to-white" />
    </div>
  );
}

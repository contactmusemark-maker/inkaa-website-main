const tags = [
  "UI Design", "Branding", "Motion", "Web Design",
  "Creative Direction", "Logo Design", "Visual Identity",
  "Digital Strategy", "Art Direction", "Typography",
];

const separator = <span className="mx-6 text-primary font-bold text-lg select-none">·</span>;

export default function MarqueeStrip({ dark = false }: { dark?: boolean }) {
  const items = [...tags, ...tags, ...tags];

  return (
    <div
      className={`w-full overflow-hidden py-5 border-y ${
        dark
          ? "bg-[#0d0d0d] border-white/5"
          : "bg-foreground border-white/5"
      }`}
    >
      <div className="flex whitespace-nowrap animate-marquee">
        {items.map((tag, i) => (
          <span key={i} className="inline-flex items-center">
            <span
              className={`text-sm font-semibold uppercase tracking-[0.2em] ${
                dark ? "text-white/50 hover:text-white" : "text-background/50 hover:text-background"
              } transition-colors duration-200 cursor-default`}
            >
              {tag}
            </span>
            {separator}
          </span>
        ))}
      </div>
    </div>
  );
}

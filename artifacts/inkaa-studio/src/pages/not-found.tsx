import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-[#050505] px-6 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(214,66,56,0.14),transparent_30%),radial-gradient(circle_at_80%_78%,rgba(255,255,255,0.07),transparent_28%)]" />
      <div className="relative z-10 max-w-xl text-center">
        <p className="mb-5 font-mono text-[11px] font-semibold uppercase tracking-[0.34em] text-primary">
          404 / Lost Frame
        </p>
        <h1 className="text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
          This scene does not exist.
        </h1>
        <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-white/52 md:text-base">
          The page you are looking for may have moved, but the main experience is still ready.
        </p>
        <a
          href="/"
          className="mt-9 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </a>
      </div>
    </main>
  );
}

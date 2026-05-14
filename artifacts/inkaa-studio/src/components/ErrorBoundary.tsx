import React from "react";

type ErrorBoundaryState = {
  hasError: boolean;
};

export default class ErrorBoundary extends React.Component<React.PropsWithChildren, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    if (import.meta.env.DEV && "reportError" in window) {
      window.reportError(error);
    }
  }

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <main className="flex min-h-[100dvh] items-center justify-center bg-[#050505] px-6 text-white">
        <div className="max-w-lg text-center">
          <p className="mb-4 font-mono text-[11px] font-semibold uppercase tracking-[0.34em] text-primary">
            Inkaa Studio
          </p>
          <h1 className="text-4xl font-black tracking-tight md:text-5xl">Something slipped out of frame.</h1>
          <p className="mx-auto mt-5 max-w-sm text-sm leading-relaxed text-white/52">
            Refresh the page to restart the cinematic experience.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-8 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
          >
            Reload Experience
          </button>
        </div>
      </main>
    );
  }
}

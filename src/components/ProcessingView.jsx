const SKELETON_ROWS = [78, 92, 64]

export default function ProcessingView() {
  return (
    <div className="animate-scale-in card mx-auto max-w-2xl px-5 py-10 text-center sm:px-8 sm:py-12">
      <div className="relative mx-auto mb-6 grid h-16 w-16 place-items-center">
        <span className="absolute inset-0 rounded-full border-2 border-accent-500/30 animate-pulse-ring" />
        <span className="absolute inset-0 rounded-full border-2 border-transparent border-t-accent-500 animate-spin-slow" />
        <span className="grid h-11 w-11 place-items-center rounded-full bg-app-elevated text-accent-400">
          <span className="font-mono text-sm font-bold">AI</span>
        </span>
      </div>

      <h2 className="text-lg font-bold text-white sm:text-xl">
        Reading your schedule<span className="text-accent-500">…</span>
      </h2>
      <p className="mx-auto mt-1.5 max-w-sm text-sm text-slate-400">
        Running OCR + shift detection. Detecting dates, start/end times and shift labels.
      </p>

      <div className="mt-8 space-y-3 text-left">
        {SKELETON_ROWS.map((width, index) => (
          <div
            key={index}
            className="flex items-center gap-3 rounded-xl border border-app-line/70 bg-app-bg/60 p-3"
          >
            <div className="h-9 w-9 shrink-0 rounded-lg bg-app-elevated" />
            <div className="flex-1 space-y-2">
              <div
                className="h-2.5 rounded-full bg-gradient-to-r from-app-elevated via-slate-700 to-app-elevated animate-shimmer"
                style={{ width: `${width}%` }}
              />
              <div
                className="h-2.5 w-1/3 rounded-full bg-gradient-to-r from-app-elevated via-slate-700 to-app-elevated animate-shimmer"
                style={{ animationDelay: '0.15s' }}
              />
            </div>
            <div className="h-6 w-16 rounded-full bg-app-elevated" />
          </div>
        ))}
      </div>

      <div className="mt-7 flex items-center justify-center gap-2 text-[11px] font-medium uppercase tracking-widest text-slate-500">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-500" />
        Detecting shifts
      </div>
    </div>
  )
}

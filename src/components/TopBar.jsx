import { CalendarCheck2, Settings } from 'lucide-react'

export default function TopBar() {
  return (
    <header className="sticky top-0 z-40 border-b border-app-line/70 bg-app-bg/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-4 sm:h-16 sm:px-6">
        <div className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-xl bg-accent-500 text-white shadow-lg shadow-accent-600/30 sm:h-9 sm:w-9">
            <CalendarCheck2 className="h-4.5 w-4.5 sm:h-5 sm:w-5" strokeWidth={2.4} />
          </span>
          <span className="text-[17px] font-extrabold tracking-tight text-white sm:text-lg">
            Shift<span className="text-accent-500">Sync</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden items-center gap-1.5 rounded-full border border-app-line bg-app-surface px-2.5 py-1 text-[11px] font-medium text-slate-400 sm:inline-flex">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            AI parser online
          </span>
          <button
            type="button"
            aria-label="Settings and profile"
            className="grid h-9 w-9 place-items-center rounded-xl border border-app-line bg-app-surface text-slate-300 transition-all duration-200 hover:border-accent-500/50 hover:text-accent-400 active:scale-95"
          >
            <Settings className="h-4.5 w-4.5" />
          </button>
        </div>
      </div>
    </header>
  )
}

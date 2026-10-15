export default function FeedbackLink({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="animate-fade-in fixed bottom-4 right-4 z-40 inline-flex items-center gap-1.5 rounded-full border border-app-line bg-app-surface/90 px-3 py-2 text-[11px] font-semibold text-slate-400 shadow-xl shadow-black/40 backdrop-blur transition-all duration-200 hover:border-accent-500/50 hover:text-accent-300 active:scale-95"
    >
      <span aria-hidden="true">⚠️</span>
      Report Parsing Error
    </button>
  )
}

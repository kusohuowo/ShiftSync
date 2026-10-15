import { useEffect } from 'react'
import { CheckCircle2, Info, X } from 'lucide-react'

const TONE = {
  success: {
    icon: CheckCircle2,
    classes: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300',
    iconClass: 'text-emerald-400',
  },
  info: {
    icon: Info,
    classes: 'border-sky-500/30 bg-sky-500/10 text-sky-200',
    iconClass: 'text-sky-400',
  },
}

export default function Toast({ toast, onDismiss }) {
  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(onDismiss, 5000)
    return () => clearTimeout(timer)
  }, [toast, onDismiss])

  if (!toast) return null

  const tone = TONE[toast.tone] ?? TONE.info
  const Icon = tone.icon

  return (
    <div
      role="status"
      aria-live="polite"
      className="animate-toast-in fixed inset-x-4 bottom-20 z-50 mx-auto flex max-w-md items-start gap-3 rounded-2xl border border-app-line bg-app-elevated/95 p-4 shadow-2xl shadow-black/50 backdrop-blur-xl sm:inset-x-auto sm:right-5 sm:bottom-5 sm:mx-0"
    >
      <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl border ${tone.classes}`}>
        <Icon className={`h-5 w-5 ${tone.iconClass}`} />
      </span>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-bold text-white">{toast.title}</p>
        <p className="mt-0.5 text-xs leading-relaxed text-slate-400">{toast.message}</p>
      </div>

      <button
        type="button"
        aria-label="Dismiss notification"
        onClick={onDismiss}
        className="grid h-6 w-6 shrink-0 place-items-center rounded-md text-slate-500 transition-colors hover:bg-white/5 hover:text-white"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}

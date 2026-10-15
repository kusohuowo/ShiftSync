import { Check } from 'lucide-react'

const STEPS = [
  { key: 'upload', label: 'Upload' },
  { key: 'processing', label: 'Analyze' },
  { key: 'review', label: 'Review' },
  { key: 'export', label: 'Export' },
]

export default function StepIndicator({ current }) {
  const activeIndex = STEPS.findIndex((s) => s.key === current)

  return (
    <ol className="animate-fade-in flex items-center gap-1.5 sm:gap-2" aria-label="Progress">
      {STEPS.map((step, index) => {
        const isDone = index < activeIndex
        const isActive = index === activeIndex

        return (
          <li key={step.key} className="flex flex-1 items-center gap-1.5 sm:gap-2">
            <div
              className={[
                'flex min-w-0 flex-1 items-center gap-2 rounded-full border px-2 py-1.5 transition-all duration-500 sm:px-3',
                isActive
                  ? 'border-accent-500/60 bg-accent-500/10 text-accent-300'
                  : isDone
                    ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                    : 'border-app-line bg-app-surface/60 text-slate-500',
              ].join(' ')}
            >
              <span
                className={[
                  'grid h-5 w-5 shrink-0 place-items-center rounded-full text-[10px] font-bold transition-colors duration-300',
                  isActive
                    ? 'bg-accent-500 text-white'
                    : isDone
                      ? 'bg-emerald-500 text-white'
                      : 'bg-app-elevated text-slate-500',
                ].join(' ')}
              >
                {isDone ? <Check className="h-3 w-3" strokeWidth={3} /> : index + 1}
              </span>
              <span className="truncate text-[11px] font-semibold sm:text-xs">{step.label}</span>
            </div>
          </li>
        )
      })}
    </ol>
  )
}

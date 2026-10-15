import { Check, Clock3, Sparkles, Trash2 } from 'lucide-react'
import { durationInHours, formatTime, weekdayFrom } from '../data/mockShifts'

const FIELD_LABEL = 'block text-[10px] font-semibold uppercase tracking-wider text-slate-500'

export default function ShiftRow({ shift, index, onChange, onRemove }) {
  const weekday = weekdayFrom(shift.date)
  const duration = durationInHours(shift.start, shift.end)

  return (
    <li
      className="animate-fade-up group rounded-xl border border-app-line bg-app-bg/60 p-3.5 transition-colors duration-200 hover:border-slate-600 sm:p-4"
      style={{ animationDelay: `${index * 70}ms` }}
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="flex items-center gap-2 text-xs font-semibold text-slate-400">
          <span className="grid h-5 w-5 place-items-center rounded-md bg-accent-500/15 text-[10px] font-bold text-accent-400">
            {index + 1}
          </span>
          {weekday}, {shift.weekLabel || 'this week'}
        </span>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-300">
            <Check className="h-3 w-3" strokeWidth={3} />
            {shift.status}
          </span>
          <button
            type="button"
            aria-label={`Remove ${shift.label}`}
            onClick={() => onRemove(shift.id)}
            className="grid h-6 w-6 place-items-center rounded-md text-slate-600 opacity-0 transition-all duration-200 hover:bg-red-500/10 hover:text-red-400 focus-visible:opacity-100 group-hover:opacity-100 max-md:opacity-100"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-12 md:items-end">
        <label className="col-span-2 md:col-span-4">
          <span className={`${FIELD_LABEL} mb-1.5`}>Shift label</span>
          <input
            type="text"
            value={shift.label}
            onChange={(event) => onChange(shift.id, 'label', event.target.value)}
            className="field w-full font-medium"
          />
        </label>

        <label className="col-span-2 md:col-span-3">
          <span className={`${FIELD_LABEL} mb-1.5`}>Date</span>
          <input
            type="date"
            value={shift.date}
            onChange={(event) => onChange(shift.id, 'date', event.target.value)}
            className="field w-full"
          />
        </label>

        <label className="md:col-span-2">
          <span className={`${FIELD_LABEL} mb-1.5`}>Start</span>
          <input
            type="time"
            value={shift.start}
            onChange={(event) => onChange(shift.id, 'start', event.target.value)}
            className="field w-full"
          />
        </label>

        <label className="md:col-span-2">
          <span className={`${FIELD_LABEL} mb-1.5`}>End</span>
          <input
            type="time"
            value={shift.end}
            onChange={(event) => onChange(shift.id, 'end', event.target.value)}
            className="field w-full"
          />
        </label>

        <div className="col-span-2 md:col-span-1 md:text-right">
          <span className={`${FIELD_LABEL} mb-1.5 block`}>Hrs</span>
          <span className="inline-flex items-center gap-1 rounded-lg bg-app-elevated px-2 py-1.5 text-xs font-semibold text-accent-300">
            <Clock3 className="h-3.5 w-3.5" />
            {duration}
          </span>
        </div>
      </div>

      <p className="mt-3 flex items-center gap-1.5 text-[11px] text-slate-500">
        <Sparkles className="h-3.5 w-3.5 text-accent-500" />
        {formatTime(shift.start)} → {formatTime(shift.end)} · editable if the AI guessed wrong
      </p>
    </li>
  )
}

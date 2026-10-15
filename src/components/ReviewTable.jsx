import { CalendarPlus, FileDown, RotateCcw, ShieldCheck, Wand2 } from 'lucide-react'
import ShiftRow from './ShiftRow'

export default function ReviewTable({ shifts, onChange, onRemove, onExport, onReset }) {
  return (
    <div className="animate-fade-up space-y-5">
      <div className="flex flex-col gap-1">
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-app-line bg-app-surface px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-accent-400">
          <Wand2 className="h-3 w-3" /> Step 3 — Review
        </span>
        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Verify your parsed shifts
        </h1>
        <p className="text-sm text-slate-400">
          {shifts.length} shifts detected. Fix anything the AI misread before exporting.
        </p>
      </div>

      <div className="card p-3 sm:p-4">
        <div className="mb-2 hidden grid-cols-12 gap-3 px-1 pb-2 md:grid">
          {['Shift label', 'Date', 'Start', 'End', ''].map((heading, index) => (
            <span
              key={`${heading}-${index}`}
              className={[
                'text-[10px] font-semibold uppercase tracking-wider text-slate-500',
                index === 0 ? 'col-span-4' : index === 1 ? 'col-span-3' : 'col-span-2',
                index === 4 ? 'col-span-1 text-right' : '',
              ].join(' ')}
            >
              {heading}
            </span>
          ))}
        </div>

        <ul className="space-y-2.5">
          {shifts.map((shift, index) => (
            <ShiftRow
              key={shift.id}
              shift={shift}
              index={index}
              onChange={onChange}
              onRemove={onRemove}
            />
          ))}
        </ul>

        {shifts.length === 0 && (
          <p className="rounded-xl border border-dashed border-app-line bg-app-bg/50 px-4 py-8 text-center text-sm text-slate-500">
            All rows removed. Start over to run a fresh scan.
          </p>
        )}
      </div>

      <div className="flex items-start gap-2.5 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.07] px-3.5 py-3 text-xs leading-relaxed text-emerald-200/90">
        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
        <p>
          Cross-checked against your original screenshot — every field below is fully editable so
          you stay in control.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={onExport}
          disabled={shifts.length === 0}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent-500 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-accent-600/25 transition-all duration-200 hover:bg-accent-600 hover:shadow-accent-600/40 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <FileDown className="h-4.5 w-4.5" />
          Export to Calendar (.ics)
        </button>

        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-app-line bg-app-surface px-5 py-3.5 text-sm font-bold text-slate-200 transition-all duration-200 hover:border-slate-500 hover:bg-app-elevated active:scale-[0.98]"
        >
          <RotateCcw className="h-4.5 w-4.5" />
          Start Over
        </button>
      </div>

      <p className="flex items-center justify-center gap-1.5 text-center text-[11px] text-slate-500">
        <CalendarPlus className="h-3.5 w-3.5" />
        Works with Google Calendar, Apple Calendar, Outlook & any .ics-compatible app.
      </p>
    </div>
  )
}

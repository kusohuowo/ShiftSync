import { useRef, useState } from 'react'
import { Info, FileImage, ScanText, UploadCloud } from 'lucide-react'

export default function UploadZone({ onAnalyze }) {
  const fileInputRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const [text, setText] = useState('')
  const [fileName, setFileName] = useState('')

  const hasInput = text.trim().length > 0 || fileName.length > 0

  const handleFiles = (files) => {
    const file = files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (PNG or JPG).')
      return
    }
    setFileName(file.name)
  }

  const handleDrop = (event) => {
    event.preventDefault()
    setIsDragging(false)
    handleFiles(event.dataTransfer.files)
  }

  return (
    <div className="animate-fade-up space-y-5">
      <div className="space-y-2 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-app-line bg-app-surface px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-accent-400">
          Step 1
        </span>
        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Turn your schedule into calendar events
        </h1>
        <p className="mx-auto max-w-md text-sm leading-relaxed text-slate-400">
          Upload a screenshot of your rota or paste the messy text — ShiftSync extracts every shift
          in seconds.
        </p>
      </div>

      <div
        onDragOver={(event) => {
          event.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') fileInputRef.current?.click()
        }}
        className={[
          'group card relative flex cursor-pointer flex-col items-center justify-center gap-3 px-5 py-10 text-center transition-all duration-300 sm:py-14',
          isDragging
            ? 'border-accent-500 bg-accent-500/10 shadow-xl shadow-accent-600/10 scale-[1.01]'
            : 'hover:border-accent-500/50 hover:bg-app-elevated/60',
        ].join(' ')}
      >
        <span className="relative grid h-14 w-14 place-items-center rounded-2xl border border-app-line bg-app-elevated text-accent-400 transition-transform duration-300 group-hover:-translate-y-0.5">
          {isDragging && (
            <span className="absolute inset-0 rounded-2xl border-2 border-accent-500 animate-pulse-ring" />
          )}
          <UploadCloud className="h-7 w-7" strokeWidth={1.8} />
        </span>

        <div className="space-y-1">
          <p className="text-sm font-semibold text-slate-100 sm:text-base">
            Drop your schedule screenshot here or{' '}
            <span className="text-accent-400 underline decoration-accent-500/40 underline-offset-4">
              browse
            </span>
          </p>
          <p className="text-xs text-slate-500">Supported formats: PNG, JPG</p>
        </div>

        {fileName && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-app-bg px-3 py-1 text-xs font-medium text-emerald-300">
            <FileImage className="h-3.5 w-3.5" /> {fileName}
          </span>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg"
          className="hidden"
          onChange={(event) => handleFiles(event.target.files)}
        />
      </div>

      <div className="relative flex items-start gap-3">
        <span className="absolute left-1/2 top-0 h-px w-4/5 -translate-x-1/2 bg-gradient-to-r from-transparent via-app-line to-transparent" />
        <span className="mt-3 text-[11px] font-semibold uppercase tracking-widest text-slate-600">
          or
        </span>
        <textarea
          value={text}
          onChange={(event) => setText(event.target.value)}
          rows={5}
          placeholder={
            'Paste your schedule text here…\n\nMon 08:00-16:00 Regular\nWed 16:00-00:00 Evening\nFri 00:00-08:00 Overtime'
          }
          className="field w-full resize-y leading-relaxed placeholder:text-slate-600"
        />
      </div>

      <button
        type="button"
        disabled={!hasInput}
        onClick={() => onAnalyze({ text, fileName })}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent-500 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-accent-600/25 transition-all duration-200 hover:bg-accent-600 hover:shadow-accent-600/40 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-app-elevated disabled:text-slate-500 disabled:shadow-none"
      >
        <ScanText className="h-4.5 w-4.5" />
        Analyze Schedule
      </button>

      <div className="flex items-start gap-2.5 rounded-xl border border-sky-500/20 bg-sky-500/[0.07] px-3.5 py-3 text-xs leading-relaxed text-sky-200/90">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-sky-400" />
        <p>
          ShiftSync uses lightweight AI to parse your shift dates and hours instantly
          <span className="font-semibold text-sky-100"> without saving your personal data.</span>
        </p>
      </div>
    </div>
  )
}

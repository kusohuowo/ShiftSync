import { useCallback, useEffect, useState } from 'react'
import FeedbackLink from './components/FeedbackLink'
import ProcessingView from './components/ProcessingView'
import ReviewTable from './components/ReviewTable'
import StepIndicator from './components/StepIndicator'
import Toast from './components/Toast'
import TopBar from './components/TopBar'
import UploadZone from './components/UploadZone'
import { mockShifts } from './data/mockShifts'
import { downloadIcs } from './utils/ics'

const PROCESSING_MS = 2000

export default function App() {
  const [step, setStep] = useState('upload')
  const [shifts, setShifts] = useState(mockShifts)
  const [toast, setToast] = useState(null)

  const startProcessing = useCallback(() => {
    setStep('processing')
  }, [])

  useEffect(() => {
    if (step !== 'processing') return
    const timer = setTimeout(() => {
      setShifts(mockShifts)
      setStep('review')
    }, PROCESSING_MS)
    return () => clearTimeout(timer)
  }, [step])

  const handleFieldChange = useCallback((id, field, value) => {
    setShifts((current) =>
      current.map((shift) => (shift.id === id ? { ...shift, [field]: value } : shift)),
    )
  }, [])

  const handleRemove = useCallback((id) => {
    setShifts((current) => current.filter((shift) => shift.id !== id))
  }, [])

  const handleExport = useCallback(() => {
    downloadIcs(shifts)
    setStep('export')
    setToast({
      tone: 'success',
      title: 'Success!',
      message: `ShiftSync generated your .ics file. Importing ${shifts.length} events into your Google/Apple Calendar…`,
    })
  }, [shifts])

  const handleReset = useCallback(() => {
    setShifts(mockShifts)
    setStep('upload')
    setToast(null)
  }, [])

  const handleFeedback = useCallback(() => {
    setToast({
      tone: 'info',
      title: 'Thanks for the heads-up',
      message: 'Parsing error report queued for our review — no personal schedule data is stored.',
    })
  }, [])

  return (
    <div className="flex min-h-dvh flex-col">
      <TopBar />

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 pb-28 pt-6 sm:px-6 sm:pt-9">
        <div className="mx-auto mb-6 max-w-2xl sm:mb-8">
          <StepIndicator current={step} />
        </div>

        <section className="mx-auto max-w-2xl">
          {step === 'upload' && <UploadZone onAnalyze={startProcessing} />}

          {step === 'processing' && <ProcessingView />}

          {(step === 'review' || step === 'export') && (
            <ReviewTable
              shifts={shifts}
              onChange={handleFieldChange}
              onRemove={handleRemove}
              onExport={handleExport}
              onReset={handleReset}
            />
          )}
        </section>
      </main>

      <footer className="border-t border-app-line/70 py-5">
        <p className="text-center text-[11px] text-slate-600">
          © {new Date().getFullYear()} ShiftSync · Local-first schedule parsing
        </p>
      </footer>

      <FeedbackLink onClick={handleFeedback} />
      <Toast toast={toast} onDismiss={() => setToast(null)} />
    </div>
  )
}

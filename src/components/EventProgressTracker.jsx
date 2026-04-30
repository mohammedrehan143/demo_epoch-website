import { useEffect, useMemo, useRef, useState } from 'react'

const DEFAULT_STEPS = [
  { key: 'announced', label: 'Announced' },
  { key: 'registration', label: 'Registration' },
  { key: 'shortlist', label: 'Shortlist' },
  { key: 'live', label: 'Live' },
  { key: 'wrap', label: 'Wrap-up' },
]

function clamp(num, min, max) {
  return Math.min(max, Math.max(min, num))
}

function EventProgressTracker({ title = 'Event tracking', steps = DEFAULT_STEPS, currentStep = 2 }) {
  const rootRef = useRef(null)
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    const element = rootRef.current
    if (!element) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setAnimate(true)
            observer.disconnect()
            break
          }
        }
      },
      { threshold: 0.35 }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  const safeStep = clamp(currentStep, 0, Math.max(0, steps.length - 1))
  const targetPercent = useMemo(() => {
    if (steps.length <= 1) return 100
    return Math.round((safeStep / (steps.length - 1)) * 100)
  }, [safeStep, steps.length])

  const currentLabel = steps[safeStep]?.label ?? '—'

  return (
    <div
      ref={rootRef}
      className="mt-6 rounded-2xl border border-tech-line bg-white/70 p-5 shadow-sm backdrop-blur"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="font-display text-xl font-semibold">
          <span className="text-gradient-soft">{title}</span>
        </p>
        <p className="font-clean text-sm text-tech-muted">
          Current: <span className="font-display font-semibold text-tech-text">{currentLabel}</span>
        </p>
      </div>

      <div className="mt-4">
        <div className="relative mt-2">
          <div className="absolute left-[13px] top-2 h-[calc(100%-12px)] w-[2px] rounded-full bg-black/10" />
          <div
            className={
              animate
                ? 'tracking-fill-y absolute left-[13px] top-2 w-[2px] rounded-full bg-gradient-to-b from-tech-accent via-purple-500 to-tech-pink'
                : 'absolute left-[13px] top-2 w-[2px] rounded-full bg-gradient-to-b from-tech-accent via-purple-500 to-tech-pink'
            }
            style={animate ? { height: '0%', '--tracking-target': `${targetPercent}%` } : { height: `${targetPercent}%` }}
          />

          <ol className="grid gap-4">
          {steps.map((step, index) => {
            const done = index < safeStep
            const active = index === safeStep
            const status = done ? 'Successfully completed' : active ? 'In progress' : 'Not started'
            const dotClass = done
              ? 'bg-gradient-to-br from-tech-accent to-tech-pink text-white shadow-[0_18px_50px_rgba(37,99,235,0.18)]'
              : active
                ? 'tracking-pulse bg-white text-tech-text ring-2 ring-tech-accent/25'
                : 'bg-white text-tech-muted'

            return (
              <li key={step.key} className="flex items-start gap-4">
                <div className="relative mt-1 flex w-7 justify-center">
                  <span
                    className={[
                      'grid h-7 w-7 place-items-center rounded-full border border-tech-line text-[10px] font-semibold',
                      dotClass,
                    ].join(' ')}
                    aria-label={status}
                    title={status}
                  >
                    {done ? '✓' : String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                <div className="min-w-0 flex-1 rounded-2xl border border-tech-line bg-white/75 px-4 py-3 shadow-sm">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="min-w-0 truncate">
                      <span className="font-dot text-[10px] tracking-[0.26em] text-tech-muted">STAGE {String(index + 1).padStart(2, '0')}</span>
                      <span className="ml-2 font-display text-base font-semibold text-tech-text">{step.label}</span>
                    </p>
                    <span
                      className={[
                        'rounded-full border border-tech-line px-3 py-1 font-clean text-[11px] font-semibold',
                        done ? 'bg-black/5 text-tech-text' : active ? 'bg-tech-accent/10 text-tech-text' : 'bg-white/70 text-tech-muted',
                      ].join(' ')}
                    >
                      {status}
                    </span>
                  </div>
                  <p className="mt-1 font-clean text-sm text-tech-muted">
                    {done
                      ? 'Locked in and confirmed.'
                      : active
                        ? 'This stage is happening right now — keep an eye on updates.'
                        : 'Queued up — it will activate automatically.'}
                  </p>
                </div>
              </li>
            )
          })}
          </ol>
        </div>
      </div>
    </div>
  )
}

export default EventProgressTracker


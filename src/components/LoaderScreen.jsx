function LoaderScreen() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-tech-bg">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-tech-accent/20 blur-[90px]" />
        <div className="absolute right-[-80px] top-28 h-72 w-72 rounded-full bg-tech-pink/16 blur-[90px]" />
        <div className="absolute bottom-[-80px] left-[20%] h-80 w-80 rounded-full bg-amber-400/16 blur-[110px]" />
      </div>

      <div className="relative w-[min(680px,92%)] rounded-[32px] border border-tech-line bg-white/65 p-8 text-center shadow-[0_40px_130px_rgba(15,23,42,0.14)] backdrop-blur">
        <p className="text-xs tracking-[0.32em] text-tech-muted">EPOCH SOCIETY / Loading</p>

        <div className="mt-6 grid place-items-center">
          <div className="relative h-28 w-28">
            <div className="loader-ring loader-spin absolute inset-0 rounded-full" />
            <div className="absolute inset-[10px] rounded-full border border-tech-line bg-white/70 shadow-inner" />
            <div className="absolute inset-0 grid place-items-center">
              <span className="loader-pop font-dot text-2xl text-tech-text">26</span>
            </div>
          </div>
        </div>

        <h2 className="mt-6 font-display text-3xl font-semibold md:text-5xl">
          <span className="font-clean font-bold text-tech-text">Building</span>{' '}
          <span className="text-gradient">the vibe</span>
        </h2>
        <p className="mt-2 font-clean text-sm text-tech-muted">A light, geometric experience is loading…</p>

        <div className="mt-6 h-2 overflow-hidden rounded-full border border-tech-line bg-white/70">
          <div className="loader-fill h-full w-1/2 rounded-full bg-gradient-to-r from-tech-accent via-purple-500 to-tech-pink" />
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs text-tech-muted">
          <span className="rounded-full border border-tech-line bg-white/70 px-3 py-1">3D</span>
          <span className="rounded-full border border-tech-line bg-white/70 px-3 py-1">Events</span>
          <span className="rounded-full border border-tech-line bg-white/70 px-3 py-1">Gallery</span>
          <span className="rounded-full border border-tech-line bg-white/70 px-3 py-1">Tracking</span>
        </div>
      </div>
    </div>
  )
}

export default LoaderScreen

import { useEffect, useRef, useState } from 'react'
import { gallery } from '../data/siteData'

function GallerySection() {
  const sectionRef = useRef(null)
  const sliderRef = useRef(null)
  const [hovered, setHovered] = useState(false)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    const slider = sliderRef.current
    if (!section || !slider) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          setInView(entry.isIntersecting && entry.intersectionRatio >= 0.55)
        }
      },
      { threshold: [0, 0.25, 0.55, 0.8, 1] }
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    const slider = sliderRef.current
    if (!section || !slider) return undefined

    // Only attach the expensive global wheel handler while the user is hovering
    // this section and it is on-screen. This keeps overall page scrolling smooth.
    if (!hovered || !inView) return undefined

    const onWheel = (event) => {
      // Only hijack scroll when wheel originates inside this section.
      if (!section.contains(event.target)) return

      // Convert vertical scroll into horizontal scroll while slider has room.
      const remainingRight = slider.scrollWidth - slider.clientWidth - slider.scrollLeft
      const remainingLeft = slider.scrollLeft

      const dy = event.deltaY
      const dx = event.deltaX
      const intent = Math.abs(dy) >= Math.abs(dx) ? dy : dx
      if (intent === 0) return

      const goingRight = intent > 0
      const canScroll =
        (goingRight && remainingRight > 1) ||
        (!goingRight && remainingLeft > 1)

      if (!canScroll) return

      event.preventDefault()
      slider.scrollBy({ left: intent, top: 0, behavior: 'auto' })
    }

    // Capture phase: prevent page from scrolling before default happens.
    window.addEventListener('wheel', onWheel, { passive: false, capture: true })
    return () => window.removeEventListener('wheel', onWheel, { capture: true })
  }, [hovered, inView])

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="reveal-root mt-10"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <p className="reveal font-clean text-xs tracking-[0.24em] text-tech-muted">GALLERY</p>
      <h2 className="reveal mt-2 font-display text-4xl font-semibold md:text-6xl">
        Past <span className="text-tech-pink">Event</span> Memories
      </h2>
      <div className="mt-4">
        <div className="reveal flex items-center justify-between gap-4">
          <p className="font-clean text-sm text-tech-muted">Hover here + scroll to slide</p>
          <div className="hidden items-center gap-2 md:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-tech-accent/60" />
            <span className="h-1.5 w-1.5 rounded-full bg-tech-pink/50" />
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400/50" />
          </div>
        </div>

        <div
          ref={sliderRef}
          className="gallery-slider mt-4 flex gap-4 overflow-x-auto pb-3 [scrollbar-width:none] [-ms-overflow-style:none]"
        >
          {gallery.map((item) => (
            <figure
              key={item.id}
              className="tilt-3d reveal group relative w-[min(520px,86vw)] flex-none snap-start overflow-hidden rounded-2xl border border-tech-line bg-white/70 shadow-sm"
            >
              <img
                src={item.image}
                alt={item.caption}
                className="h-[280px] w-full object-cover transition duration-700 group-hover:scale-[1.06]"
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
              <figcaption className="absolute bottom-0 left-0 right-0 p-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-sm shadow-sm backdrop-blur">
                  <span className="font-dot text-[10px] tracking-wider text-black/80">{item.id}</span>
                  <span className="font-clean font-semibold text-black">{item.caption}</span>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

export default GallerySection

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { gallery } from '../data/siteData'

function GallerySection() {
  const sectionRef = useRef(null)
  const viewportRef = useRef(null)
  const trackRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const viewport = viewportRef.current
    const track = trackRef.current
    if (!section || !viewport || !track) return undefined

    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const getMaxX = () => {
        const max = track.scrollWidth - viewport.clientWidth
        return Math.max(0, max)
      }

      const tween = gsap.to(track, {
        x: () => -getMaxX(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${getMaxX() + 600}`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      return () => tween.kill()
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="gallery" className="reveal-root mt-10">
      <p className="reveal font-clean text-xs tracking-[0.24em] text-tech-muted">GALLERY</p>
      <h2 className="reveal mt-2 font-display text-4xl font-semibold md:text-6xl">
        Past <span className="text-tech-pink">Event</span> Memories
      </h2>
      <div className="mt-4">
        <div className="reveal flex items-center justify-between gap-4">
          <p className="font-clean text-sm text-tech-muted">Scroll to slide through memories</p>
          <div className="hidden items-center gap-2 md:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-tech-accent/60" />
            <span className="h-1.5 w-1.5 rounded-full bg-tech-pink/50" />
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400/50" />
          </div>
        </div>

        <div ref={viewportRef} className="mt-4 overflow-hidden">
          <div ref={trackRef} className="gallery-slider flex gap-4 pb-3">
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
      </div>
    </section>
  )
}

export default GallerySection

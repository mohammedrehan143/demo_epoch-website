import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Navbar({ onLoginClick }) {
  const navigate = useNavigate()
  const [openDesktop, setOpenDesktop] = useState(false)
  const [openMobile, setOpenMobile] = useState(false)

  const goHome = () => {
    navigate('/')
    setOpenDesktop(false)
    setOpenMobile(false)
  }

  const goToSection = (id) => {
    navigate('/')
    requestAnimationFrame(() => {
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    })
    setOpenDesktop(false)
    setOpenMobile(false)
  }

  return (
    <header className="fixed inset-x-0 bottom-4 z-50">
      <div className="mx-auto flex w-[min(980px,94%)] items-center justify-between gap-3 rounded-full border border-tech-line bg-white/75 px-4 py-2 shadow-[0_18px_70px_rgba(15,23,42,0.12)] backdrop-blur">
        <button type="button" onClick={goHome} className="font-dot text-[11px] tracking-[0.22em] text-tech-text">
          EPOCH
        </button>

        <nav className="hidden items-center gap-1 md:flex">
          {[
            { label: 'Events', id: 'events' },
            { label: 'Gallery', id: 'gallery' },
            { label: 'Members', id: 'members' },
            { label: 'FAQ', id: 'faq' },
            { label: 'Contact', id: 'contact' },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => goToSection(item.id)}
              className="rounded-full px-3 py-1 text-sm font-clean text-tech-muted hover:bg-black/5 hover:text-tech-text"
            >
              {item.label}
            </button>
          ))}
          <button
            type="button"
            onClick={onLoginClick}
            className="ml-1 rounded-full border border-tech-line bg-white/80 px-4 py-1 text-sm font-display font-semibold text-tech-text hover:bg-white"
          >
            Login
          </button>
        </nav>

        <div className="relative md:hidden">
          <button
            type="button"
            onClick={() => setOpenMobile((value) => !value)}
            className="rounded-full border border-tech-line bg-white/80 px-3 py-1 text-sm font-clean text-tech-muted hover:text-tech-text"
          >
            Menu
          </button>
          {openMobile && (
            <div className="absolute bottom-12 right-0 w-52 rounded-2xl border border-tech-line bg-white/92 p-2 shadow-xl backdrop-blur">
              <button
                type="button"
                onClick={goHome}
                className="block w-full rounded-xl px-3 py-2 text-left font-display text-sm font-semibold hover:bg-black/5"
              >
                Home
              </button>
              {[
                { label: 'Events', id: 'events' },
                { label: 'Gallery', id: 'gallery' },
                { label: 'Members', id: 'members' },
                { label: 'FAQ', id: 'faq' },
                { label: 'Contact', id: 'contact' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => goToSection(item.id)}
                  className="block w-full rounded-xl px-3 py-2 text-left font-clean text-sm text-tech-muted hover:bg-black/5 hover:text-tech-text"
                >
                  {item.label}
                </button>
              ))}
              <button
                type="button"
                onClick={onLoginClick}
                className="mt-1 block w-full rounded-xl border border-tech-line bg-white/80 px-3 py-2 text-left font-display text-sm font-semibold hover:bg-white"
              >
                Login
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar

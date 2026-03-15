import { useState, useEffect } from "react"
import Icon from "@/components/ui/icon"

export default function Header() {
  const [dark, setDark] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const toggleDark = () => {
    setDark(!dark)
    document.documentElement.classList.toggle("dark")
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/80 dark:bg-black/80 backdrop-blur-xl shadow-sm border-b border-green-100/40 dark:border-green-900/40"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-green-600 dark:bg-green-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            <span className="text-white text-xs font-bold">А</span>
          </div>
          <span className="text-sm font-bold tracking-widest text-green-900 dark:text-green-100 uppercase">
            АРТС<span className="text-green-500">&</span>КРАФТИНГ
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {[
            { label: "Товары", href: "#products" },
            { label: "Контакты", href: "#contacts" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-xs font-medium uppercase tracking-wider text-green-800/70 dark:text-green-300/70 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200"
            >
              {item.label}
            </a>
          ))}
          <a
            href="https://t.me/ARTSANDCRAFTING"
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2 rounded-full bg-green-600 text-white text-xs font-medium hover:bg-green-700 transition-all duration-200 shadow-md hover:shadow-green-500/30"
          >
            Написать
          </a>
          <button
            onClick={toggleDark}
            className="w-8 h-8 rounded-full flex items-center justify-center text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900/40 transition-all"
          >
            <Icon name={dark ? "Sun" : "Moon"} size={15} />
          </button>
        </nav>

        {/* Mobile */}
        <div className="flex md:hidden items-center gap-3">
          <button onClick={toggleDark} className="w-8 h-8 rounded-full flex items-center justify-center text-green-700 dark:text-green-300">
            <Icon name={dark ? "Sun" : "Moon"} size={15} />
          </button>
          <button onClick={() => setMenuOpen(!menuOpen)} className="w-8 h-8 flex items-center justify-center text-green-800 dark:text-green-200">
            <Icon name={menuOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl border-t border-green-100 dark:border-green-900/40 px-6 py-6 flex flex-col gap-5">
          <a href="#products" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-green-800 dark:text-green-200">Товары</a>
          <a href="#contacts" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-green-800 dark:text-green-200">Контакты</a>
          <a href="https://t.me/ARTSANDCRAFTING" target="_blank" rel="noreferrer" className="px-5 py-3 rounded-full bg-green-600 text-white text-sm font-medium text-center">
            Написать в Telegram
          </a>
        </div>
      )}
    </header>
  )
}

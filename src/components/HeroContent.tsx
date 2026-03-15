import { useEffect, useState } from "react"
import Icon from "@/components/ui/icon"

const words = ["нитки", "пуговицы", "фурнитуру", "инструменты"]

export default function HeroContent() {
  const [wordIndex, setWordIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setWordIndex((i) => (i + 1) % words.length)
        setVisible(true)
      }, 400)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <main className="relative z-20 flex flex-col items-center justify-center min-h-screen text-center px-6 pt-20">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100/60 dark:bg-green-900/30 border border-green-300/40 dark:border-green-700/40 backdrop-blur-sm mb-8 animate-fade-in">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <span className="text-green-800 dark:text-green-300 text-xs font-medium tracking-wide">
          Магазин товаров для творчества
        </span>
      </div>

      {/* Heading */}
      <h1 className="text-5xl sm:text-6xl md:text-7xl font-light text-green-950 dark:text-white mb-6 leading-tight tracking-tight max-w-3xl">
        Всё для{" "}
        <br className="hidden sm:block" />
        <span className="font-semibold italic text-green-600 dark:text-green-400">
          рукоделия
        </span>
        <br />
        <span
          className="inline-block transition-all duration-400 font-medium"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(8px)" }}
        >
          {words[wordIndex]}
        </span>
      </h1>

      {/* Subtitle */}
      <p className="text-sm sm:text-base text-green-800/60 dark:text-green-300/60 max-w-md mb-10 leading-relaxed font-light">
        Широкий выбор материалов для вязания, шитья и творчества.
        Быстрая доставка по всей России.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <a
          href="#products"
          className="group flex items-center gap-2 px-8 py-4 rounded-full bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition-all duration-300 shadow-xl shadow-green-500/20 hover:shadow-green-500/40 hover:scale-105"
        >
          Смотреть товары
          <Icon name="ArrowDown" size={15} className="group-hover:translate-y-1 transition-transform" />
        </a>
        <a
          href="https://t.me/ARTSANDCRAFTING"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 px-8 py-4 rounded-full border border-green-400/40 dark:border-green-600/40 text-green-800 dark:text-green-200 text-sm font-medium hover:bg-green-50/50 dark:hover:bg-green-900/20 transition-all duration-300 backdrop-blur-sm"
        >
          <Icon name="Send" size={15} />
          Telegram
        </a>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-green-700/40 dark:text-green-400/40 animate-bounce">
        <Icon name="ChevronDown" size={20} />
      </div>
    </main>
  )
}

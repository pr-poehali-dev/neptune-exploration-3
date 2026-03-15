import { useState } from "react"

export default function Header() {
  const [darkMode, setDarkMode] = useState(false)

  const toggleDark = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle("dark")
  }

  return (
    <header className="absolute top-0 left-0 right-0 z-11 p-6">
      <div className="flex justify-between items-center">
        <div className="text-sm uppercase tracking-widest font-semibold text-green-800 dark:text-green-300">
          АРТС&amp;КРАФТИНГ
        </div>
        <nav className="flex gap-6 items-center">
          <a href="#products" className="text-green-900 dark:text-green-200 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-300 uppercase text-xs font-medium">
            Товары
          </a>
          <a href="#contacts" className="text-green-900 dark:text-green-200 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-300 uppercase text-xs font-medium">
            Контакты
          </a>
          <button
            onClick={toggleDark}
            className="w-8 h-8 rounded-full border border-green-400/40 dark:border-green-600/40 flex items-center justify-center text-green-800 dark:text-green-200 hover:bg-green-100/30 dark:hover:bg-green-900/30 transition-all"
            title="Сменить тему"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </nav>
      </div>
    </header>
  )
}
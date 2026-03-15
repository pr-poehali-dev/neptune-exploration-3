export default function HeroContent() {
  return (
    <main className="absolute bottom-8 left-8 z-20 max-w-lg">
      <div className="text-left">
        <div
          className="inline-flex items-center px-3 py-1 rounded-full bg-green-100/20 backdrop-blur-sm mb-4 relative border border-green-400/20"
          style={{ filter: "url(#glass-effect)" }}
        >
          <div className="absolute top-0 left-1 right-1 h-px bg-gradient-to-r from-transparent via-green-400/30 to-transparent rounded-full" />
          <span className="text-green-900 dark:text-green-200 text-xs font-light relative z-10">🌿 Всё для творчества</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-6xl md:leading-16 tracking-tight font-light text-green-900 dark:text-white mb-4">
          <span className="font-medium italic">Нитки,</span> фурнитура
          <br />
          <span className="font-light tracking-tight">и вдохновение</span>
        </h1>

        {/* Description */}
        <p className="text-xs font-light text-green-800/80 dark:text-green-200/70 mb-4 leading-relaxed">
          Магазин товаров для рукоделия и творчества. Пуговицы, нитки, инструменты и фурнитура — всё в одном месте. Доставка по всей России.
        </p>

        {/* Buttons */}
        <div className="flex items-center gap-4 flex-wrap">
          <a
            href="#contacts"
            className="px-8 py-3 rounded-full bg-transparent border border-green-600/40 dark:border-green-400/30 text-green-900 dark:text-green-200 font-normal text-xs transition-all duration-200 hover:bg-green-100/30 dark:hover:bg-green-900/30 cursor-pointer"
          >
            Контакты
          </a>
          <a
            href="https://t.me/ARTSANDCRAFTING"
            target="_blank"
            rel="noreferrer"
            className="px-8 py-3 rounded-full bg-green-700 dark:bg-green-600 text-white font-normal text-xs transition-all duration-200 hover:bg-green-800 dark:hover:bg-green-500 cursor-pointer"
          >
            Написать нам
          </a>
        </div>
      </div>
    </main>
  )
}
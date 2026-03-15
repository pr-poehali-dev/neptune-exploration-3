import { useEffect, useRef, useState } from "react"
import Icon from "@/components/ui/icon"

export default function ContactsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.15 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const contacts = [
    {
      icon: "MessageCircle" as const,
      label: "MAX",
      sub: "Напишите нам в MAX",
      href: "https://max.ru/join/6vA9eQ-0nmP55CTnB5MfnYQ4zmW253WY_fukBZuK5lU",
      external: true,
    },
    {
      icon: "Send" as const,
      label: "Telegram",
      sub: "@ARTSANDCRAFTING",
      href: "https://t.me/ARTSANDCRAFTING",
      external: true,
    },
    {
      icon: "Phone" as const,
      label: "Телефон",
      sub: "8 902 724-60-61",
      href: "tel:89027246061",
      external: false,
    },
  ]

  return (
    <section id="contacts" className="relative z-20 px-6 py-24 max-w-6xl mx-auto">
      <div
        ref={ref}
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
      >
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-green-500 mb-3">Связаться</p>
        <h2 className="text-3xl sm:text-4xl font-light text-green-950 dark:text-white mb-3">
          Мы <span className="font-semibold italic">на связи</span>
        </h2>
        <p className="text-sm text-green-800/50 dark:text-green-400/60 max-w-md mb-12">
          Выберите удобный способ — ответим быстро
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {contacts.map((c, i) => (
            <a
              key={c.label}
              href={c.href}
              target={c.external ? "_blank" : undefined}
              rel={c.external ? "noreferrer" : undefined}
              className="group flex items-center gap-4 p-5 rounded-2xl bg-white/50 dark:bg-zinc-900/50 border border-green-100/60 dark:border-green-900/40 backdrop-blur-sm hover:shadow-lg hover:shadow-green-500/10 hover:-translate-y-0.5 transition-all duration-300"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.6s ease ${0.1 + i * 0.1}s, transform 0.6s ease ${0.1 + i * 0.1}s`,
              }}
            >
              <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/50 flex items-center justify-center group-hover:bg-green-200 dark:group-hover:bg-green-800/60 transition-colors">
                <Icon name={c.icon} size={18} className="text-green-700 dark:text-green-300" />
              </div>
              <div>
                <div className="text-sm font-semibold text-green-950 dark:text-green-100">{c.label}</div>
                <div className="text-xs text-green-700/60 dark:text-green-400/60">{c.sub}</div>
              </div>
              <Icon name="ArrowUpRight" size={14} className="ml-auto text-green-400/50 group-hover:text-green-500 transition-colors" />
            </a>
          ))}
        </div>

        {/* Big CTA */}
        <div className="rounded-3xl bg-gradient-to-br from-green-600 to-green-800 p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-6 text-white">
          <div>
            <h3 className="text-2xl font-semibold mb-2">Готовы к заказу?</h3>
            <p className="text-green-100/80 text-sm">Напишите нам — поможем подобрать всё нужное</p>
          </div>
          <a
            href="https://t.me/ARTSANDCRAFTING"
            target="_blank"
            rel="noreferrer"
            className="flex-shrink-0 flex items-center gap-2 px-8 py-4 rounded-full bg-white text-green-700 font-semibold text-sm hover:bg-green-50 transition-all hover:scale-105 shadow-lg"
          >
            <Icon name="Send" size={16} />
            Написать в Telegram
          </a>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-16 pt-8 border-t border-green-100/40 dark:border-green-900/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-green-700/40 dark:text-green-500/40">
        <span>© 2025 АРТС&amp;КРАФТИНГ — Все права защищены</span>
        <a href="/admin" className="hover:text-green-500 transition-colors">Панель управления</a>
      </div>
    </section>
  )
}

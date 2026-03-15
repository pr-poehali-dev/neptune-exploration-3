import { useState, useRef, useEffect } from "react"
import Icon from "@/components/ui/icon"

interface Message {
  from: "client" | "admin"
  text: string
  time: string
}

const ADMIN_CLICK_COUNT = 5

export default function ContactsSection() {
  const [chatOpen, setChatOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { from: "admin", text: "Привет! Чем могу помочь? 🌿", time: now() },
  ])
  const [input, setInput] = useState("")
  const [logoClicks, setLogoClicks] = useState(0)
  const [isAdmin, setIsAdmin] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  function now() {
    return new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, chatOpen])

  const handleLogoClick = () => {
    const next = logoClicks + 1
    setLogoClicks(next)
    if (next >= ADMIN_CLICK_COUNT) {
      setIsAdmin(true)
      setLogoClicks(0)
    }
  }

  const sendMessage = () => {
    if (!input.trim()) return
    setMessages((prev) => [
      ...prev,
      { from: isAdmin ? "admin" : "client", text: input.trim(), time: now() },
    ])
    setInput("")
  }

  return (
    <section id="contacts" className="relative z-20 px-8 py-20 pb-32">
      <h2 className="text-2xl font-light text-green-900 dark:text-green-200 mb-2 uppercase tracking-widest">
        <span
          className="cursor-default select-none"
          onClick={handleLogoClick}
          title=""
        >
          Контакты
        </span>
      </h2>
      <p className="text-xs text-green-800/60 dark:text-green-300/60 mb-8">Мы всегда на связи</p>

      <div className="flex flex-col md:flex-row gap-6 items-start">
        <div className="flex flex-col gap-4">
          <a
            href="https://max.ru/join/6vA9eQ-0nmP55CTnB5MfnYQ4zmW253WY_fukBZuK5lU"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/30 dark:bg-black/30 backdrop-blur-sm border border-green-200/40 dark:border-green-800/40 text-green-900 dark:text-green-200 text-sm hover:bg-green-100/40 dark:hover:bg-green-900/30 transition-all"
          >
            <Icon name="MessageCircle" size={16} />
            MAX
          </a>
          <a
            href="https://t.me/ARTSANDCRAFTING"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/30 dark:bg-black/30 backdrop-blur-sm border border-green-200/40 dark:border-green-800/40 text-green-900 dark:text-green-200 text-sm hover:bg-green-100/40 dark:hover:bg-green-900/30 transition-all"
          >
            <Icon name="Send" size={16} />
            Telegram
          </a>
          <a
            href="tel:89027246061"
            className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/30 dark:bg-black/30 backdrop-blur-sm border border-green-200/40 dark:border-green-800/40 text-green-900 dark:text-green-200 text-sm hover:bg-green-100/40 dark:hover:bg-green-900/30 transition-all"
          >
            <Icon name="Phone" size={16} />
            8 902 724-60-61
          </a>

          <button
            onClick={() => setChatOpen(true)}
            className="flex items-center gap-3 px-6 py-3 rounded-full bg-green-700 dark:bg-green-600 text-white text-sm hover:bg-green-800 dark:hover:bg-green-500 transition-all"
          >
            <Icon name="MessagesSquare" size={16} />
            Написать в чат
          </button>
        </div>
      </div>

      {/* Chat Modal */}
      {chatOpen && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl flex flex-col overflow-hidden" style={{ height: "480px" }}>
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-green-700 dark:bg-green-800">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-300 animate-pulse" />
                <span
                  className="text-white text-sm font-semibold cursor-default select-none"
                  onClick={handleLogoClick}
                >
                  АРТС&amp;КРАФТИНГ
                </span>
                {isAdmin && (
                  <span className="text-green-300 text-xs ml-1">[Админ]</span>
                )}
              </div>
              <button onClick={() => setChatOpen(false)} className="text-white/70 hover:text-white transition-colors">
                <Icon name="X" size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex flex-col ${msg.from === "client" ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm ${
                      msg.from === "client"
                        ? "bg-green-600 text-white rounded-br-sm"
                        : "bg-green-100 dark:bg-zinc-800 text-green-900 dark:text-green-200 rounded-bl-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-xs text-zinc-400 mt-1 px-1">{msg.time}</span>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="flex gap-2 p-3 border-t border-green-100 dark:border-zinc-800">
              <input
                className="flex-1 rounded-full px-4 py-2 text-sm bg-green-50 dark:bg-zinc-800 text-green-900 dark:text-green-100 outline-none border border-green-200 dark:border-zinc-700 focus:border-green-500"
                placeholder="Сообщение..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button
                onClick={sendMessage}
                className="w-9 h-9 rounded-full bg-green-700 flex items-center justify-center text-white hover:bg-green-800 transition-colors"
              >
                <Icon name="Send" size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

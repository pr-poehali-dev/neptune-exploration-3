import { useState, useRef, useEffect } from "react"
import Icon from "@/components/ui/icon"

interface Message {
  id: number
  from: "client" | "admin"
  text: string
  time: string
  read: boolean
}

const STORAGE_KEY = "ac_chat_messages"

function getTime() {
  return new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : [
      { id: 1, from: "admin", text: "Привет! Чем могу помочь? 🌿", time: getTime(), read: true },
    ]
  })
  const [input, setInput] = useState("")
  const [bounce, setBounce] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  const unread = messages.filter(m => m.from === "admin" && !m.read).length

  useEffect(() => {
    if (!open) {
      const timer = setTimeout(() => setBounce(true), 3000)
      const timer2 = setTimeout(() => setBounce(false), 4000)
      return () => { clearTimeout(timer); clearTimeout(timer2) }
    }
  }, [open])

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" })
      setMessages(prev => prev.map(m => m.from === "admin" ? { ...m, read: true } : m))
    }
  }, [open, messages.length])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages))
  }, [messages])

  const sendMessage = () => {
    if (!input.trim()) return
    const msg: Message = { id: Date.now(), from: "client", text: input.trim(), time: getTime(), read: false }
    setMessages(prev => [...prev, msg])
    setInput("")
  }

  return (
    <>
      {/* Chat window */}
      {open && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-zinc-800 flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300" style={{ maxHeight: "70vh" }}>
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3.5 bg-green-700 dark:bg-green-800">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <span className="text-white text-xs font-bold">А</span>
            </div>
            <div className="flex-1">
              <p className="text-white text-sm font-semibold">АРТС&amp;КРАФТИНГ</p>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-300 animate-pulse" />
                <span className="text-green-200 text-xs">Онлайн</span>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/60 hover:text-white transition-colors">
              <Icon name="X" size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 min-h-0">
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.from === "client" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[78%] flex flex-col ${msg.from === "client" ? "items-end" : "items-start"}`}>
                  <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.from === "client"
                      ? "bg-green-600 text-white rounded-br-sm"
                      : "bg-gray-100 dark:bg-zinc-800 text-gray-800 dark:text-gray-200 rounded-bl-sm"
                  }`}>
                    {msg.text}
                  </div>
                  <span className="text-[11px] text-gray-400 mt-1 px-1">{msg.time}</span>
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="flex gap-2 p-3 border-t border-gray-100 dark:border-zinc-800">
            <input
              className="flex-1 rounded-xl px-4 py-2.5 text-sm bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-zinc-700 outline-none focus:border-green-500 transition-colors"
              placeholder="Написать сообщение..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="w-10 h-10 rounded-xl bg-green-600 flex items-center justify-center text-white hover:bg-green-700 transition-colors flex-shrink-0"
            >
              <Icon name="Send" size={15} />
            </button>
          </div>
        </div>
      )}

      {/* FAB Button */}
      <button
        onClick={() => setOpen(!open)}
        className={`fixed bottom-6 right-4 sm:right-6 z-50 w-14 h-14 rounded-full bg-green-600 text-white shadow-xl hover:bg-green-700 transition-all duration-300 flex items-center justify-center ${bounce ? "scale-110" : "scale-100"}`}
      >
        {open ? (
          <Icon name="X" size={22} />
        ) : (
          <Icon name="MessageCircle" size={22} />
        )}
        {!open && unread > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
            {unread}
          </span>
        )}
      </button>
    </>
  )
}

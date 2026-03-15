import { useState, useRef, useEffect } from "react"
import Icon from "@/components/ui/icon"

const ADMIN_PASSWORD = "artscraft2025"

interface Message {
  id: number
  from: "client" | "admin"
  text: string
  time: string
  read: boolean
}

const STORAGE_KEY = "ac_chat_messages"
const ADMIN_STORAGE_KEY = "ac_admin_auth"

function getTime() {
  return new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })
}

function getDate() {
  return new Date().toLocaleDateString("ru-RU", { day: "numeric", month: "long" })
}

export default function Admin() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(ADMIN_STORAGE_KEY) === "1")
  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState(false)
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : [
      { id: 1, from: "admin", text: "Привет! Чем могу помочь? 🌿", time: getTime(), read: true },
    ]
  })
  const [input, setInput] = useState("")
  const [activeTab, setActiveTab] = useState<"chat" | "info">("chat")
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages))
  }, [messages])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
    if (authed) {
      setMessages(prev => prev.map(m => m.from === "client" ? { ...m, read: true } : m))
    }
  }, [messages.length, authed])

  const login = () => {
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem(ADMIN_STORAGE_KEY, "1")
      setAuthed(true)
    } else {
      setPasswordError(true)
      setTimeout(() => setPasswordError(false), 2000)
    }
  }

  const sendMessage = () => {
    if (!input.trim()) return
    const msg: Message = {
      id: Date.now(),
      from: "admin",
      text: input.trim(),
      time: getTime(),
      read: true,
    }
    setMessages(prev => [...prev, msg])
    setInput("")
  }

  const clearChat = () => {
    if (confirm("Очистить всю историю чата?")) {
      const initial: Message[] = [{ id: 1, from: "admin", text: "Привет! Чем могу помочь? 🌿", time: getTime(), read: true }]
      setMessages(initial)
    }
  }

  const unread = messages.filter(m => m.from === "client" && !m.read).length

  if (!authed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white dark:from-zinc-950 dark:to-zinc-900 flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-green-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-white text-xl font-bold">А</span>
            </div>
            <h1 className="text-xl font-bold text-green-950 dark:text-white">Панель управления</h1>
            <p className="text-sm text-green-700/60 mt-1">АРТС&amp;КРАФТИНГ</p>
          </div>

          <div className={`rounded-2xl bg-white dark:bg-zinc-900 shadow-xl border p-6 transition-all duration-300 ${passwordError ? "border-red-300 shake" : "border-green-100 dark:border-zinc-800"}`}>
            <label className="block text-xs font-medium text-green-800 dark:text-green-300 mb-2 uppercase tracking-wider">
              Пароль
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === "Enter" && login()}
              placeholder="Введите пароль"
              className="w-full px-4 py-3 rounded-xl border border-green-200 dark:border-zinc-700 bg-green-50 dark:bg-zinc-800 text-green-950 dark:text-green-100 text-sm outline-none focus:border-green-500 transition-colors mb-4"
            />
            {passwordError && (
              <p className="text-xs text-red-500 mb-3">Неверный пароль</p>
            )}
            <button
              onClick={login}
              className="w-full py-3 rounded-xl bg-green-600 text-white font-semibold text-sm hover:bg-green-700 transition-colors"
            >
              Войти
            </button>
          </div>

          <p className="text-center text-xs text-green-700/40 mt-6">
            <a href="/" className="hover:text-green-500 transition-colors">← Вернуться на сайт</a>
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex flex-col">
      {/* Top Bar */}
      <header className="bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center">
            <span className="text-white text-xs font-bold">А</span>
          </div>
          <div>
            <h1 className="text-sm font-bold text-gray-900 dark:text-white">Панель управления</h1>
            <p className="text-xs text-gray-400">АРТС&amp;КРАФТИНГ</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/"
            className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-green-600 transition-colors"
          >
            <Icon name="ExternalLink" size={13} />
            Сайт
          </a>
          <button
            onClick={() => { sessionStorage.removeItem(ADMIN_STORAGE_KEY); setAuthed(false) }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-gray-500 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20 transition-colors"
          >
            <Icon name="LogOut" size={13} />
            Выйти
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800 px-6">
        <div className="flex gap-0">
          {[
            { id: "chat", label: "Чат с клиентами", icon: "MessageSquare" as const },
            { id: "info", label: "Магазин", icon: "Store" as const },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as "chat" | "info")}
              className={`flex items-center gap-2 px-4 py-3.5 text-xs font-medium border-b-2 transition-all relative ${
                activeTab === tab.id
                  ? "border-green-500 text-green-600 dark:text-green-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              <Icon name={tab.icon} size={14} />
              {tab.label}
              {tab.id === "chat" && unread > 0 && (
                <span className="w-4 h-4 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center font-bold">
                  {unread}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden flex flex-col max-w-3xl mx-auto w-full px-4 py-6">

        {activeTab === "chat" && (
          <div className="flex flex-col h-full bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-sm overflow-hidden" style={{ minHeight: 0, maxHeight: "calc(100vh - 180px)" }}>
            {/* Chat header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
                  <Icon name="User" size={14} className="text-green-700 dark:text-green-300" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">Клиент</p>
                  <p className="text-xs text-gray-400">{getDate()}</p>
                </div>
              </div>
              <button onClick={clearChat} className="text-xs text-gray-400 hover:text-red-400 flex items-center gap-1 transition-colors">
                <Icon name="Trash2" size={13} />
                Очистить
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-3">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.from === "admin" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[75%] flex flex-col ${msg.from === "admin" ? "items-end" : "items-start"}`}>
                    <div className={`px-4 py-2.5 rounded-2xl text-sm ${
                      msg.from === "admin"
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
            <div className="flex gap-2 p-4 border-t border-gray-100 dark:border-zinc-800">
              <input
                className="flex-1 rounded-xl px-4 py-2.5 text-sm bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-zinc-700 outline-none focus:border-green-500 transition-colors"
                placeholder="Ответить клиенту..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && sendMessage()}
              />
              <button
                onClick={sendMessage}
                className="w-10 h-10 rounded-xl bg-green-600 flex items-center justify-center text-white hover:bg-green-700 transition-colors"
              >
                <Icon name="Send" size={15} />
              </button>
            </div>
          </div>
        )}

        {activeTab === "info" && (
          <div className="space-y-4">
            <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 p-6">
              <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Icon name="Info" size={16} className="text-green-500" />
                Информация о магазине
              </h2>
              <div className="space-y-3">
                {[
                  { label: "Название", value: "АРТС&КРАФТИНГ" },
                  { label: "Телефон", value: "8 902 724-60-61" },
                  { label: "Telegram", value: "@ARTSANDCRAFTING" },
                ].map(item => (
                  <div key={item.label} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-zinc-800 last:border-0">
                    <span className="text-xs text-gray-500 uppercase tracking-wide">{item.label}</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 p-6">
              <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Icon name="BarChart2" size={16} className="text-green-500" />
                Статистика чата
              </h2>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "Сообщений", value: messages.length },
                  { label: "От клиента", value: messages.filter(m => m.from === "client").length },
                  { label: "Непрочитано", value: unread },
                ].map(stat => (
                  <div key={stat.label} className="text-center p-4 rounded-xl bg-gray-50 dark:bg-zinc-800">
                    <p className="text-2xl font-bold text-green-600">{stat.value}</p>
                    <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl border border-green-100 dark:border-green-900/40 p-5 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-green-900 dark:text-green-200">Чат на сайте работает</p>
                <p className="text-xs text-green-700/60 dark:text-green-400/60 mt-0.5">Клиенты могут писать через кнопку на сайте</p>
              </div>
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

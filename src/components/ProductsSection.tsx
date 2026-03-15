import { useEffect, useRef, useState } from "react"

const products = [
  {
    title: "Нитки",
    description: "Широкий ассортимент для вышивки, вязания и шитья",
    image: "https://i.postimg.cc/3kZvfwx7/image_prod_1.jpg",
    tag: "Популярное",
  },
  {
    title: "Инструменты",
    description: "Иглы, крючки, спицы — всё для удобной работы",
    image: "https://i.postimg.cc/3kZvfwx7/image_prod_1.jpg",
    tag: "Новинки",
  },
  {
    title: "Пуговицы",
    description: "Сотни видов — от классических до дизайнерских",
    image: "https://i.postimg.cc/tsb6z6pT/image_prod_3.jpg",
    tag: "Хит",
  },
  {
    title: "Фурнитура",
    description: "Молнии, кнопки, ленты и всё для готового изделия",
    image: "https://i.postimg.cc/vHTfYK7g/IMG-20251015-WA0014.jpg",
    tag: "В наличии",
  },
]

function ProductCard({ product, index }: { product: typeof products[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="group relative overflow-hidden rounded-2xl bg-white/50 dark:bg-zinc-900/50 border border-green-100/60 dark:border-green-900/40 backdrop-blur-sm hover:shadow-2xl hover:shadow-green-500/10 hover:-translate-y-1 transition-all duration-300"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.6s ease ${index * 0.12}s, transform 0.6s ease ${index * 0.12}s`,
      }}
    >
      <div className="relative h-52 overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium bg-green-500/90 text-white backdrop-blur-sm">
          {product.tag}
        </span>
      </div>
      <div className="p-5">
        <h3 className="text-base font-semibold text-green-950 dark:text-green-100 mb-1">{product.title}</h3>
        <p className="text-xs text-green-800/60 dark:text-green-400/70 leading-relaxed">{product.description}</p>
        <a
          href="https://t.me/ARTSANDCRAFTING"
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors"
        >
          Узнать цену →
        </a>
      </div>
    </div>
  )
}

export default function ProductsSection() {
  const titleRef = useRef<HTMLDivElement>(null)
  const [titleVisible, setTitleVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setTitleVisible(true) }, { threshold: 0.2 })
    if (titleRef.current) obs.observe(titleRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="products" className="relative z-20 px-6 py-24 max-w-6xl mx-auto">
      <div
        ref={titleRef}
        className="mb-14"
        style={{
          opacity: titleVisible ? 1 : 0,
          transform: titleVisible ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
      >
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-green-500 mb-3">Ассортимент</p>
        <h2 className="text-3xl sm:text-4xl font-light text-green-950 dark:text-white mb-3">
          Наши <span className="font-semibold italic">товары</span>
        </h2>
        <p className="text-sm text-green-800/50 dark:text-green-400/60 max-w-md">
          Всё необходимое для вашего творчества — в одном месте
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {products.map((p, i) => (
          <ProductCard key={p.title} product={p} index={i} />
        ))}
      </div>
    </section>
  )
}

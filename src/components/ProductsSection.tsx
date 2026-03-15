const products = [
  {
    title: "Нитки",
    description: "Широкий ассортимент ниток для вышивки, вязания и шитья",
    image: "https://i.postimg.cc/3kZvfwx7/image_prod_1.jpg",
  },
  {
    title: "Инструменты",
    description: "Всё необходимое для комфортной работы: иглы, крючки, спицы",
    image: "https://i.postimg.cc/3kZvfwx7/image_prod_1.jpg",
  },
  {
    title: "Пуговицы",
    description: "Сотни видов пуговиц — от классических до дизайнерских",
    image: "https://i.postimg.cc/tsb6z6pT/image_prod_3.jpg",
  },
  {
    title: "Фурнитура",
    description: "Молнии, кнопки, крючки, ленты и всё для завершения изделия",
    image: "https://i.postimg.cc/vHTfYK7g/IMG-20251015-WA0014.jpg",
  },
]

export default function ProductsSection() {
  return (
    <section id="products" className="relative z-20 px-8 py-20">
      <h2 className="text-2xl font-light text-green-900 dark:text-green-200 mb-2 uppercase tracking-widest">
        Наши товары
      </h2>
      <p className="text-xs text-green-800/60 dark:text-green-300/60 mb-10">
        Всё для рукоделия в одном магазине
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((p) => (
          <div
            key={p.title}
            className="group rounded-2xl overflow-hidden bg-white/30 dark:bg-black/30 backdrop-blur-sm border border-green-200/40 dark:border-green-800/40 hover:scale-105 transition-transform duration-300"
          >
            <div className="h-44 overflow-hidden">
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="p-4">
              <h3 className="text-sm font-semibold text-green-900 dark:text-green-200 mb-1">{p.title}</h3>
              <p className="text-xs text-green-800/70 dark:text-green-300/70 leading-relaxed">{p.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

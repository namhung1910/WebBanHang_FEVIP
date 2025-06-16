import products from '../assets/data/products.json'

function ProductCard({ product }) {
  return (
    <div className="bg-white rounded shadow p-3 flex flex-col">
      <img src={product.image} alt={product.name} className="h-36 object-contain mb-2" />
      <div className="font-semibold">{product.name}</div>
      <div className="text-blue-600 font-bold">{product.price.toLocaleString()}₫</div>
      <button className="mt-2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition">
        Thêm vào giỏ
      </button>
    </div>
  )
}

export default function ProductGrid() {
  // Máy tính để bàn: category === 'PC'
  const pcProducts = products.filter(p => p.category === 'PC').slice(0, 4)
  // Laptop game và đồ họa: category === 'Gaming' hoặc (category === 'Laptop' và (tên chứa "game" hoặc "đồ họa" hoặc "gaming"))
  const gamingProducts = products.filter(
    p =>
      p.category === 'Gaming' ||
      (p.category === 'Laptop' &&
        /game|gaming|đồ họa/i.test(p.name))
  ).slice(0, 4)
  // Sản phẩm nổi bật: giữ nguyên
  const featuredProducts = products.slice(0, 8)

  return (
    <section>
      <h2 className="text-xl font-bold mb-4">Sản phẩm nổi bật</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {featuredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <h2 className="text-xl font-bold mb-4">Máy tính để bàn</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {pcProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <h2 className="text-xl font-bold mb-4">Laptop game và đồ họa</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {gamingProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}

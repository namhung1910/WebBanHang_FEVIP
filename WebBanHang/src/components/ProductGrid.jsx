import products from '../assets/data/products.json'

function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-xl shadow p-4 flex flex-col h-full min-h-[370px] max-w-xs mx-auto">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-40 object-contain mb-3 rounded"
        loading="lazy"
      />
      <div className="flex-1 flex flex-col">
        <div className="font-medium mb-1">{product.name}</div>
        <div className="text-blue-600 font-bold text-lg mb-4">
          {product.price.toLocaleString()}₫
        </div>
        <div className="mt-auto">
          <button className="mt-2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition w-full">
            Thêm vào giỏ
          </button>
        </div>
      </div>
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        {featuredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <h2 className="text-xl font-bold mb-4">Máy tính để bàn</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        {pcProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <h2 className="text-xl font-bold mb-4">Laptop game và đồ họa</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {gamingProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}

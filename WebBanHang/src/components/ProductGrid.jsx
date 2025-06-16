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

export default function ProductGrid({ products }) {
  if (!products || products.length === 0) {
    return <p className="text-gray-500">Không tìm thấy sản phẩm nào phù hợp.</p>
  }

  return (
    <section>
      <h2 className="text-xl font-bold mb-4">Danh sách sản phẩm</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}

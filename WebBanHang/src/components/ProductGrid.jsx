import ProductCard from './ProductCard'

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

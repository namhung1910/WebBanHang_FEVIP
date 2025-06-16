const brands = ['Dell', 'HP', 'ASUS', 'Lenovo', 'Acer', 'MacBook', 'MSI', 'Gigabyte']

export default function LaptopBrandBar({ onSelect, selected }) {
  return (
    <div className="bg-gray-100 py-2 px-4 overflow-x-auto whitespace-nowrap rounded-xl shadow mb-4 flex justify-center">
      <div className="flex gap-2">
        {brands.map((brand) => (
          <button
            key={brand}
            className={`bg-white border border-gray-300 rounded-full px-4 py-1 text-sm transition
              ${selected === brand ? 'bg-blue-600 text-white border-blue-600 shadow' : 'hover:bg-blue-500 hover:text-white'}
            `}
            onClick={() => onSelect?.(brand)}
            type="button"
          >
            {brand}
          </button>
        ))}
      </div>
    </div>
  )
}

export default function Sidebar() {
  return (
    <div>
      {/* Filters Section */}
      <aside className="bg-white p-4 rounded shadow hidden lg:block">
        <h2 className="text-xl font-bold mb-4">Filters</h2>

        {/* Car Type Filter */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Type</label>
          <select className="w-full border rounded p-2">
            <option value="">All Types</option>
            <option value="Sport">Sport</option>
            <option value="SUV">SUV</option>
            <option value="MPV">MPV</option>
            <option value="Sedan">Sedan</option>
            <option value="Coupe">Coupe</option>
            <option value="Hatchback">Hatchback</option>
          </select>
        </div>

        {/* Capacity Filter */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Capacity</label>
          <select className="w-full border rounded p-2">
            <option value="">All Capacities</option>
            <option value="2 Person">2 Person</option>
            <option value="4 Person">4 Person</option>
            <option value="6 Person">6 Person</option>
          </select>
        </div>

        {/* Price Filter */}
        <div>
          <label className="block text-sm font-medium mb-2">Price</label>
          <input type="range" className="w-full" min="0" max="100" />
          <div className="text-sm mt-2">Max: $100.00</div>
        </div>
      </aside>
    </div>
  );
}
export default function CollectionGrid() {
  return (
    <section className="w-full bg-transparent p-18">
      <div className="mx-auto h-100  grid grid-cols-1 gap-6 lg:grid-cols-3">
        
        <div className="lg:col-span-2 bg-green-200 rounded-xl p-6 flex items-center justify-between">
          
          <div>
            <h2 className="text-xl font-semibold tracking-wide">
              WOMEN COLLECTION
            </h2>
            <button className="mt-4 rounded-md bg-gray-600 px-6 py-2 text-sm text-white">
              Shop Now
            </button>
          </div>

          <div className="w-48 h-72 bg-gray-300 rounded-md flex items-center justify-center">
            <div className="w-32 h-58 border-2 border-gray-400" />
          </div>
        </div>

        <div className="grid gap-6">
          
          <div className="bg-yellow-200 rounded-xl p-6 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold tracking-wide">
                MEN COLLECTION
              </h2>
              <button className="mt-4 rounded-md bg-gray-600 px-5 py-2 text-sm text-white">
                Shop Now
              </button>
            </div>

            <div className="w-24 h-24 bg-gray-300 rounded-md" />
          </div>

          <div className="grid grid-cols-2 gap-6">
            
            <div className="bg-red-200 rounded-xl p-6">
              <h2 className="text-base font-semibold tracking-wide">
                KIDS COLLECTION
              </h2>
              <button className="mt-4 rounded-md bg-gray-600 px-4 py-2 text-sm text-white">
                Shop Now
              </button>
              <div className="mt-4 h-20 bg-gray-300 rounded-md" />
            </div>

            <div className="bg-blue-200 rounded-xl p-6">
              <h2 className="text-base font-semibold tracking-wide">
                GIFT CARDS
              </h2>
              <div className="mt-3 space-y-2">
                <div className="h-2 w-full bg-gray-400 rounded" />
                <div className="h-2 w-3/4 bg-gray-400 rounded" />
                <div className="h-2 w-1/2 bg-gray-400 rounded" />
              </div>
              <button className="mt-4 rounded-md bg-gray-600 px-4 py-2 text-sm text-white">
                Shop Now
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

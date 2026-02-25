import Link from "next/link";
import Image from "next/image";

export default function CollectionGrid() {
  return (
    <section className="w-full bg-transparent p-6 lg:p-12">
      <div className="mx-auto grid grid-cols-1 gap-6 lg:grid-cols-3">

        {/* Women Collection */}
        <Link href="/category/fashion" className="lg:col-span-2 relative h-[300px] lg:h-[400px] overflow-hidden rounded-2xl group cursor-pointer block">
          <Image
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            alt="Women Collection"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
          <div className="absolute inset-0 flex flex-col justify-center items-start p-8 lg:p-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white tracking-wide mb-2 drop-shadow-md">
              WOMEN COLLECTION
            </h2>
            <p className="text-white/90 mb-6 max-w-sm drop-shadow-sm">Discover the latest trends in women&apos;s fashion.</p>
            <div className="rounded-full bg-white px-8 py-3 text-sm font-bold text-black hover:bg-gray-100 transition-all shadow-lg">
              Shop Now
            </div>
          </div>
        </Link>

        <div className="flex flex-col gap-6 h-full">

          {/* Men Collection */}
          <Link href="/category/fashion" className="relative h-[200px] lg:flex-1 overflow-hidden rounded-2xl group cursor-pointer block">
            <Image
              src="https://images.unsplash.com/photo-1617137968427-85924c809a10?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Men Collection"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
            <div className="absolute inset-0 flex flex-col justify-center items-start p-6">
              <h2 className="text-2xl font-bold text-white tracking-wide drop-shadow-md">
                MEN COLLECTION
              </h2>
              <div className="mt-4 rounded-full bg-white px-6 py-2 text-xs font-bold text-black hover:bg-gray-100 transition-all shadow-lg">
                Shop Now
              </div>
            </div>
          </Link>

          <div className="grid grid-cols-2 gap-6 h-[200px]">

            {/* Kids Collection */}
            <Link href="/category/fashion" className="relative overflow-hidden rounded-2xl group cursor-pointer block">
              <Image
                src="https://images.unsplash.com/photo-1519457431-44ccd64a579b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Kids Collection"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
              <div className="absolute inset-0 flex flex-col justify-end p-4">
                <h2 className="text-lg font-bold text-white tracking-wide drop-shadow-md">
                  KIDS
                </h2>
                <div className="mt-2 text-left text-xs text-white underline underline-offset-4 hover:text-gray-200">
                  Shop Now
                </div>
              </div>
            </Link>

            {/* Accessories / Gift Cards */}
            <Link href="/category/electronics" className="relative overflow-hidden rounded-2xl group cursor-pointer block">
              <Image
                src="https://images.unsplash.com/photo-1592906209472-a36b1f3782ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Accessories"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
              <div className="absolute inset-0 flex flex-col justify-end p-4">
                <h2 className="text-lg font-bold text-white tracking-wide drop-shadow-md">
                  ACCESSORIES
                </h2>
                <div className="mt-2 text-left text-xs text-white underline underline-offset-4 hover:text-gray-200">
                  Shop Now
                </div>
              </div>
            </Link>

          </div>
        </div>

      </div>
    </section>
  );
}


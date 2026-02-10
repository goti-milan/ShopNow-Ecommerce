import { Product } from "@/utils/types";
import Image from "next/image";


const ProductCard = ({ item }: { item: Product }) => {
    const { badgeText, title, price, originalPrice, discountPercent } = item
    return (
        <div className="group w-full max-w-60 rounded-md border border-gray-200 bg-white p-3
  transition-all duration-300 ease-out
  hover:-translate-y-1 hover:shadow-2xl">


            {/* Image Wrapper */}
            <div className="relative flex h-fit items-center justify-center rounded-lg bg-gray-50">
                {badgeText && (
                    <span className="absolute left-2 top-2 z-10 rounded-full bg-red-500 px-2 py-0.5 text-xs font-medium text-white">
                        {badgeText}
                    </span>
                )}

                <Image
                    src="https://picsum.photos/seed/picsum/600/800"
                    alt={title}
                    width={160}
                    height={240}
                    className="object-contain transition-transform duration-300 group-hover:scale-105"
                />
            </div>

            {/* Content */}
            <div className="mt-3 space-y-1">
                <h4 className="line-clamp-3 h-16 text-sm font-medium text-gray-900">
                    {title}
                </h4>

                {/* Price */}
                <div className="flex items-center gap-2">
                    <span className="text-base font-semibold text-gray-900">
                        ₹{price.toLocaleString()}
                    </span>

                    {originalPrice && (
                        <span className="text-xs text-gray-400 line-through">
                            ₹{originalPrice.toLocaleString()}
                        </span>
                    )}
                </div>

                {/* Discount */}
                {discountPercent && (
                    <p className="text-xs font-medium text-green-600">
                        ({discountPercent}% OFF)
                    </p>
                )}
            </div>
        </div>
    );
};

export default ProductCard;

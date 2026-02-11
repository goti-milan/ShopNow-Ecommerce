import { Product } from "@/utils/types";
import Image from "next/image";


const ProductCard = ({ item }: { item: Product }) => {
    const { badgeText, title, price, originalPrice, discountPercent } = item
    return (
        <div className="group w-full max-w-60 rounded-xl bg-card p-4 transition-all duration-300 ease-out hover:shadow-hover hover:-translate-y-1">

            {/* Image Wrapper */}
            <div className="relative flex h-[240px] items-center justify-center rounded-lg bg-transparent overflow-hidden">
                {badgeText && (
                    <span className="absolute left-2 top-2 z-10 rounded-full bg-destructive px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-destructive-foreground shadow-sm">
                        {badgeText}
                    </span>
                )}

                <Image
                    src="https://picsum.photos/seed/picsum/600/800"
                    alt={title}
                    fill
                    className="object-contain transition-transform duration-500 group-hover:scale-110"
                />
            </div>

            {/* Content */}
            <div className="mt-4 space-y-2">
                <h4 className="line-clamp-2 h-10 text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    {title}
                </h4>

                <div className="flex items-baseline justify-between">
                    {/* Price */}
                    <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-foreground">
                            ₹{price.toLocaleString()}
                        </span>

                        {originalPrice && (
                            <span className="text-xs text-muted-foreground line-through">
                                ₹{originalPrice.toLocaleString()}
                            </span>
                        )}
                    </div>

                    {/* Discount */}
                    {discountPercent && (
                        <p className="text-xs font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded-sm">
                            {discountPercent}% OFF
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;

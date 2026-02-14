import { PRODUCTS } from "@/utils/static-data";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Heart, Share2, ShoppingCart, Star } from "lucide-react";
import SectionHeader from "@/components/common/SectionHeader";
import ProductCard from "@/components/common/Product";

export default function ProductPage({ params }: { params: { id: string } }) {
    const product = PRODUCTS.find((p) => p.id === parseInt(params.id));

    if (!product) {
        notFound();
    }

    const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 5);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                {/* Left: Product Image */}
                <div className="relative aspect-square bg-white rounded-3xl overflow-hidden border border-border group">
                    <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-contain p-8 transition-transform duration-500 group-hover:scale-105"
                        priority
                    />
                    {product.badgeText && (
                        <div className="absolute top-4 left-4 bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                            {product.badgeText}
                        </div>
                    )}
                </div>

                {/* Right: Product Info */}
                <div className="flex flex-col justify-center space-y-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2 text-sm text-muted-foreground">
                            <div className="flex items-center text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-current" />
                                ))}
                            </div>
                            <span>(120 Reviews)</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
                            {product.title}
                        </h1>
                        <div className="flex items-center gap-4">
                            <span className="text-3xl font-bold text-primary">₹{product.price.toLocaleString()}</span>
                            {product.originalPrice && (
                                <span className="text-xl text-muted-foreground line-through">
                                    ₹{product.originalPrice.toLocaleString()}
                                </span>
                            )}
                            {product.discountPercent && (
                                <span className="bg-green-100 text-green-700 px-2 py-1 rounded-md text-sm font-bold">
                                    {product.discountPercent}% OFF
                                </span>
                            )}
                        </div>
                    </div>

                    <p className="text-muted-foreground leading-relaxed text-lg">
                        Experience premium quality and exceptional performance with our latest {product.title}.
                        Designed for those who demand the best, this product combines cutting-edge technology
                        with sophisticated design. Perfect for everyday use and special occasions alike.
                    </p>

                    <div className="space-y-4 pt-4 border-t border-border">
                        <div className="flex flex-wrap gap-4">
                            <Button className="flex-1 h-14 text-lg bg-primary hover:bg-primary-dark transition-all duration-300 rounded-full shadow-lg shadow-primary/20">
                                <ShoppingCart className="mr-2 h-5 w-5" />
                                Add to Cart
                            </Button>
                            <Button variant="outline" className="h-14 w-14 rounded-full border-2 hover:bg-destructive/5 hover:text-destructive hover:border-destructive transition-all duration-300">
                                <Heart className="h-6 w-6" />
                            </Button>
                            <Button variant="outline" className="h-14 w-14 rounded-full border-2 hover:bg-primary/5 hover:text-primary hover:border-primary transition-all duration-300">
                                <Share2 className="h-6 w-6" />
                            </Button>
                        </div>
                        <Button variant="secondary" className="w-full h-14 text-lg rounded-full">
                            Buy It Now
                        </Button>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm pt-6">
                        <div className="p-4 bg-muted/30 rounded-2xl flex items-center gap-3">
                            <div className="w-10 h-10 bg-background rounded-full flex items-center justify-center">🚚</div>
                            <div>
                                <p className="font-semibold">Free Shipping</p>
                                <p className="text-xs text-muted-foreground">Orders over ₹999</p>
                            </div>
                        </div>
                        <div className="p-4 bg-muted/30 rounded-2xl flex items-center gap-3">
                            <div className="w-10 h-10 bg-background rounded-full flex items-center justify-center">🛡️</div>
                            <div>
                                <p className="font-semibold">1 Year Warranty</p>
                                <p className="text-xs text-muted-foreground">Genuine Brand</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Related Products */}
            <div className="mt-20 pt-12 border-t border-border">
                <SectionHeader title="Related Products" subtitle="You might also like these items" />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mt-10">
                    {relatedProducts.map((item) => (
                        <div key={item.id} className="flex justify-center">
                            <ProductCard item={item} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

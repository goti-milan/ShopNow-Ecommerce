import Image from "next/image";
import Link from "next/link";

type CategoryCardProps = {
    title: string;
    discount: string;
    image: string;
    slug: string;
};

const CategoryCard = ({ title, discount, image, slug }: CategoryCardProps) => {
    return (
        <Link href={`/category/${slug}`} className="group relative h-90 overflow-hidden rounded-2xl bg-secondary cursor-pointer block">
            {/* Image */}
            <Image
                src={image}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />

            {/* Content */}
            <div className="absolute bottom-0 p-5 w-full">
                <p className="text-sm text-white/80 tracking-wide">
                    {title}
                </p>

                <h3 className="mt-1 text-2xl font-semibold text-white leading-tight">
                    {discount}
                </h3>

                <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90">
                    Shop Now
                    <span className="text-base">→</span>
                </div>
            </div>
        </Link>
    );
};

export default CategoryCard;


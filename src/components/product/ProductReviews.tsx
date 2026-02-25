"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface Review {
    id: string;
    userName: string;
    userAvatar?: string;
    rating: number;
    date: string;
    comment: string;
    images?: string[];
}

interface ProductReviewsProps {
    reviews?: Review[];
}

const mockReviews: Review[] = [
    {
        id: "1",
        userName: "Alex Johnson",
        rating: 5,
        date: "2 days ago",
        comment: "Absolutely love this product! The quality is outstanding and it exceeded all my expectations. Highly recommend to anyone looking for something premium.",
    },
    {
        id: "2",
        userName: "Sarah Miller",
        rating: 4,
        date: "1 week ago",
        comment: "Solid performance and beautiful design. The packaging was top-notch. Only reason for 4 stars is that delivery took a day longer than expected.",
    },
    {
        id: "3",
        userName: "Michael Chen",
        rating: 5,
        date: "2 weeks ago",
        comment: "The attention to detail is incredible. I've been using it daily and it still looks and feels brand new. Truly worth every penny.",
    }
];

export const ProductReviews = ({ reviews = mockReviews }: ProductReviewsProps) => {
    return (
        <section className="mt-24">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight mb-4">Customer Reviews</h2>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                    key={star}
                                    className={cn(
                                        "w-5 h-5",
                                        star <= 4.8 ? "fill-amber-400 text-amber-400" : "text-slate-200"
                                    )}
                                />
                            ))}
                        </div>
                        <span className="text-xl font-bold text-slate-900">4.8 out of 5</span>
                        <span className="text-slate-500 font-medium">({reviews.length} total reviews)</span>
                    </div>
                </div>

                <button className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-primary transition-all shadow-lg shadow-slate-200 active:scale-95 text-sm uppercase tracking-widest">
                    Write a Review
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reviews.map((review) => (
                    <div key={review.id} className="bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 font-bold text-lg">
                                    {review.userName.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900">{review.userName}</h4>
                                    <p className="text-xs text-slate-400 font-semibold uppercase">{review.date}</p>
                                </div>
                            </div>
                            <div className="bg-green-50 text-green-700 px-2 py-1 rounded-lg text-xs font-black flex items-center gap-1">
                                {review.rating}.0 <Star className="w-3 h-3 fill-green-700" />
                            </div>
                        </div>
                        <p className="text-slate-600 leading-relaxed text-sm italic">
                            &quot;{review.comment}&quot;
                        </p>

                        <div className="mt-6 pt-6 border-t border-slate-50 flex items-center gap-4">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Verified Purchase</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-12 flex justify-center">
                <button className="text-sm font-bold text-primary hover:underline uppercase tracking-widest px-6 py-3">
                    View All Reviews
                </button>
            </div>
        </section>
    );
};

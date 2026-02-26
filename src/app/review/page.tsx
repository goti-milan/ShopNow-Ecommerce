import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const reviews = [
    {
        id: 1,
        name: "Alice Johnson",
        rating: 5,
        comment: "Absolutely love the quality of products! Shipping was super fast too.",
        date: "2 days ago",
        avatar: "AJ",
    },
    {
        id: 2,
        name: "Mark Smith",
        rating: 4,
        comment: "Great experience overall. Customer service helped me with my return quickly.",
        date: "1 week ago",
        avatar: "MS",
    },
    {
        id: 3,
        name: "Emily Davis",
        rating: 5,
        comment: "Found exactly what I was looking for. The website is so easy to navigate.",
        date: "2 weeks ago",
        avatar: "ED",
    },
];

export default function ReviewPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">Customer Reviews</h1>
                <div className="flex justify-center items-center gap-2 mb-2">
                    <div className="flex text-yellow-500">
                        <Star className="w-6 h-6 fill-current" />
                        <Star className="w-6 h-6 fill-current" />
                        <Star className="w-6 h-6 fill-current" />
                        <Star className="w-6 h-6 fill-current" />
                        <Star className="w-6 h-6 fill-current" />
                    </div>
                    <span className="text-2xl font-bold">4.8</span>
                </div>
                <p className="text-muted-foreground">Based on 1,234 reviews</p>
            </div>

            <div className="grid gap-6">
                {reviews.map((review) => (
                    <div key={review.id} className="bg-card border rounded-xl p-6 shadow-sm">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-4">
                                <Avatar>
                                    <AvatarFallback>{review.avatar}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <h3 className="font-bold">{review.name}</h3>
                                    <p className="text-xs text-muted-foreground">{review.date}</p>
                                </div>
                            </div>
                            <div className="flex text-yellow-500">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'text-gray-300'}`}
                                    />
                                ))}
                            </div>
                        </div>
                        <p className="text-muted-foreground">{review.comment}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function AboutUsPage() {
    return (
        <div>
            {/* Hero Section */}
            <section className="bg-muted/30 py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">About ShopNow</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        We are identifying the best products in the world and making them accessible to everyone.
                    </p>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-20 container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="relative h-[400px] rounded-xl overflow-hidden bg-muted">
                        <Image
                            src="https://picsum.photos/seed/office/800/600"
                            alt="Our Office"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                        <p className="text-muted-foreground mb-4">
                            Founded in 2024, ShopNow started with a simple mission: to provide high-quality products at affordable prices. What began as a small local shop has now grown into a global e-commerce platform serving customers in over 50 countries.
                        </p>
                        <p className="text-muted-foreground mb-6">
                            We believe in sustainable shopping and work closely with manufacturers to ensure ethical production practices. Our team is passionate about technology, design, and customer service.
                        </p>

                        <div className="space-y-3 mb-8">
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="text-primary w-5 h-5" />
                                <span>100% Authentic Products</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="text-primary w-5 h-5" />
                                <span>24/7 Customer Support</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="text-primary w-5 h-5" />
                                <span>Fast & Secure Shipping</span>
                            </div>
                        </div>

                        <Link href="/contactus">
                            <Button size="lg" variant="outline" className="gap-2">
                                Contact Us <ArrowRight className="w-4 h-4" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="bg-primary text-primary-foreground py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-4xl font-bold mb-2">50K+</div>
                            <div className="opacity-80">Happy Customers</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold mb-2">100+</div>
                            <div className="opacity-80">Top Brands</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold mb-2">12</div>
                            <div className="opacity-80">Countries Served</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold mb-2">4.9</div>
                            <div className="opacity-80">Average Rating</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-20 container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
                    <p className="text-muted-foreground">The people behind the magic</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="text-center group">
                            <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden">
                                <Image
                                    src={`https://picsum.photos/seed/person${i}/200/200`}
                                    alt="Team Member"
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>
                            <h3 className="font-bold text-xl">
                                {i === 1 ? "Alex Morgan" : i === 2 ? "Sarah Smith" : "Mike Jones"}
                            </h3>
                            <p className="text-muted-foreground">
                                {i === 1 ? "CEO & Founder" : i === 2 ? "Head of Design" : "CTO"}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

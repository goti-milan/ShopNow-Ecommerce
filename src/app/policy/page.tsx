import Link from 'next/link';

export default function PolicyHub() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-3xl font-bold mb-8">ShopNow Policies</h1>
            <ul className="list-disc list-inside space-y-4 text-lg text-muted-foreground">
                <li>
                    <Link href="/policy/terms" className="text-primary hover:underline">
                        Terms & Conditions
                    </Link>
                </li>
                <li>
                    <Link href="/policy/privacy" className="text-primary hover:underline">
                        Privacy Policy
                    </Link>
                </li>
                <li>
                    <Link href="/policy/return" className="text-primary hover:underline">
                        Return Policy
                    </Link>
                </li>
                <li>
                    <Link href="/policy/payment" className="text-primary hover:underline">
                        Payment Policy
                    </Link>     
            </li>
            </ul>
        </div>
    );
}

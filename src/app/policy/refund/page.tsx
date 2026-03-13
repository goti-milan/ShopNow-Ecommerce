export default function RefundPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-4">Return & Refund Policy</h1>
                <p className="text-lg text-muted-foreground">Last updated: {new Date().getFullYear()}-10-01</p>
            </div>

            <div className="prose prose-slate max-w-none">
                <h2>1. Return Eligibility</h2>
                <ul>
                    <li>Products must be unused, in original packaging.</li>
                    <li>Return window: 7 days for electronics, 15 days for fashion/home, 30 days for books/beauty.</li>
                    <li>Non-returnable: Personalized items, undergarments, downloaded software.</li>
                </ul>

                <h2>2. Refund Process</h2>
                <ol>
                    <li>{"Go to Account > Orders > Request Return."}</li>
                    <li>Select reason and upload photos if required.</li>
                    <li>Seller approves (48 hours), print label or self-ship.</li>
                    <li>Refund processed within 5-7 business days after inspection.</li>
                </ol>

                <h2>3. Refund Methods</h2>
                <ul>
                    <li>Original payment method or ShopNow Wallet credit.</li>
                    <li>Shipping fees non-refundable unless seller fault.</li>
                    <li>Partial refunds for damaged items.</li>
                </ul>

                <h2>4. Services Booking Refunds</h2>
                <p>Cancellations: 100% refund if 24+ hours before appointment, 50% within 24 hours, no refund after start.</p>

                <h2>5. Seller Refunds</h2>
                <p>Sellers handle buyer refunds. Disputes resolved via ShopNow support.</p>

                <p className="text-sm text-muted-foreground mt-12 pt-8 border-t">
                    Track returns in your account. Contact support for issues.
                </p>
            </div>
        </div>
    );
}


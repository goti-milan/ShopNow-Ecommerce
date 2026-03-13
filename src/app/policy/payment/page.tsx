export default function PaymentPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-4">Payment & Wallet Policy</h1>
                <p className="text-lg text-muted-foreground">Last updated: {new Date().getFullYear()}-10-01</p>
            </div>

            <div className="prose prose-slate max-w-none">
                <h2>1. Accepted Payment Methods</h2>
                <ul>
                    <li>Credit/Debit Cards (Visa, MasterCard, Amex)</li>
                    <li>ShopNow Wallet</li>
                    <li>UPI, Net Banking, PayPal</li>
                </ul>

                <h2>2. Security</h2>
                <p>All payments processed via PCI-DSS compliant gateways. We do not store full card details.</p>

                <h2>3. ShopNow Wallet</h2>
                <ul>
                    <li>Add money via cards/bank transfer.</li>
                    <li>5% cashback on wallet payments.</li>
                    <li>Refunds credited to wallet instantly.</li>
                    <li>Minimum withdrawal: $10, to bank account (KYC required).</li>
                    <li>Funds expire after 2 years inactivity.</li>
                </ul>

                <h2>4. Failed Payments</h2>
                <p>Retry or use alternate method. Failed payment fees may apply for repeated failures.</p>

                <h2>5. Taxes & Fees</h2>
                <p>Displayed at checkout. All prices exclude tax unless stated.</p>

                <h2>6. Chargebacks</h2>
                <p>Unauthorized chargebacks result in account suspension.</p>

                <p className="text-sm text-muted-foreground mt-12 pt-8 border-t">
          {"Manage payments in Account > Payment Methods."}
                </p>
            </div>
        </div>
    );
}


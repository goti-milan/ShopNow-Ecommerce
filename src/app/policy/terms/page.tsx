export default function TermsPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-4">Terms & Conditions</h1>
                <p className="text-lg text-muted-foreground">Last updated: {new Date().getFullYear()}-10-01</p>
            </div>

            <div className="prose prose-slate max-w-none">
                <h2>1. Introduction</h2>
                <p>Welcome to ShopNow. These Terms and Conditions govern your use of our website and services. By using ShopNow, you agree to these terms.</p>

                <h2>2. User Accounts</h2>
                <p>You must be 18 years or older to create an account. You are responsible for maintaining the confidentiality of your account.</p>

                <h2>3. Products and Services</h2>
                <ul>
                    <li>Product descriptions are provided by sellers. ShopNow is a marketplace platform.</li>
                    <li>All sales are final unless covered by our Return Policy.</li>
                    <li>Services (booking) are provided by third-party professionals.</li>
                </ul>

                <h2>4. Orders and Payments</h2>
                <p>Orders are fulfilled by sellers. See Payment Policy for payment terms. ShopNow Wallet can be used for payments with cashback rewards.</p>

                <h2>5. Seller Responsibilities</h2>
                <p>Sellers must comply with product quality standards, timely delivery, and accurate listings.</p>

                <h2>6. Prohibited Activities</h2>
                <ul>
                    <li>No counterfeit goods, illegal products, or spam.</li>
                    <li>No abusive behavior in chat or reviews.</li>
                </ul>

                <h2>7. Limitation of Liability</h2>
                <p>ShopNow is not liable for seller products/services. Maximum liability is refund amount.</p>

                <h2>8. Governing Law</h2>
                <p>These terms are governed by laws of New York, USA.</p>

                <h2>9. Changes to Terms</h2>
                <p>We may update these terms. Continued use constitutes acceptance.</p>

                <p className="text-sm text-muted-foreground mt-12 pt-8 border-t">
                    Questions? Contact us at <a href="mailto:support@shopnow.com" className="text-primary hover:underline">support@shopnow.com</a>
                </p>
            </div>
        </div>
    );
}


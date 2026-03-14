export default function PrivacyPolicyPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
                <p className="text-lg text-muted-foreground">Last updated: {new Date().getFullYear()}-10-01</p>
            </div>

            <div className="prose prose-slate max-w-none">
                <h2>1. Overview</h2>
                <p>
                    This Privacy Policy explains how ShopNow collects, uses, shares, and protects your information when you use our
                    website, mobile experiences, and related services.
                </p>

                <h2>2. Information We Collect</h2>
                <ul>
                    <li>Account details: name, email, phone number, password (stored securely).</li>
                    <li>Order details: items purchased, delivery address, billing information, and order history.</li>
                    <li>Payment information: processed by payment providers; we do not store full card numbers.</li>
                    <li>Usage data: pages viewed, searches, clicks, device identifiers, and cookies.</li>
                    <li>Messages and reviews you submit via chat, support, or product reviews.</li>
                </ul>

                <h2>3. How We Use Your Information</h2>
                <ul>
                    <li>Provide and improve the ShopNow marketplace and services.</li>
                    <li>Process orders, payments, refunds, and customer support requests.</li>
                    <li>Prevent fraud, abuse, and unauthorized access.</li>
                    <li>Send transactional messages (order updates, security alerts) and marketing (where permitted).</li>
                </ul>

                <h2>4. Sharing of Information</h2>
                <p>We may share information with:</p>
                <ul>
                    <li>Sellers and service providers to fulfill your orders/bookings.</li>
                    <li>Payment processors and logistics partners for payment and delivery.</li>
                    <li>Analytics and security vendors to operate and protect the platform.</li>
                    <li>Authorities when required by law or to protect rights and safety.</li>
                </ul>

                <h2>5. Cookies and Tracking</h2>
                <p>
                    We use cookies and similar technologies to remember preferences, keep you signed in, personalize content, and
                    measure site performance. You can control cookies in your browser settings.
                </p>

                <h2>6. Data Retention</h2>
                <p>
                    We keep your information for as long as needed to provide services, comply with legal obligations, resolve disputes,
                    and enforce agreements.
                </p>

                <h2>7. Your Choices</h2>
                <ul>
                    <li>Update profile information in your account settings.</li>
                    <li>Opt out of marketing emails via the unsubscribe link.</li>
                    <li>Request access or deletion by contacting support (subject to legal requirements).</li>
                </ul>

                <h2>8. Security</h2>
                <p>
                    We use administrative, technical, and physical safeguards to protect your information. No method of transmission or
                    storage is 100% secure.
                </p>

                <h2>9. Contact</h2>
                <p className="text-sm text-muted-foreground mt-12 pt-8 border-t">
                    Questions or requests? Email <a href="mailto:support@shopnow.com" className="text-primary hover:underline">support@shopnow.com</a>.
                </p>
            </div>
        </div>
    );
}


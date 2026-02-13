export default function PolicyPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>

            <div className="prose prose-slate max-w-none">
                <p className="lead">
                    Last updated: February 12, 2024
                </p>

                <h2 className="text-xl font-bold mt-6 mb-4">1. Introduction</h2>
                <p>
                    Welcome to ShopNow. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights.
                </p>

                <h2 className="text-xl font-bold mt-6 mb-4">2. The Data We Collect</h2>
                <p>
                    We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-2">
                    <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
                    <li><strong>Contact Data</strong> includes billing address, delivery address, email address and telephone numbers.</li>
                    <li><strong>Financial Data</strong> includes bank account and payment card details (note: we do not store full card details).</li>
                    <li><strong>Transaction Data</strong> includes details about payments to and from you and other details of products you have purchased from us.</li>
                </ul>

                <h2 className="text-xl font-bold mt-6 mb-4">3. How We Use Your Data</h2>
                <p>
                    We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-2">
                    <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
                    <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                    <li>Where we need to comply with a legal or regulatory obligation.</li>
                </ul>

                <h2 className="text-xl font-bold mt-6 mb-4">4. Data Security</h2>
                <p>
                    We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed.
                </p>
            </div>
        </div>
    );
}

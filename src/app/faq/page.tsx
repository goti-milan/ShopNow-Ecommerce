import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-3xl">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
                <p className="text-muted-foreground">
                    Find answers to common questions about our products, shipping, and returns.
                </p>
            </div>

            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>How long does shipping take?</AccordionTrigger>
                    <AccordionContent>
                        Standard shipping typically takes 3-5 business days. Express shipping options are available at checkout and usually arrive within 1-2 business days.
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                    <AccordionTrigger>What is your return policy?</AccordionTrigger>
                    <AccordionContent>
                        We offer a 30-day return policy for all unused items in their original packaging. Simply contact our support team to initiate a return.
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                    <AccordionTrigger>Do you ship internationally?</AccordionTrigger>
                    <AccordionContent>
                        Yes, we ship to over 50 countries worldwide. International shipping times and rates vary by location.
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                    <AccordionTrigger>How can I track my order?</AccordionTrigger>
                    <AccordionContent>
                        Once your order ships, you will receive a confirmation email with a tracking number. You can also track your order status in your account dashboard.
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                    <AccordionTrigger>Are your products authentic?</AccordionTrigger>
                    <AccordionContent>
                        Absolutely. We source directly from authorized manufacturers and verified distributors to ensure 100% authenticity of all products.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
}

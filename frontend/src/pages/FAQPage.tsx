import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="mb-8">
        <Button variant="ghost" asChild className="mb-4">
          <Link to="/" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </Button>
        <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
        <p className="text-muted-foreground">
          Find answers to common questions about PayShelf and our services.
        </p>
      </div>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="getting-started">
          <AccordionTrigger className="text-left">
            How do I get started with PayShelf?
          </AccordionTrigger>
          <AccordionContent>
            Getting started is easy! Simply sign up for a free account, complete your business verification, and you'll be ready to accept payments within minutes. Our onboarding process guides you through setting up your account, configuring payment methods, and integrating with your website or point-of-sale system.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="pricing">
          <AccordionTrigger className="text-left">
            What are your pricing plans?
          </AccordionTrigger>
          <AccordionContent>
            We offer flexible pricing plans starting with a free tier for small businesses. Our paid plans include features like advanced analytics, priority support, and lower transaction fees. Contact our sales team for a custom quote based on your business needs.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="supported-payments">
          <AccordionTrigger className="text-left">
            What payment methods do you support?
          </AccordionTrigger>
          <AccordionContent>
            We support all major credit and debit cards (Visa, Mastercard, American Express, Discover), digital wallets (Apple Pay, Google Pay, PayPal), and bank transfers. We're constantly adding new payment methods to meet our merchants' needs.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="security">
          <AccordionTrigger className="text-left">
            How secure is PayShelf?
          </AccordionTrigger>
          <AccordionContent>
            Security is our top priority. We use bank-level encryption, comply with PCI DSS standards, and employ advanced fraud detection systems. All transactions are monitored 24/7, and we maintain multiple certifications including SOC 2 and ISO 27001.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="transaction-fees">
          <AccordionTrigger className="text-left">
            What are your transaction fees?
          </AccordionTrigger>
          <AccordionContent>
            Our transaction fees vary by plan and payment method. Credit card transactions typically range from 2.9% + $0.30, while digital wallet transactions may have different rates. Check our pricing page for the most current rates or contact sales for volume discounts.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="integration">
          <AccordionTrigger className="text-left">
            How do I integrate PayShelf with my website?
          </AccordionTrigger>
          <AccordionContent>
            We offer multiple integration options including our API, plugins for popular e-commerce platforms (Shopify, WooCommerce, Magento), and hosted payment pages. Our developer documentation provides step-by-step guides, and our support team is available to help with integration.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="refunds">
          <AccordionTrigger className="text-left">
            How do refunds work?
          </AccordionTrigger>
          <AccordionContent>
            You can process refunds directly from your PayShelf dashboard up to 180 days after the original transaction. Refunds are processed instantly for digital wallets and within 3-5 business days for card transactions. Refunds are free, but the original transaction fees are not refunded.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="support">
          <AccordionTrigger className="text-left">
            What kind of support do you offer?
          </AccordionTrigger>
          <AccordionContent>
            We provide 24/7 customer support via email, live chat, and phone. Free plan users have access to email support, while paid plans include priority phone support and dedicated account managers. Our comprehensive help center includes tutorials, API documentation, and troubleshooting guides.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="verification">
          <AccordionTrigger className="text-left">
            What documents do I need for account verification?
          </AccordionTrigger>
          <AccordionContent>
            For business verification, you'll need to provide your business license, tax ID, bank account details, and identification documents for authorized signers. The specific requirements vary by business type and location. Our verification team will guide you through the process.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="disputes">
          <AccordionTrigger className="text-left">
            How are chargebacks and disputes handled?
          </AccordionTrigger>
          <AccordionContent>
            We provide tools to help you prevent disputes and respond to chargebacks. Our team assists with evidence submission and dispute resolution. While we can't guarantee outcomes, our dispute win rate is among the highest in the industry due to our comprehensive evidence collection system.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="international">
          <AccordionTrigger className="text-left">
            Do you support international payments?
          </AccordionTrigger>
          <AccordionContent>
            Yes! We support payments from customers worldwide. We handle currency conversion automatically and comply with international payment regulations. Contact us to discuss specific country requirements and supported currencies.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="mobile">
          <AccordionTrigger className="text-left">
            Is there a mobile app?
          </AccordionTrigger>
          <AccordionContent>
            Yes, our mobile app is available for iOS and Android devices. It allows you to monitor transactions, process payments on-the-go, manage your account, and receive real-time notifications. Download it from the App Store or Google Play Store.
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="mt-12 p-6 bg-muted rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Still have questions?</h3>
        <p className="text-muted-foreground mb-4">
          Can't find the answer you're looking for? Our support team is here to help.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild>
            <Link to="/contact">Contact Support</Link>
          </Button>
          <Button variant="outline" asChild>
            <a href="mailto:support@payshelf.com">Email Us</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
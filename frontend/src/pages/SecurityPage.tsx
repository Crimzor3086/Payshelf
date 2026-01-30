import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">PS</span>
            </div>
            <span className="text-xl font-bold text-foreground">PayShelf</span>
          </Link>

          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link to="/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link to="/login">Get Started</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="pt-24 pb-16 px-4">
        <div className="container max-w-4xl">
          <div className="mb-8">
            <Button variant="ghost" asChild className="mb-4">
              <Link to="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </Button>
            <h1 className="text-3xl font-bold text-foreground mb-2">Security</h1>
            <p className="text-muted-foreground">Learn about our security measures and how we protect your data</p>
          </div>

          <div className="prose prose-gray dark:prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Data Protection</h2>
              <p className="text-muted-foreground mb-4">
                We implement industry-standard security measures to protect your personal and financial information. All data is encrypted in transit and at rest using AES-256 encryption.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">PCI DSS Compliance</h2>
              <p className="text-muted-foreground mb-4">
                PayShelf is fully PCI DSS compliant, ensuring that all payment card data is handled securely and in accordance with global security standards.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Two-Factor Authentication</h2>
              <p className="text-muted-foreground mb-4">
                We recommend enabling two-factor authentication (2FA) on all accounts to add an extra layer of security beyond passwords.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Regular Security Audits</h2>
              <p className="text-muted-foreground mb-4">
                Our systems undergo regular security audits and penetration testing to identify and address potential vulnerabilities before they can be exploited.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Incident Response</h2>
              <p className="text-muted-foreground mb-4">
                In the unlikely event of a security incident, we have a comprehensive incident response plan to minimize impact and notify affected users promptly.
              </p>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">PS</span>
              </div>
              <span className="text-lg font-bold">PayShelf</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 PayShelf. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
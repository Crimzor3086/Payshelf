import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  Zap, 
  CreditCard, 
  ArrowRight, 
  CheckCircle2,
  Smartphone,
  BarChart3,
  Lock
} from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Instant Transfers",
    description: "Send and receive payments in seconds, not days.",
  },
  {
    icon: Shield,
    title: "Bank-Grade Security",
    description: "Your funds are protected with enterprise-level encryption.",
  },
  {
    icon: CreditCard,
    title: "Merchant Tools",
    description: "Complete inventory and payment management in one place.",
  },
  {
    icon: BarChart3,
    title: "Real-Time Analytics",
    description: "Track every transaction with detailed reporting.",
  },
];

const benefits = [
  "No hidden fees",
  "24/7 customer support",
  "Instant settlements",
  "Multi-currency support",
];

export default function LandingPage() {
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
          
          <div className="hidden md:flex items-center gap-8">
            <Link to="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Features
            </Link>
            <Link to="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </Link>
            <Link to="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
          </div>

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

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-success-muted text-success px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-up">
              <Lock className="h-4 w-4" />
              Trusted by 10,000+ merchants
            </div>
            
            <h1 className="text-foreground mb-6 animate-fade-up" style={{ animationDelay: "100ms" }}>
              Payments made{" "}
              <span className="text-primary">simple</span>,{" "}
              <br className="hidden sm:block" />
              business made{" "}
              <span className="text-primary">effortless</span>
            </h1>
            
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: "200ms" }}>
              Accept payments, manage inventory, and grow your business with a single, 
              powerful platform designed for modern merchants.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up" style={{ animationDelay: "300ms" }}>
              <Button variant="hero" size="xl" asChild>
                <Link to="/login">
                  Start Free Trial
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="hero-outline" size="xl" asChild>
                <Link to="#features">
                  See How It Works
                </Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-12 text-sm text-muted-foreground animate-fade-up" style={{ animationDelay: "400ms" }}>
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-16 bg-muted/50">
        <div className="container">
          <div className="relative max-w-5xl mx-auto">
            <div className="bg-card rounded-2xl shadow-elevated border border-border overflow-hidden animate-fade-up">
              <div className="bg-secondary/50 px-4 py-3 border-b border-border flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-destructive/40"></div>
                <div className="h-3 w-3 rounded-full bg-pending/40"></div>
                <div className="h-3 w-3 rounded-full bg-success/40"></div>
                <div className="flex-1 flex justify-center">
                  <div className="bg-background rounded-lg px-4 py-1 text-xs text-muted-foreground">
                    dashboard.payshelf.com
                  </div>
                </div>
              </div>
              <div className="p-6 md:p-10">
                {/* Mock Dashboard */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="wallet-card rounded-xl p-6">
                    <p className="text-sm opacity-80 mb-1">Wallet Balance</p>
                    <p className="text-3xl font-bold">$24,847.50</p>
                  </div>
                  <div className="bg-background rounded-xl p-6 border border-border">
                    <p className="text-sm text-muted-foreground mb-1">Today's Revenue</p>
                    <p className="text-3xl font-bold text-foreground">$1,234.00</p>
                  </div>
                  <div className="bg-background rounded-xl p-6 border border-border">
                    <p className="text-sm text-muted-foreground mb-1">Transactions</p>
                    <p className="text-3xl font-bold text-foreground">48</p>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-3">
                  {["Send", "Receive", "Pay", "History"].map((action) => (
                    <div key={action} className="bg-secondary rounded-lg p-4 text-center">
                      <div className="h-10 w-10 rounded-full bg-primary/10 mx-auto mb-2 flex items-center justify-center">
                        <Smartphone className="h-5 w-5 text-primary" />
                      </div>
                      <span className="text-sm font-medium">{action}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-foreground mb-4">Everything you need to grow</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              From accepting your first payment to scaling your business, 
              PayShelf has you covered.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                className="group bg-card rounded-xl p-6 border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary">
        <div className="container text-center">
          <h2 className="text-primary-foreground mb-4">
            Ready to simplify your payments?
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
            Join thousands of merchants who trust PayShelf for their payment processing.
          </p>
          <Button 
            size="xl" 
            className="bg-background text-foreground hover:bg-background/90"
            asChild
          >
            <Link to="/login">
              Create Free Account
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

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

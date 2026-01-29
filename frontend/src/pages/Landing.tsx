import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  Shield, 
  Zap, 
  Smartphone, 
  CreditCard, 
  BarChart3, 
  Users,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: CreditCard,
    title: "Easy Payments",
    description: "Send and receive money instantly with QR codes, payment links, and direct transfers.",
  },
  {
    icon: Shield,
    title: "Bank-Grade Security",
    description: "Your funds are protected with enterprise-level encryption and multi-factor authentication.",
  },
  {
    icon: BarChart3,
    title: "Real-Time Analytics",
    description: "Track your business performance with comprehensive dashboards and reports.",
  },
  {
    icon: Smartphone,
    title: "Mobile First",
    description: "Manage your finances on the go with our responsive, mobile-optimized platform.",
  },
  {
    icon: Zap,
    title: "Instant Settlements",
    description: "Get your money when you need it with fast settlement options.",
  },
  {
    icon: Users,
    title: "Merchant Tools",
    description: "Everything you need to run your business: invoicing, inventory, and customer management.",
  },
];

const benefits = [
  "No hidden fees",
  "24/7 customer support",
  "Secure transactions",
  "Fast onboarding",
  "Multi-currency support",
  "Detailed reporting",
];

const Landing = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-hero">
        <div className="container py-20 md:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-muted text-primary text-sm font-medium mb-6 animate-fade-in">
              <Shield className="h-4 w-4" />
              Trusted by businesses worldwide
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-slide-up">
              Payments made{" "}
              <span className="text-primary">simple</span> for modern businesses
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-slide-up">
              PayShelf is the all-in-one platform for payments, merchant management, and financial operations. Start accepting payments in minutes.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
              <Button size="xl" variant="hero" asChild>
                <Link to="/signup">
                  Sign Up Free
                  <ArrowRight className="h-5 w-5 ml-1" />
                </Link>
              </Button>
              <Button size="xl" variant="hero-outline" asChild>
                <Link to="/login">Login to Dashboard</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Decorative gradient orb */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything you need to manage payments
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From simple transfers to complete merchant solutions, PayShelf has you covered.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={feature.title} 
                className="group hover:border-primary/30 hover:shadow-medium transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-primary-muted flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <feature.icon className="h-6 w-6 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Built for reliability and trust
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                PayShelf is designed from the ground up to be secure, reliable, and easy to use. We handle the complexity so you can focus on growing your business.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <Card className="p-8 shadow-strong">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Wallet Balance</span>
                    <span className="text-xs px-2 py-1 rounded-full bg-success-muted text-primary font-medium">Active</span>
                  </div>
                  <div className="text-4xl font-bold">$24,580.00</div>
                  <div className="h-px bg-border" />
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Today's Revenue</span>
                      <span className="font-semibold text-primary">+$1,250.00</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Pending</span>
                      <span className="font-semibold text-secondary">$340.00</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Transactions</span>
                      <span className="font-semibold">47</span>
                    </div>
                  </div>
                </div>
              </Card>
              
              {/* Decorative elements */}
              <div className="absolute -z-10 -top-4 -right-4 w-full h-full border-2 border-primary/20 rounded-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28">
        <div className="container">
          <Card className="bg-primary text-primary-foreground p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to get started?
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
              Join thousands of businesses that trust PayShelf for their payment needs. Sign up now and start accepting payments today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/signup">
                  Create Free Account
                  <ArrowRight className="h-5 w-5 ml-1" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
                <Link to="/contact">Contact Sales</Link>
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Landing;

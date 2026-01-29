import { Shield, Users, Target, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const values = [
  {
    icon: Shield,
    title: "Security First",
    description: "We prioritize the security of your funds and data above everything else. Bank-grade encryption protects every transaction.",
  },
  {
    icon: Users,
    title: "Customer Focused",
    description: "Our platform is built around your needs. We listen, adapt, and continuously improve based on your feedback.",
  },
  {
    icon: Target,
    title: "Reliability",
    description: "Count on us when it matters. Our infrastructure is designed for 99.99% uptime so your business never stops.",
  },
  {
    icon: Heart,
    title: "Transparency",
    description: "No hidden fees, no surprises. We believe in clear, honest pricing and straightforward communication.",
  },
];

const stats = [
  { value: "50K+", label: "Active Users" },
  { value: "$2B+", label: "Processed Annually" },
  { value: "99.9%", label: "Uptime" },
  { value: "24/7", label: "Support" },
];

const About = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 md:py-28 gradient-hero">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Building the future of{" "}
              <span className="text-primary">payments</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              PayShelf was founded with a simple mission: make financial operations accessible, secure, and effortless for businesses of all sizes.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-b border-border">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  PayShelf started when our founders experienced firsthand the frustration of managing payments for small businesses. Existing solutions were either too complex, too expensive, or simply unreliable.
                </p>
                <p>
                  We set out to build something different—a platform that combines powerful features with simplicity, enterprise-grade security with accessibility, and comprehensive tools with fair pricing.
                </p>
                <p>
                  Today, PayShelf serves thousands of businesses across multiple countries, processing billions in transactions while maintaining the personal touch and reliability that started it all.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary-muted to-muted flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-20 h-20 rounded-2xl bg-primary mx-auto mb-6 flex items-center justify-center">
                    <Shield className="h-10 w-10 text-primary-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Trusted & Secure</h3>
                  <p className="text-muted-foreground">
                    Your financial data is protected by the same security standards used by major banks.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These principles guide everything we do at PayShelf.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {values.map((value) => (
              <Card key={value.title} className="hover:shadow-medium transition-shadow duration-300">
                <CardContent className="p-6 flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-muted flex items-center justify-center flex-shrink-0">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

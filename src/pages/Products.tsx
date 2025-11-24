import { useState } from "react";
import { Link } from "react-router-dom";
import {
  MessageSquare,
  Target,
  FileText,
  BarChart3,
  FileSearch,
  PhoneCall,
  Search,
  ArrowRight,
  Check,
} from "lucide-react";
import { Button3D } from "@/components/ui/button-3d";
import { Card } from "@/components/ui/card";
import { AnimatedSection } from "@/components/AnimatedSection";
import { AgentModal, type AgentModalVariant } from "@/components/AgentModal";

const products = [
  {
    icon: PhoneCall,
    name: "AI Voice Agent",
    tagline: "Intelligent, Real-Time Call Automation",
    description:
      "Real-time AI voice agents that answer calls, understand intent, and respond with natural, human-like dialogue — 24/7.",
    features: [
      "Instant, human-like voice responses",
      "Multi-lingual support",
      "Smart call routing & automation",
      "Human handoff with full context",
      "Call insights and analytics",
    ],
    color: "from-accent-gold/20 to-accent-gold/5",
    agentVariant: "voice" as AgentModalVariant,
  },
  {
    icon: Search,
    name: "AI SEO Agent",
    tagline: "Automated, Intelligence-Driven SEO",
    description:
      "Automated, data-driven SEO that analyzes your site, finds opportunities, and recommends high-impact improvements in real time.",
    features: [
      "AI-powered keyword discovery and clustering",
      "On-page content and metadata optimization",
      "Technical SEO audits and issue tracking",
      "Competitor and gap analysis",
      "Ongoing performance monitoring",
    ],
    color: "from-surface to-background",
    agentVariant: "seo" as AgentModalVariant,
  },
  {
    icon: MessageSquare,
    name: "AI Chatbot",
    tagline: "24/7 Intelligent Customer Support",
    description:
      "Deploy an AI-powered chatbot that understands context, learns from interactions, and provides instant, accurate responses to customer queries.",
    features: [
      "Natural language processing",
      "Multi-language support",
      "CRM integration",
      "Analytics dashboard",
      "Custom training",
    ],
    color: "from-accent-gold/20 to-accent-gold/5",
  },
  {
    icon: Target,
    name: "Lead Agent",
    tagline: "Smart Lead Generation & Qualification",
    description:
      "Automatically capture, qualify, and nurture leads with AI-driven insights and personalized engagement strategies.",
    features: [
      "Lead scoring AI",
      "Automated follow-ups",
      "Behavior tracking",
      "Pipeline management",
      "Email automation",
    ],
    color: "from-surface to-background",
  },
  {
    icon: FileText,
    name: "SEO Content Generator",
    tagline: "AI-Powered Content Creation",
    description:
      "Generate high-quality, SEO-optimized content at scale with our advanced AI content engine.",
    features: [
      "Keyword optimization",
      "Content scheduling",
      "Multi-platform publishing",
      "Performance analytics",
      "Brand voice training",
    ],
    color: "from-accent-gold/20 to-accent-gold/5",
  },
  {
    icon: BarChart3,
    name: "Dashboard Automation",
    tagline: "Real-Time Business Intelligence",
    description:
      "Centralize your data and automate reporting with intelligent dashboards that provide actionable insights.",
    features: [
      "Custom widgets",
      "Real-time updates",
      "Data visualization",
      "Export capabilities",
      "Alert notifications",
    ],
    color: "from-surface to-background",
  },
  {
    icon: FileSearch,
    name: "Document Intelligence",
    tagline: "Smart Document Processing",
    description:
      "Extract, analyze, and process documents automatically with AI-powered OCR and data extraction.",
    features: [
      "OCR technology",
      "Data extraction",
      "Classification",
      "Workflow automation",
      "Cloud storage",
    ],
    color: "from-accent-gold/20 to-accent-gold/5",
  },
];

export default function Products() {
  const [agentModalOpen, setAgentModalOpen] = useState(false);
  const [activeAgent, setActiveAgent] = useState<AgentModalVariant | null>(null);

  return (
    <main className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-b from-base-white to-surface hero-parallax">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <AnimatedSection direction="blur">
            <h1 className="text-4xl sm:text-5xl font-bold text-ink mb-6">
              AI-Powered <span className="text-accent-gold">Products</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Ready-to-deploy AI solutions designed to automate workflows, boost productivity, 
              and drive growth for modern businesses.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="space-y-24">
            {products.map((product, index) => (
              <div
                key={product.name}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Product Info */}
                <div
                  className={`space-y-6 ${index % 2 === 1 ? "lg:order-2" : ""}`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="inline-flex p-4 bg-accent-gold/10 rounded-lg">
                    <product.icon className="h-12 w-12 text-accent-gold" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-ink mb-2">{product.name}</h2>
                    <p className="text-lg text-accent-gold font-semibold mb-4">
                      {product.tagline}
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  <ul className="space-y-3">
                    {product.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-accent-gold flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Button3D variant="primary" asChild>
                      <Link
                        to="/contact"
                        className="link-reveal inline-flex items-center gap-2"
                      >
                        Request Demo
                      </Link>
                    </Button3D>
                    {product.agentVariant ? (
                      <Button3D
                        variant="secondary"
                        onClick={() => {
                          setActiveAgent(product.agentVariant as AgentModalVariant);
                          setAgentModalOpen(true);
                        }}
                      >
                        Learn More
                      </Button3D>
                    ) : (
                      <Button3D variant="secondary" asChild>
                        <Link
                          to="/contact"
                          className="link-reveal inline-flex items-center gap-2"
                        >
                          Learn More
                        </Link>
                      </Button3D>
                    )}
                  </div>
                </div>

                {/* Product Visual */}
                <Card
                  className={`card tilt p-12 border border-border bg-gradient-to-br ${product.color} ${
                    index % 2 === 1 ? "lg:order-1" : ""
                  }`}
                  data-tilt-strength="12"
                >
                  <div className="aspect-square flex items-center justify-center">
                    <div
                      className="relative reveal-wrap"
                      data-reveal-duration="0.8"
                    >
                      <div className="reveal-overlay" />
                      <div className="reveal-img relative flex items-center justify-center">
                        <div className="absolute inset-0 bg-accent-gold/20 rounded-full blur-3xl animate-float" />
                        <product.icon className="h-32 w-32 text-accent-gold relative z-10" />
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="py-24 bg-surface">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-ink mb-4">
              Why Choose Our AI Products?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Built on cutting-edge AI technology with enterprise-grade security and support
            </p>
          </div>

          <AnimatedSection direction="up" stagger={0.12}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Easy Integration",
                  description: "Seamlessly integrate with your existing tools and workflows",
                },
                {
                  title: "Scalable Architecture",
                  description: "Grows with your business from startup to enterprise",
                },
                {
                  title: "24/7 Support",
                  description: "Dedicated support team available whenever you need help",
                },
              ].map((benefit) => (
                <Card
                  key={benefit.title}
                  className="card tilt glass relative overflow-hidden p-6 border border-border text-center hover-lift cursor-pointer"
                  data-tilt-strength="10"
                >
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute -top-16 -right-8 h-24 w-24 rounded-full bg-accent-gold/18 blur-3xl animate-float" />
                    <div className="absolute -bottom-20 -left-8 h-28 w-28 rounded-full bg-accent-gold/10 blur-3xl animate-float" />
                  </div>

                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-ink mb-3">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <AnimatedSection direction="scale">
            <Card
              className="card tilt glass relative overflow-hidden border border-border hover-lift cursor-pointer text-center px-8 py-10 sm:px-12 sm:py-12"
              data-tilt-strength="14"
            >
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-20 -right-10 h-32 w-32 rounded-full bg-accent-gold/18 blur-3xl animate-float" />
                <div className="absolute -bottom-24 -left-10 h-40 w-40 rounded-full bg-accent-gold/10 blur-3xl animate-float" />
              </div>

              <div className="relative z-10">
                <h2 className="text-3xl sm:text-4xl font-bold text-ink mb-4">
                  Ready to Transform Your Business?
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Schedule a demo and see how our AI products can help you achieve your goals.
                </p>
                <Button3D variant="primary" size="lg" asChild>
                  <Link
                    to="/contact"
                    className="link-reveal inline-flex items-center gap-2"
                  >
                    Get Started Today <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button3D>
              </div>
            </Card>
          </AnimatedSection>
        </div>
      </section>
      <AgentModal
        open={agentModalOpen && !!activeAgent}
        variant={activeAgent ?? "voice"}
        onClose={() => {
          setAgentModalOpen(false);
          setActiveAgent(null);
        }}
      />
    </main>
  );
}

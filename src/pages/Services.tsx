import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Sparkles, Code, Smartphone, TrendingUp, Search, Shield,
  Megaphone, BarChart, ArrowRight 
} from "lucide-react";
import gsap from "gsap";
import { Button3D } from "@/components/ui/button-3d";
import { Card } from "@/components/ui/card";
import { StructuredData } from "@/components/StructuredData";
import { AnimatedSection } from "@/components/AnimatedSection";
import { AgentModal, type AgentModalVariant } from "@/components/AgentModal";

type ServiceCategory = "All" | "Design" | "Development" | "AI" | "Marketing";

const services = [
  {
    icon: Sparkles,
    title: "AI Voice Agent",
    category: "AI",
    description:
      "Real-time AI voice agents that answer calls, understand intent, and respond with natural, human-like dialogue — 24/7.",
    features: [
      "Instant, human-like voice responses",
      "Multi-lingual support",
      "Smart call routing & automation",
      "Human handoff with full context",
    ],
    agentVariant: "voice",
  },
  {
    icon: Search,
    title: "AI SEO Agent",
    category: "AI",
    description:
      "Automated, data-driven SEO that analyzes your site, finds opportunities, and recommends high-impact improvements in real time.",
    features: [
      "AI-powered keyword research",
      "On-page content optimization",
      "Technical SEO audits",
      "Competitor and gap analysis",
    ],
    agentVariant: "seo",
  },
  {
    icon: Sparkles,
    title: "AI Solutions & Automation",
    category: "AI",
    description:
      "Intelligent chatbots, workflow automation, and custom AI integrations that scale with your business.",
    features: ["AI Chatbots", "Process Automation", "Machine Learning", "Predictive Analytics"],
  },
  {
    icon: Code,
    title: "Web Development",
    category: "Development",
    description: "Modern, responsive websites and web applications built with cutting-edge technologies.",
    features: ["React & Next.js", "E-commerce", "Custom CMS", "API Development"],
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    category: "Development",
    description: "Native and cross-platform mobile apps that deliver exceptional user experiences.",
    features: ["iOS & Android", "React Native", "Progressive Web Apps", "App Maintenance"],
  },
  {
    icon: TrendingUp,
    title: "Digital Marketing",
    category: "Marketing",
    description: "Data-driven marketing strategies that drive growth and maximize ROI.",
    features: ["Social Media", "Content Marketing", "Email Campaigns", "PPC Advertising"],
  },
  {
    icon: Search,
    title: "SEO & Analytics",
    category: "Marketing",
    description: "Improve your search rankings and gain insights with comprehensive SEO and analytics solutions.",
    features: ["Technical SEO", "Content Optimization", "Google Analytics", "Performance Tracking"],
  },
  {
    icon: Megaphone,
    title: "Brand & Design",
    category: "Design",
    description: "Create a memorable brand identity with our comprehensive design services.",
    features: ["Logo Design", "Brand Strategy", "UI/UX Design", "Visual Identity"],
  },
  {
    icon: Shield,
    title: "Security & Infrastructure",
    category: "Development",
    description: "Protect your digital assets with robust security and reliable infrastructure.",
    features: ["Cloud Solutions", "Security Audits", "DevOps", "Monitoring"],
  },
  {
    icon: BarChart,
    title: "Data & Analytics",
    category: "AI",
    description: "Transform data into actionable insights with advanced analytics and reporting.",
    features: ["Business Intelligence", "Data Visualization", "Custom Dashboards", "Reporting"],
  },
];

const categories: ServiceCategory[] = ["All", "AI", "Development", "Design", "Marketing"];

export default function Services() {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>("All");
  const [agentModalOpen, setAgentModalOpen] = useState(false);
  const [activeAgent, setActiveAgent] = useState<AgentModalVariant | null>(null);

  const filteredServices =
    selectedCategory === "All"
      ? services
      : services.filter((service) => service.category === selectedCategory);

  useEffect(() => {
    const wraps = document.querySelectorAll<HTMLElement>(".services-reveal");

    wraps.forEach((wrap) => {
      const overlay = wrap.querySelector<HTMLElement>(".reveal-overlay");
      const img = wrap.querySelector<HTMLElement>(".reveal-img");
      if (!overlay || !img) return;

      const duration = parseFloat(wrap.getAttribute("data-reveal-duration") || "0.6");

      gsap.set(img, { opacity: 0 });
      gsap.set(overlay, { xPercent: -101 });

      const tl = gsap.timeline();
      tl.to(overlay, {
        xPercent: 0,
        duration,
        ease: "power2.inOut",
      })
        .set(img, { opacity: 1 })
        .to(overlay, {
          xPercent: 101,
          duration,
          ease: "power2.inOut",
        });
    });
  }, [selectedCategory]);

  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>(".service-card");

    if (!cards.length) return;

    gsap.fromTo(
      cards,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.08,
      }
    );
  }, [selectedCategory]);

  return (
    <>
      <StructuredData type="services" />
      <main className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-b from-base-white to-surface hero-parallax">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <AnimatedSection direction="blur">
            <h1 className="text-4xl sm:text-5xl font-bold text-ink mb-6">
              Our <span className="text-accent-gold">Services</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Comprehensive digital solutions tailored to your business needs. From AI-powered automation 
              to cutting-edge web development, we've got you covered.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-pill font-semibold transition-all duration-base ${
                  selectedCategory === category
                    ? "bg-accent-gold text-ink shadow-gold"
                    : "bg-surface text-muted-foreground hover:bg-surface/80"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service, index) => (
              <Card
                key={service.title}
                className="service-card card tilt p-8 hover-lift cursor-pointer border border-border group"
                data-tilt-strength="10"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div
                  className="mb-6 reveal-wrap services-reveal inline-block rounded-lg"
                  data-reveal-duration="0.7"
                >
                  <div className="reveal-overlay" />
                  <div className="reveal-img inline-flex p-4 bg-surface rounded-lg group-hover:bg-accent-gold/10 transition-colors duration-base">
                    <service.icon className="h-8 w-8 text-accent-gold" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-ink mb-3">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {service.description}
                </p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-accent-gold rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
                {service.agentVariant ? (
                  <Button3D
                    variant="ghost"
                    size="sm"
                    className="w-full group-hover:bg-accent-gold group-hover:text-ink"
                    onClick={() => {
                      setActiveAgent(service.agentVariant as AgentModalVariant);
                      setAgentModalOpen(true);
                    }}
                  >
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button3D>
                ) : (
                  <Button3D
                    variant="ghost"
                    size="sm"
                    className="w-full group-hover:bg-accent-gold group-hover:text-ink"
                    asChild
                  >
                    <Link to="/contact">
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button3D>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-surface">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-ink mb-4">Our Process</h2>
            <p className="text-lg text-muted-foreground">
              A proven approach that delivers results
            </p>
          </div>

          <AnimatedSection direction="up" stagger={0.12}>
            <div className="space-y-6">
              {[
                { step: "01", title: "Discovery", description: "We start by understanding your business, goals, and challenges." },
                { step: "02", title: "Strategy", description: "We develop a comprehensive strategy tailored to your needs." },
                { step: "03", title: "Development", description: "Our team builds your solution using best practices and cutting-edge tech." },
                { step: "04", title: "Launch & Support", description: "We deploy your solution and provide ongoing support and optimization." },
              ].map((phase) => (
                <div
                  key={phase.step}
                  className="card tilt glass relative overflow-hidden flex gap-6 items-start p-6 border border-border rounded-lg hover-lift cursor-pointer"
                  data-tilt-strength="8"
                >
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute -top-16 -right-10 h-28 w-28 rounded-full bg-accent-gold/18 blur-3xl animate-float" />
                    <div className="absolute -bottom-20 -left-8 h-28 w-28 rounded-full bg-accent-gold/10 blur-3xl animate-float" />
                  </div>

                  <div className="relative z-10 flex gap-6 items-start w-full">
                    <div className="flex-shrink-0 w-16 h-16 bg-accent-gold rounded-lg flex items-center justify-center">
                      <span className="text-2xl font-bold text-ink">{phase.step}</span>
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-xl font-bold text-ink mb-2">{phase.title}</h3>
                      <p className="text-muted-foreground">{phase.description}</p>
                    </div>
                  </div>
                </div>
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
                  Ready to Get Started?
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Let's discuss how our services can help transform your business.
                </p>
                <Button3D variant="primary" size="lg" asChild>
                  <Link
                    to="/contact"
                    className="link-reveal inline-flex items-center gap-2"
                  >
                    Contact Us <ArrowRight className="ml-2 h-5 w-5" />
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
    </>
  );
}

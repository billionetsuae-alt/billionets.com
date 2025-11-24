import { useRef, type MouseEvent } from "react";
import { Link } from "react-router-dom";
import { PhoneCall, Search as SearchIcon, X, ArrowRight } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Button3D } from "@/components/ui/button-3d";

export type AgentModalVariant = "voice" | "seo";

interface AgentModalProps {
  open: boolean;
  variant: AgentModalVariant;
  onClose: () => void;
}

export function AgentModal({ open, variant, onClose }: AgentModalProps) {
  if (!open) return null;

  const isVoice = variant === "voice";
  const cardRef = useRef<HTMLDivElement | null>(null);

  const handleCardMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xPct = x / rect.width - 0.5;
    const yPct = y / rect.height - 0.5;

    const rotateX = -yPct * 10;
    const rotateY = xPct * 10;
    const translateX = xPct * 12;
    const translateY = yPct * 8;

    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translate3d(${translateX}px, ${translateY}px, 0)`;
  };

  const handleCardMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform =
      "perspective(900px) rotateX(0deg) rotateY(0deg) translate3d(0px, 0px, 0)";
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div className="flex min-h-full items-center justify-center px-4 py-10">
        <AnimatedSection
          direction="scale"
          className="w-full max-w-sm sm:max-w-md md:max-w-2xl"
        >
          <div
            ref={cardRef}
            className="card tilt glass relative overflow-hidden rounded-[2rem] border border-white/20 shadow-[0_24px_80px_rgba(0,0,0,0.65)] will-change-transform"
            data-tilt-strength="18"
            onClick={(e) => e.stopPropagation()}
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
          >
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-24 -right-10 h-40 w-40 rounded-full bg-accent-gold/20 blur-3xl animate-float" />
              <div className="absolute -bottom-24 -left-10 h-56 w-56 rounded-full bg-accent-gold/15 blur-3xl animate-float" />
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="absolute right-4 top-4 z-50 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-muted-foreground backdrop-blur hover:bg-black/70 hover:text-foreground transition-colors duration-200 cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="relative z-10 p-6 sm:p-8 space-y-6">
              <div className="flex flex-wrap items-center gap-4">
                <div className="inline-flex items-center gap-3 rounded-full bg-accent-gold/10 px-4 py-2">
                  {isVoice ? (
                    <PhoneCall className="h-5 w-5 text-accent-gold" />
                  ) : (
                    <SearchIcon className="h-5 w-5 text-accent-gold" />
                  )}
                  <span className="text-xs sm:text-sm font-semibold uppercase tracking-[0.16em] text-accent-gold">
                    {isVoice ? "AI Voice Agent" : "AI SEO Agent"}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <h2 className="text-xl sm:text-2xl font-bold text-ink">
                  {isVoice
                    ? "AI Voice Agents — Real-Time Call Automation"
                    : "AI SEO Agent — Automated Search Growth"}
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {isVoice
                    ? "Turn inbound calls into instant, natural conversations that qualify, answer, and route customers automatically — while handing off to your team with full context."
                    : "Let AI continuously audit your site, spot SEO issues, and surface high-impact opportunities so you can grow organic traffic without manual spreadsheets."}
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-ink">What It Does</h3>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-muted-foreground">
                    {isVoice ? (
                      <>
                        <li>Answers inbound calls with natural, human-like dialogue.</li>
                        <li>Pulls real-time answers from your knowledge base.</li>
                        <li>Hands calls to humans with full context when needed.</li>
                      </>
                    ) : (
                      <>
                        <li>Runs continuous technical and on-page SEO checks.</li>
                        <li>Finds and clusters high-intent keywords for your niche.</li>
                        <li>Surfaces quick-win fixes and content ideas automatically.</li>
                        <li>Turns complex SEO data into simple, prioritized to-do lists.</li>
                      </>
                    )}
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-ink">Why Teams Love It</h3>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-muted-foreground">
                    {isVoice ? (
                      <>
                        <li>Cuts repetitive call volume so agents focus on high-value conversations.</li>
                        <li>Gives customers 24/7 help with consistent quality.</li>
                        <li>Improves conversion by responding the moment a lead calls.</li>
                      </>
                    ) : (
                      <>
                        <li>Grows organic traffic without hiring a full in-house SEO team.</li>
                        <li>Keeps rankings stable with always-on monitoring and fixes.</li>
                        <li>Turns complex SEO data into simple, prioritized to-do lists.</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>

              <div className="space-y-1 pt-1">
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {isVoice
                    ? "Perfect for support, sales, bookings, and any workflow where every missed call is a missed opportunity."
                    : "Ideal for blogs, e‑commerce, SaaS, and service sites that rely on search to generate leads and revenue."}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-3">
                <Button3D variant="primary" size="sm" asChild>
                  <Link
                    to="/contact"
                    className="link-reveal inline-flex items-center gap-2"
                  >
                    Talk to our team
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button3D>
                <Button3D variant="ghost" size="sm" onClick={onClose}>
                  Close
                </Button3D>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}

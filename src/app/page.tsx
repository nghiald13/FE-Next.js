import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, CheckCircle2, Shield, Zap, Star, PackageCheck, ClipboardCheck, AlarmClockCheck } from "lucide-react"
import BrandLogo from "@/components/layouts/brand-logo"

export default function LandingPage() {
  return (
    <>
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <BrandLogo />
        {/* 1. HERO SECTION */}
        <section className="container mx-auto px-4 py-24 md:py-32 flex flex-col items-center text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-6 border border-border">
            <Zap className="size-4 text-primary animate-pulse" />
            <span>Mecsu Supply Chain Platform v.Alpha</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            Streamline your industrial procurement <span className="text-primary">with precision</span>
          </h1>

          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
            The ultimate ecosystem for tracking technical inventory, sourcing MRO supplies, and automating mechanical component workflows for engineering teams.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button size="lg" className="gap-2 font-semibold shadow-md" asChild>
              <Link href="/products">Explore Catalog <ArrowRight className="size-4" /></Link>
            </Button>
          </div>
        </section>

        {/* 2. FEATURES SECTION */}
        <section className="bg-muted/50 border-y border-border py-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Operating Principles & Core Values</h2>
              <p className="text-muted-foreground max-w-md mx-auto">Four non-negotiable operational pillars ensuring seamless hardware supply chains and zero manufacturing downtime for our partners.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <Card className="bg-background border-border hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="p-3 bg-secondary text-secondary-foreground rounded-lg w-fit mb-2">
                    <Zap className="size-5 text-primary" />
                  </div>
                  <CardTitle>Instant</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground text-sm">
                  Fast quotation and quick order processing. We reply to your inquiries immediately so your team never has to waste time waiting.
                </CardContent>
              </Card>

              <Card className="bg-background border-border hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="p-3 bg-secondary text-secondary-foreground rounded-lg w-fit mb-2">
                    <PackageCheck className="size-5 text-primary" />
                  </div>
                  <CardTitle>Precision</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground text-sm">
                  We deliver the exact parts you ordered. Every item strictly matches your requested technical standards, sizes, and material grades.
                </CardContent>
              </Card>

              <Card className="bg-background border-border hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="p-3 bg-secondary text-secondary-foreground rounded-lg w-fit mb-2">
                    <ClipboardCheck className="size-5 text-primary" />
                  </div>
                  <CardTitle>Sufficient</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground text-sm">
                  Large stock volumes always available. We supply your full purchase order completely, ensuring no missing screws or minor hardware.
                </CardContent>
              </Card>

              <Card className="bg-background border-border hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="p-3 bg-secondary text-secondary-foreground rounded-lg w-fit mb-2">
                    <AlarmClockCheck className="size-5 text-primary" />
                  </div>
                  <CardTitle>JIT (Just-In-Time)</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground text-sm">
                  On-time delivery straight to your workshop. Materials arrive exactly when your production schedule needs them to cut down storage costs.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* 3. TESTIMONIAL / PROOF SECTION */}
        <section className="container mx-auto px-4 py-20 max-w-4xl text-center">
          <div className="flex justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="size-5 fill-primary text-primary" />
            ))}
          </div>
          <blockquote className="text-xl md:text-2xl font-medium italic tracking-tight mb-6 text-foreground">
            "Ain't much but it's honest work"
          </blockquote>
          <div className="text-sm">
            <p className="font-semibold text-foreground">Dai Nghia Le</p>
            <p className="text-muted-foreground">The Fullstack Developer</p>
          </div>
        </section>

        {/* 4. CTA SECTION */}
        <section className="bg-primary text-primary-foreground py-16 text-center mt-auto border-t border-border">
          <div className="container mx-auto px-4 max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Ready to be Our Business Partner?</h2>
            <p className="text-primary-foreground/80 mb-8 max-w-md mx-auto text-sm md:text-base">
              Join hundreds of engineering hubs scaling production efficiency daily. No upfront credit card required.
            </p>
            <Button size="lg" variant="secondary" className="font-semibold gap-2 shadow-lg">
              Get Started Free <ArrowRight className="size-4" />
            </Button>
          </div>
        </section>

      </div>
    </>
    
  )
}
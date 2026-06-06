import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { ArrowRight, Zap, Star, PackageCheck, ClipboardCheck, AlarmClockCheck, Building2 } from "lucide-react"
import BrandLogo from "@/components/layouts/brand-logo"
import ScrollReveal from "@/components/animations/scrollreveal"

export default function LandingPage() {

  const testimonials = [
    {
      quote: "Ain't much but it's honest work",
      author: "Dai Nghia Le",
      role: "The Fullstack Developer"
    },
    {
      quote: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Sit amet consectetur adipiscing elit quisque faucibus ex. Adipiscing elit quisque faucibus ex sapien vitae pellentesque.",
      author: "Cicero",
      role: "De Finibus bonorum et malorum "
    }
  ]

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col overflow-x-hidden">
      <BrandLogo />

      {/* HERO SECTION */}
      <section className="relative container mx-auto px-4 py-28 md:py-36 flex flex-col items-center text-center max-w-full overflow-hidden border-b border-border">
        <div
          className="absolute inset-0 z-0 opacity-[0.04] bg-cover bg-center pointer-events-none scale-105 animate-[pulse_8s_infinite]"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1496247749665-49cf5b1022e9?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')` }}
        />
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[14px_24px] pointer-events-none" />

        <div className="z-10 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-150">
          <Badge variant="secondary" className="gap-1.5 px-3 py-1 text-sm font-medium border border-border shadow-sm">
            <Zap className="size-3.5 text-primary animate-bounce" />
            Mecsu Supply Chain Platform v.Alpha
          </Badge>
        </div>

        <h1 className="z-10 text-4xl md:text-6xl font-extrabold tracking-tight my-6 leading-tight max-w-4xl animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300">
          Streamline your industrial procurement <span className="text-primary bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">with precision</span>
        </h1>

        <p className="z-10 text-muted-foreground text-lg md:text-xl max-w-2xl mb-10 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-450">
          The ultimate ecosystem for tracking technical inventory, sourcing MRO supplies, and automating mechanical component workflows for engineering teams.
        </p>

        <div className="z-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto animate-in fade-in zoom-in-95 duration-1000 delay-700">
          <Button size="lg" className="gap-2 font-semibold shadow-md group hover:shadow-primary/20 hover:scale-[1.02] transition-all duration-300" asChild>
            <Link href="/products">
              Explore Catalog
              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </Button>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="bg-muted/50 border-y border-border py-20">
        <div className="container mx-auto px-4 max-w-6xl">

          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Operating Principles & Core Values</h2>
              <p className="text-muted-foreground max-w-md mx-auto">Four non-negotiable operational pillars ensuring seamless hardware supply chains and zero manufacturing downtime for our partners.</p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">

            {/* Card 1 */}
            <ScrollReveal delay={0}>
              <Card className="h-full border-border hover:border-primary/50 hover:-translate-y-1 transition-all duration-300 group shadow-sm">
                <CardHeader>
                  <div className="p-3 bg-secondary text-secondary-foreground rounded-lg w-fit mb-2 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <Zap className="size-5 text-primary group-hover:text-primary-foreground" />
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors duration-300 text-lg">Instant</CardTitle>
                  <CardDescription>Real-time Response</CardDescription>
                </CardHeader>
                <CardContent className="text-muted-foreground text-sm">
                  Fast quotation and quick order processing. We reply to your inquiries immediately so your team never has to waste time waiting.
                </CardContent>
              </Card>
            </ScrollReveal>

            {/* Card 2 */}
            <ScrollReveal delay={0.1}>
              <Card className="h-full border-border hover:border-primary/50 hover:-translate-y-1 transition-all duration-300 group shadow-sm">
                <CardHeader>
                  <div className="p-3 bg-secondary text-secondary-foreground rounded-lg w-fit mb-2 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <PackageCheck className="size-5 text-primary group-hover:text-primary-foreground" />
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors duration-300 text-lg">Precision</CardTitle>
                  <CardDescription>Zero Error Rate</CardDescription>
                </CardHeader>
                <CardContent className="text-muted-foreground text-sm">
                  We deliver the exact parts you ordered. Every item strictly matches your requested technical standards, sizes, and material grades.
                </CardContent>
              </Card>
            </ScrollReveal>

            {/* Card 3 */}
            <ScrollReveal delay={0.2}>
              <Card className="h-full border-border hover:border-primary/50 hover:-translate-y-1 transition-all duration-300 group shadow-sm">
                <CardHeader>
                  <div className="p-3 bg-secondary text-secondary-foreground rounded-lg w-fit mb-2 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <ClipboardCheck className="size-5 text-primary group-hover:text-primary-foreground" />
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors duration-300 text-lg">Sufficient</CardTitle>
                  <CardDescription>High Inventory Volume</CardDescription>
                </CardHeader>
                <CardContent className="text-muted-foreground text-sm">
                  Large stock volumes always available. We supply your full purchase order completely, ensuring no missing screws or minor hardware.
                </CardContent>
              </Card>
            </ScrollReveal>

            {/* Card 4 */}
            <ScrollReveal delay={0.3}>
              <Card className="h-full border-border hover:border-primary/50 hover:-translate-y-1 transition-all duration-300 group shadow-sm">
                <CardHeader>
                  <div className="p-3 bg-secondary text-secondary-foreground rounded-lg w-fit mb-2 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <AlarmClockCheck className="size-5 text-primary group-hover:text-primary-foreground" />
                  </div>

                  <div className="flex items-center gap-1.5">
                    <CardTitle className="group-hover:text-primary transition-colors duration-300 text-lg">JIT</CardTitle>
                  </div>

                  <CardDescription>Just-In-Time</CardDescription>
                </CardHeader>
                <CardContent className="text-muted-foreground text-sm">
                  On-time delivery straight to your workshop. Materials arrive exactly when your production schedule needs them to cut down storage costs.
                </CardContent>
              </Card>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* CAROUSEL */}
      <section className="container mx-auto px-4 py-20 max-w-2xl text-center">
        <ScrollReveal yOffset={20}>
          <Carousel className="w-full max-w-xl mx-auto">
            <CarouselContent>
              {testimonials.map((item, index) => (
                <CarouselItem key={index} className="space-y-4">
                  <div className="flex justify-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="size-5 fill-primary text-primary animate-[pulse_3s_infinite]" />
                    ))}
                  </div>
                  <blockquote className="text-xl md:text-2xl font-medium italic tracking-tight text-foreground px-4">
                    "{item.quote}"
                  </blockquote>
                  <div className="text-sm">
                    <p className="font-semibold text-foreground">{item.author}</p>
                    <p className="text-muted-foreground flex items-center justify-center gap-1">
                      <Building2 className="size-3.5" /> {item.role}
                    </p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:block">
              <CarouselPrevious className="border-border hover:bg-muted" />
              <CarouselNext className="border-border hover:bg-muted" />
            </div>
          </Carousel>
        </ScrollReveal>
      </section>

      {/* 4. CTA SECTION */}
      <section className="relative bg-primary text-primary-foreground py-16 text-center mt-auto border-t border-border overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[100px] bg-white/10 blur-3xl rounded-full pointer-events-none" />
        <div className="container mx-auto px-4 max-w-2xl relative z-10">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Ready to be Our Business Partner?</h2>
          <p className="text-primary-foreground/80 mb-8 max-w-md mx-auto text-sm md:text-base">
            Join hundreds of engineering hubs scaling production efficiency daily. No upfront credit card required.
          </p>
          <Button size="lg" variant="secondary" className="font-semibold gap-2 shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 group">
            Get Started Free
            <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </div>
      </section>

    </div>
  )
}
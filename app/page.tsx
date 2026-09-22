import HeroSection from "@/components/hero-section";
import WhyChooseUsSection from "@/components/why-choose";
import CoursesSection from "@/components/courses-section";
import CoachSection from "@/components/coach";
import TestimonialsSection from "@/components/testimonials-section";
import DemoBookingCTA from "@/components/demo-booking-cta";
import ChessFAQSection from "@/components/ui/chessfaq";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <main>
        {/* 1. Premium Hero Banner */}
        <HeroSection />


        {/* 3. Academy Heritage & Family Experience Section */}
        <section className="py-20 lg:py-28 bg-gradient-to-b from-slate-50 via-sky-50/30 to-white relative overflow-hidden">
          {/* Ambient Brand Lighting & Watermarks */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#29A3DD]/10 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-[#FDB813]/10 rounded-full blur-[120px] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
            
            {/* Header Title Block */}
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-sky-100 shadow-sm">
                <span className="text-lg">🐘</span>
                <span className="text-[#29A3DD] text-xs font-black uppercase tracking-widest">
                  Elephant Chess Experience • For Kids & Adults
                </span>
              </div>

              <h2 className="text-3xl md:text-5xl lg:text-4xl font-[1000] text-slate-900 leading-tight uppercase tracking-tighter">
                CHESS IS FOR EVERYONE — <br />
                <span className="bg-gradient-to-r from-[#29A3DD] via-sky-500 to-[#FDB813] bg-clip-text text-transparent">
                  BUILD FOCUS, UNWIND & HAVE FUN!
                </span>
              </h2>

            
            </div>

            {/* Main Content Grid: 3-Column Layout (Card Left - Image Center - Card Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
              
              {/* Left Column: Card 1 - Kids */}
              <div className="bg-white rounded-3xl p-6 md:p-8 border-2 border-sky-100 shadow-xl hover:border-[#29A3DD] transition-all duration-300 relative group overflow-hidden flex flex-col justify-between">
                <div className="absolute top-0 right-0 w-32 h-32 bg-sky-50 rounded-bl-full -z-0 group-hover:scale-110 transition-transform" />
                
                <div>
                  <div className="relative z-10 flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#29A3DD] to-sky-400 text-white flex items-center justify-center text-2xl font-black shadow-lg shrink-0">
                      🎨
                    </div>
                    <div>
                      <span className="text-xs font-black uppercase tracking-widest text-[#29A3DD] bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-100 inline-block mb-1">
                        Ages 5 to 16
                      </span>
                      <h3 className="text-xl md:text-2xl font-black text-slate-900 leading-snug">
                        Joyful Chess for Kids
                      </h3>
                    </div>
                  </div>

                  <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium relative z-10">
                    We turn chess into an exciting adventure! Children learn strategy, pattern recognition, and decision-making through fun interactive puzzles and friendly matches.
                  </p>
                </div>

                <div className="space-y-3 mt-6 pt-5 border-t border-slate-100 relative z-10">
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm font-extrabold text-slate-800">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs shrink-0">✓</span>
                    <span>Interactive Puzzles & Fun Games</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm font-extrabold text-slate-800">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs shrink-0">✓</span>
                    <span>Boosts Focus & School IQ</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm font-extrabold text-slate-800">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs shrink-0">✓</span>
                    <span>Encouraging Patient Mentors</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm font-extrabold text-slate-800">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs shrink-0">✓</span>
                    <span>Confidence & Resilience</span>
                  </div>
                </div>
              </div>

              {/* Center Column: Visual Showcase Image */}
              <div className="relative flex flex-col items-center justify-center min-h-[380px] lg:min-h-[440px]">
                {/* Main Visual Image Card */}
                <div className="relative w-full h-full min-h-[360px] rounded-[2.5rem] overflow-hidden border-[8px] border-white shadow-[0_25px_60px_rgba(0,0,0,0.15)] bg-slate-900 group">
                  <img
                    src="/inter.jpg"
                    alt="Kids and Adults Playing Chess"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128]/90 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                    <span className="text-xs font-black uppercase tracking-widest text-[#FDB813] mb-1">
                      🐘 Elephant Chess Community
                    </span>
                    <h4 className="text-base md:text-lg font-black leading-snug">
                      Connecting Generations Through Strategy & Smiles
                    </h4>
                  </div>
                </div>

                {/* Floating Rating Card (Top Right) */}
               
              </div>

              {/* Right Column: Card 2 - Adults */}
              <div className="bg-white rounded-3xl p-6 md:p-8 border-2 border-amber-100 shadow-xl hover:border-[#FDB813] transition-all duration-300 relative group overflow-hidden flex flex-col justify-between">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-bl-full -z-0 group-hover:scale-110 transition-transform" />
                
                <div>
                  <div className="relative z-10 flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FDB813] to-amber-400 text-slate-950 flex items-center justify-center text-2xl font-black shadow-lg shrink-0">
                      ☕
                    </div>
                    <div>
                      <span className="text-xs font-black uppercase tracking-widest text-[#d97706] bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-100 inline-block mb-1">
                        Adults & Parents
                      </span>
                      <h3 className="text-xl md:text-2xl font-black text-slate-900 leading-snug">
                        Relaxing Hobby for Adults
                      </h3>
                    </div>
                  </div>

                  <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium relative z-10">
                    Chess isn't just for kids! Adults love taking up chess as a relaxing, screen-free hobby to unwind after work, sharpen critical thinking, and enjoy a fulfilling mental workout.
                  </p>
                </div>

                <div className="space-y-3 mt-6 pt-5 border-t border-slate-100 relative z-10">
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm font-extrabold text-slate-800">
                    <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-xs shrink-0">✓</span>
                    <span>Unwind & De-stress After Work</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm font-extrabold text-slate-800">
                    <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-xs shrink-0">✓</span>
                    <span>Lifelong Mental Fitness</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm font-extrabold text-slate-800">
                    <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-xs shrink-0">✓</span>
                    <span>Flexible Weekend Batches</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm font-extrabold text-slate-800">
                    <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-xs shrink-0">✓</span>
                    <span>Friendly Community Matches</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* 4. Why Choose Elephant Chess Academy */}
        <WhyChooseUsSection />

        {/* 5. Featured Courses */}
        <CoursesSection />




        {/* 8. Coaches Section */}
        <CoachSection />

        {/* 9. Testimonials */}
        <TestimonialsSection />



        {/* 11. Chess FAQ Section */}
        <ChessFAQSection />

        {/* 12. Call-to-Action Book Demo Section */}
        <DemoBookingCTA />
      </main>
    </div>
  );
}

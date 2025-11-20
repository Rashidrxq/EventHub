"use client";

import Link from "next/link";
import { useEffect } from "react";
import { gsap } from "gsap";
import { SpeedInsights } from "@vercel/speed-insights/next"
export default function HomePage() {
  useEffect(() => {
    gsap.from(".hero-text", {
      opacity: 0,
      y: 40,
      duration: 1.3,
      ease: "power3.out",
      stagger: 0.2, // Each line animates one by one
    });
  }, []);

  return (
    <main>
      {/* HERO */}
      <section className="relative w-full min-h-screen flex items-center overflow-hidden">

        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src="/home/videos/hero1.mp4"
        />

        {/* Violet Overlay */}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

        {/* Content */}
        <div className="relative z-10 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-full md:w-3/5 lg:w-1/2 py-12 md:py-24 text-center md:text-left">

            <h1 className="hero-text text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white drop-shadow-lg">
              EventHub
            </h1>

            <span className="hero-text text-lg md:text-xl text-white/95 mt-2 block">
              Find & Book Your Next Event
            </span>

            <p className="hero-text mt-4 text-base sm:text-lg md:text-xl text-yellow-300 max-w-lg">
              Unlock experiences. Save your spot now.
            </p>

            <div className="hero-text mt-8 flex flex-col sm:flex-row gap-4">
              <Link
  href="/book"
  className="magnet inline-block rounded-md bg-white text-[#7a006b] font-semibold px-5 py-3 shadow"
  data-strength="0.26"
>
  Get Started
</Link>

<Link
  href="/explore"
  className="magnet inline-block rounded-md border border-white/40 text-white/90 px-5 py-3"
  data-strength="0.16"
  data-cursor-image="/mnt/data/ed5d3fec-a44f-4148-84b2-2e237a6aad72.png"  /* optional small preview */
>
  Explore Events
</Link>

            </div>

          </div>
        </div>

      </section>
    </main>
  );
}

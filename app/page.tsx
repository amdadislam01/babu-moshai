'use client';

import Hero from "@/components/Hero";
import FeaturedCategories from "@/components/FeaturedCategories";
import RecommendedOutfits from "@/components/RecommendedOutfits";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <FeaturedCategories />
      <RecommendedOutfits />
    </div>
  );
}

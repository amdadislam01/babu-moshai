'use client';

import Hero from "@/components/Hero";
import FeaturedCategories from "@/components/FeaturedCategories";
import RecommendedOutfits from "@/components/RecommendedOutfits";
import WhyChooseUs from "@/components/WhyChooseUs";
import SocialLookbook from "@/components/SocialLookbook";
import FlashSale from "@/components/FlashSale";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <FeaturedCategories />
      <RecommendedOutfits />
      <FlashSale />
      <WhyChooseUs />
      <SocialLookbook />
    </div>
  );
}

import { lazy, Suspense } from "react";
import HeroSlider from "@/components/HeroSlider";
import SEO from "@/components/SEO";
import LazySection from "@/components/LazySection";

// Lazy load below-the-fold components to improve TBT and unused JS metrics
const PestsSection = lazy(() => import("@/components/PestsSection"));
const UnitsMap = lazy(() => import("@/components/UnitsMap"));
const SealsSection = lazy(() => import("@/components/SealsSection"));
const StatsSection = lazy(() => import("@/components/StatsSection"));
const ServicesSection = lazy(() => import("@/components/ServicesSection"));
const AboutSection = lazy(() => import("@/components/AboutSection"));
const ReviewsSection = lazy(() => import("@/components/ReviewsSection"));
const CTASection = lazy(() => import("@/components/CTASection"));

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Bioforte Controle de Pragas",
  "image": "https://bioforte.com.br/logo.png",
  "@id": "https://bioforte.com.br",
  "url": "https://bioforte.com.br",
  "telephone": "+551637230808",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Av. Major Nicácio, 2045",
    "addressLocality": "Franca",
    "addressRegion": "SP",
    "postalCode": "14401-135",
    "addressCountry": "BR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": -20.5372,
    "longitude": -47.4008
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ],
    "opens": "08:00",
    "closes": "18:00"
  },
  "sameAs": [
    "https://www.facebook.com/bioforte",
    "https://www.instagram.com/bioforte"
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "631"
  }
};

const Home = () => {
  return (
    <main className="overflow-hidden">
      <SEO
        title="Home"
        description="Bioforte: especialista em controle de pragas há 30 anos. Dedetização residencial e comercial com profissionais certificados. Orçamento gratuito!"
      />
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>

      {/* 1. Hero Slider (Critical path - Loads immediately) */}
      <HeroSlider />

      {/* 2. Pests Icons Section */}
      <LazySection height="300px">
        <Suspense fallback={<div className="py-20 min-h-[300px]" />}>
          <PestsSection />
        </Suspense>
      </LazySection>

      {/* 3. Stats Section */}
      <LazySection height="300px">
        <Suspense fallback={<div className="py-20 min-h-[300px]" />}>
          <StatsSection />
        </Suspense>
      </LazySection>

      {/* 4. Services Section */}
      <LazySection height="600px">
        <Suspense fallback={<div className="py-20 min-h-[600px]" />}>
          <ServicesSection />
        </Suspense>
      </LazySection>

      {/* 5. About Section */}
      <LazySection height="500px">
        <Suspense fallback={<div className="py-20 min-h-[500px]" />}>
          <AboutSection clientesCount="10625+" />
        </Suspense>
      </LazySection>

      {/* 6. Seals/Certifications Section */}
      <LazySection height="150px">
        <Suspense fallback={<div className="py-10 min-h-[150px]" />}>
          <SealsSection />
        </Suspense>
      </LazySection>

      {/* 7. Google Reviews Section */}
      <LazySection height="400px">
        <Suspense fallback={<div className="py-20 min-h-[400px]" />}>
          <ReviewsSection />
        </Suspense>
      </LazySection>

      {/* 8. Units Map */}
      <LazySection height="500px">
        <Suspense fallback={<div className="min-h-[500px]" />}>
          <UnitsMap />
        </Suspense>
      </LazySection>

      {/* 9. CTA Section */}
      <LazySection height="300px">
        <Suspense fallback={<div className="py-20 min-h-[300px]" />}>
          <CTASection />
        </Suspense>
      </LazySection>
    </main>
  );
};

export default Home;
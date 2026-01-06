import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedTours from "@/components/FeaturedTours";
import WhyChooseUs from "@/components/WhyChooseUs";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";

const Index = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedTourId, setSelectedTourId] = useState<string | null>(null);

  const handleBookTour = (tourId: string) => {
    setSelectedTourId(tourId);
    setIsBookingOpen(true);
  };

  return (
    <>
      <Helmet>
        <title>MFLIP Adventures Safaris | Unforgettable African Safari Adventures</title>
        <meta
          name="description"
          content="Discover breathtaking safaris, pristine beaches, and unforgettable cultural journeys across East Africa. Book your dream adventure with MFLIP Adventures Safaris today."
        />
        <meta
          name="keywords"
          content="safari tours, Kenya travel, Tanzania safari, Maasai Mara, beach holiday, African adventure, MFLIP Adventures"
        />
        <link rel="canonical" href="https://mflipadventures.co.ke" />
      </Helmet>

      <main>
        <Navbar />
        <Hero />
        <FeaturedTours onBookTour={handleBookTour} />
        <WhyChooseUs />
        <Newsletter />
        <Footer />

        <BookingModal
          isOpen={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
          tourId={selectedTourId}
        />
      </main>
    </>
  );
};

export default Index;

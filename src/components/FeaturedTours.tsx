import { motion } from "framer-motion";
import TourCard from "./TourCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import tourSafari from "@/assets/tour-safari.jpg";
import tourCoastal from "@/assets/tour-coastal.jpg";
import tourBalloon from "@/assets/tour-balloon.jpg";

interface Tour {
  id: string;
  title: string;
  location: string;
  image: string;
  price: number;
  duration: string;
  groupSize: string;
  rating: number;
  reviews: number;
  featured?: boolean;
}

const tours: Tour[] = [
  {
    id: "1",
    title: "Maasai Mara Safari Adventure",
    location: "Maasai Mara, Kenya",
    image: tourSafari,
    price: 45000,
    duration: "4 Days",
    groupSize: "2-8 people",
    rating: 4.9,
    reviews: 234,
    featured: true,
  },
  {
    id: "2",
    title: "Coastal Paradise Escape",
    location: "Diani Beach, Kenya",
    image: tourCoastal,
    price: 35000,
    duration: "5 Days",
    groupSize: "2-6 people",
    rating: 4.8,
    reviews: 189,
  },
  {
    id: "3",
    title: "Hot Air Balloon Safari",
    location: "Serengeti, Tanzania",
    image: tourBalloon,
    price: 65000,
    duration: "3 Days",
    groupSize: "2-4 people",
    rating: 5.0,
    reviews: 156,
    featured: true,
  },
];

interface FeaturedToursProps {
  onBookTour: (id: string) => void;
}

const FeaturedTours = ({ onBookTour }: FeaturedToursProps) => {
  return (
    <section id="tours" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Popular Tours
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
            Featured Adventures
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Handpicked experiences that showcase the best of East Africa's
            wildlife, beaches, and culture.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {tours.map((tour) => (
            <TourCard key={tour.id} {...tour} onBook={onBookTour} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center"
        >
          <Button variant="secondary" size="lg">
            View All Tours
            <ArrowRight className="w-4 h-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedTours;

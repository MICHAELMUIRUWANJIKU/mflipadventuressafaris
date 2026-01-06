import { motion } from "framer-motion";
import { MapPin, Clock, Users, Star, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
interface TourCardProps {
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
  onBook: (id: string) => void;
}
const TourCard = ({
  id,
  title,
  location,
  image,
  price,
  duration,
  groupSize,
  rating,
  reviews,
  featured,
  onBook
}: TourCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  return <motion.div initial={{
    opacity: 0,
    y: 20
  }} whileInView={{
    opacity: 1,
    y: 0
  }} viewport={{
    once: true
  }} transition={{
    duration: 0.5
  }} className="group relative bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-500">
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Featured Badge */}
        {featured && <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-gradient-sunset text-primary-foreground text-xs font-semibold">
            Featured
          </div>}

        {/* Like Button */}
        <button onClick={() => setIsLiked(!isLiked)} className="absolute top-4 right-4 w-9 h-9 rounded-full glass flex items-center justify-center transition-transform hover:scale-110">
          <Heart className={`w-4 h-4 transition-colors ${isLiked ? "fill-coral text-coral" : "text-foreground"}`} />
        </button>

        {/* Rating */}
        <div className="absolute bottom-4 left-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full glass">
          <Star className="w-4 h-4 fill-accent text-accent" />
          <span className="text-sm font-medium text-foreground">{rating}</span>
          <span className="text-xs text-muted-foreground">({reviews})</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="text-lg font-display font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
        </div>

        <div className="flex items-center gap-1.5 text-muted-foreground mb-4">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{location}</span>
        </div>

        <div className="flex items-center gap-4 mb-5 pb-4 border-b border-border">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            {duration}
          </div>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Users className="w-4 h-4" />
            {groupSize}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            
            <span className="text-sm text-muted-foreground">Kshs. 8500</span>
          </div>
          <Button variant="default" size="sm" onClick={() => onBook(id)}>
            Book Now
          </Button>
        </div>
      </div>
    </motion.div>;
};
export default TourCard;
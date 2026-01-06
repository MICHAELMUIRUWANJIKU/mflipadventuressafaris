import { motion } from "framer-motion";
import { Shield, Award, Clock, HeadphonesIcon } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Secure Payments",
    description:
      "Pay securely with M-PESA or card. Your transactions are protected with bank-level encryption.",
  },
  {
    icon: Award,
    title: "Best Price Guarantee",
    description:
      "Find a lower price? We'll match it and give you 10% off your next booking.",
  },
  {
    icon: Clock,
    title: "Flexible Booking",
    description:
      "Free cancellation up to 48 hours before your tour. Plans change, we understand.",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    description:
      "Our travel experts are available around the clock to assist you anywhere in the world.",
  },
];

const WhyChooseUs = () => {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Why MFLIP Adventures
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
            Travel With Confidence
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We're committed to making your travel experience seamless, secure,
            and unforgettable.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-card transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-sunset flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

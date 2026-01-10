import { MapPin, Phone, Mail, Facebook, Instagram } from "lucide-react";
import { Link } from "react-router-dom";

// X (Twitter) icon component
const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const Footer = () => {
  const quickLinks = [{
    name: "Home",
    href: "/"
  }, {
    name: "Tours",
    href: "#tours"
  }, {
    name: "Destinations",
    href: "#destinations"
  }, {
    name: "About Us",
    href: "#about"
  }, {
    name: "Contact",
    href: "#contact"
  }];
  const tourTypes = [{
    name: "Safari Tours",
    href: "#"
  }, {
    name: "Beach Holidays",
    href: "#"
  }, {
    name: "Mountain Climbing",
    href: "#"
  }, {
    name: "Cultural Tours",
    href: "#"
  }, {
    name: "City Tours",
    href: "#"
  }];
  const socialLinks = [{
    icon: Facebook,
    href: "https://facebook.com", // Update with your Facebook page URL
    label: "Facebook"
  }, {
    icon: Instagram,
    href: "https://instagram.com", // Update with your Instagram page URL
    label: "Instagram"
  }, {
    icon: "x",
    href: "https://x.com", // Update with your X (Twitter) page URL
    label: "X"
  }];
  return <footer id="contact" className="bg-foreground text-primary-foreground pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-sunset flex items-center justify-center">
                <MapPin className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-2xl font-display font-bold">MFLIP ADVENTURES</span>
            </Link>
            <p className="text-primary-foreground/70 mb-6 leading-relaxed">
              Your trusted partner for unforgettable African safari adventures.
              Experience Kenya's wildlife and natural beauty with us.
            </p>
            <div className="flex gap-3">
              {socialLinks.map(social => (
                <a 
                  key={social.label} 
                  href={social.href} 
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label} 
                  className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-primary transition-colors"
                >
                  {social.icon === "x" ? (
                    <XIcon className="w-5 h-5" />
                  ) : (
                    <social.icon className="w-5 h-5" />
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-display font-semibold mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map(link => <li key={link.name}>
                  <a href={link.href} className="text-primary-foreground/70 hover:text-primary transition-colors">
                    {link.name}
                  </a>
                </li>)}
            </ul>
          </div>

          {/* Tour Types */}
          <div>
            <h4 className="text-lg font-display font-semibold mb-5">Tour Types</h4>
            <ul className="space-y-3">
              {tourTypes.map(link => <li key={link.name}>
                  <a href={link.href} className="text-primary-foreground/70 hover:text-primary transition-colors">
                    {link.name}
                  </a>
                </li>)}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-display font-semibold mb-5">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5" />
                <span className="text-primary-foreground/70">
                  123 Safari Road, Westlands
                  <br />
                  Nairobi, Kenya
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary" />
                <a href="tel:+254700000000" className="text-primary-foreground/70 hover:text-primary transition-colors">
                  +254 700 000 000
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary" />
                <a className="text-primary-foreground/70 hover:text-primary transition-colors" href="mailto:mflipadventuressafaris@gmail.com">@mflipadventures.co.ke</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-primary-foreground/50 text-sm">
            © 2026 MFLIP Adventures Safaris. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-primary-foreground/50">
            <a href="#" className="hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Refund Policy
            </a>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;
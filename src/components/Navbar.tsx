import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, MapPin, User } from "lucide-react";
import { Button } from "@/components/ui/button";
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const navLinks = [{
    name: "Home",
    href: "/"
  }, {
    name: "Tours",
    href: "#tours"
  }, {
    name: "Destinations",
    href: "#destinations"
  }, {
    name: "About",
    href: "#about"
  }, {
    name: "Contact",
    href: "#contact"
  }];
  return <motion.nav initial={{
    y: -100
  }} animate={{
    y: 0
  }} transition={{
    duration: 0.5
  }} className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-card/95 backdrop-blur-md shadow-soft" : "bg-transparent"}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-sunset flex items-center justify-center shadow-glow">
              <MapPin className="w-5 h-5 text-primary-foreground bg-accent-foreground" />
            </div>
            <span className={`text-2xl font-display font-bold transition-colors ${isScrolled ? "text-foreground" : "text-primary-foreground"}`}>
              MFLIP ADVENTURES
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => <a key={link.name} href={link.href} className={`text-sm font-medium transition-colors hover:text-primary ${isScrolled ? "text-foreground/80" : "text-primary-foreground/90 hover:text-primary-foreground"}`}>
                {link.name}
              </a>)}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant={isScrolled ? "ghost" : "heroOutline"} size="sm" onClick={() => navigate("/auth")}>
              <User className="w-4 h-4" />
              Sign In
            </Button>
            <Button variant={isScrolled ? "default" : "hero"} size="sm" onClick={() => navigate("/auth")}>
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className={`w-6 h-6 ${isScrolled ? "text-foreground" : "text-primary-foreground"}`} /> : <Menu className={`w-6 h-6 ${isScrolled ? "text-foreground" : "text-primary-foreground"}`} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && <motion.div initial={{
        opacity: 0,
        height: 0
      }} animate={{
        opacity: 1,
        height: "auto"
      }} exit={{
        opacity: 0,
        height: 0
      }} className="md:hidden bg-card border-t border-border">
            <div className="container mx-auto px-4 py-4 space-y-3">
              {navLinks.map(link => <a key={link.name} href={link.href} className="block py-2 text-foreground/80 hover:text-primary transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                  {link.name}
                </a>)}
              <div className="pt-4 flex flex-col gap-2">
                <Button variant="outline" onClick={() => navigate("/auth")}>
                  Sign In
                </Button>
                <Button variant="default" onClick={() => navigate("/auth")}>
                  Get Started
                </Button>
              </div>
            </div>
          </motion.div>}
      </AnimatePresence>
    </motion.nav>;
};
export default Navbar;
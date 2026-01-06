import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { X, Calendar, Users, Phone, Mail, User, Smartphone, Edit2, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  tourId: string | null;
}

const tourDetails: Record<string, { title: string; price: number }> = {
  "1": { title: "Maasai Mara Safari Adventure", price: 45000 },
  "2": { title: "Coastal Paradise Escape", price: 35000 },
  "3": { title: "Hot Air Balloon Safari", price: 65000 },
};

// Default M-PESA Till Number - This can be edited by the admin
const DEFAULT_MPESA_TILL = "123456";

const BookingModal = ({ isOpen, onClose, tourId }: BookingModalProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    guests: "2",
  });
  const [mpesaTillNumber, setMpesaTillNumber] = useState(DEFAULT_MPESA_TILL);
  const [isEditingTill, setIsEditingTill] = useState(false);
  const [tempTillNumber, setTempTillNumber] = useState(mpesaTillNumber);

  const tour = tourId ? tourDetails[tourId] : null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step < 3) {
      setStep(step + 1);
      return;
    }

    // Check if user is logged in before creating booking
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to complete a booking.",
        variant: "destructive",
      });
      onClose();
      navigate("/auth");
      return;
    }

    setIsLoading(true);

    try {
      const totalPrice = tour!.price * parseInt(formData.guests || "1");
      
      const { error } = await supabase.from("bookings").insert({
        user_id: user.id,
        tour_name: tour!.title,
        tour_price: tour!.price,
        travel_date: formData.date,
        guests: parseInt(formData.guests),
        full_name: formData.name,
        email: formData.email,
        phone: formData.phone,
        mpesa_till_number: mpesaTillNumber,
        total_amount: totalPrice,
        payment_status: "pending",
      });

      if (error) throw error;

      toast({
        title: "Booking Confirmed!",
        description: `Please pay KES ${totalPrice.toLocaleString()} via M-PESA Till Number: ${mpesaTillNumber}`,
      });
      
      onClose();
      setStep(1);
      setFormData({ name: "", email: "", phone: "", date: "", guests: "2" });
    } catch (error: any) {
      toast({
        title: "Booking failed",
        description: error.message || "Failed to create booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSaveTill = () => {
    if (tempTillNumber.trim()) {
      setMpesaTillNumber(tempTillNumber.trim());
      setIsEditingTill(false);
      toast({
        title: "Till Number Updated",
        description: `M-PESA Till Number set to: ${tempTillNumber.trim()}`,
      });
    }
  };

  if (!tour) return null;

  const totalPrice = tour.price * parseInt(formData.guests || "1");

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-lg bg-card rounded-2xl shadow-elevated overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative p-6 bg-gradient-primary text-primary-foreground">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <h2 className="text-2xl font-display font-bold mb-1">Book Your Safari</h2>
              <p className="text-primary-foreground/80">{tour.title}</p>

              {/* Progress Steps */}
              <div className="flex items-center gap-2 mt-6">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex-1 h-1.5 rounded-full bg-primary-foreground/20">
                    <div
                      className={`h-full rounded-full bg-primary-foreground transition-all duration-300 ${
                        step >= s ? "w-full" : "w-0"
                      }`}
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-xs mt-2 text-primary-foreground/60">
                <span>Details</span>
                <span>Schedule</span>
                <span>Payment</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6">
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative mt-1.5">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative mt-1.5">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number (M-PESA)</Label>
                    <div className="relative mt-1.5">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+254 700 000 000"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <div>
                    <Label htmlFor="date">Travel Date</Label>
                    <div className="relative mt-1.5">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="date"
                        name="date"
                        type="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="guests">Number of Guests</Label>
                    <div className="relative mt-1.5">
                      <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <select
                        id="guests"
                        name="guests"
                        value={formData.guests}
                        onChange={handleChange}
                        className="w-full h-11 pl-10 pr-4 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        required
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                          <option key={n} value={n}>
                            {n} {n === 1 ? "Guest" : "Guests"}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <div className="bg-muted rounded-xl p-4 space-y-3">
                    <h4 className="font-semibold text-foreground">Booking Summary</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Tour</span>
                        <span className="text-foreground font-medium">{tour.title}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Date</span>
                        <span className="text-foreground">{formData.date}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Guests</span>
                        <span className="text-foreground">{formData.guests}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Price per person</span>
                        <span className="text-foreground">KES {tour.price.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="pt-3 border-t border-border flex justify-between items-center">
                      <span className="font-semibold text-foreground">Total Amount</span>
                      <span className="text-2xl font-bold text-primary">
                        KES {totalPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* M-PESA Payment Section */}
                  <div className="bg-secondary text-secondary-foreground rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                        <Smartphone className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <div>
                        <span className="font-semibold block">Pay via M-PESA</span>
                        <span className="text-sm text-secondary-foreground/70">Till Number Payment</span>
                      </div>
                    </div>
                    
                    {/* Editable Till Number */}
                    <div className="bg-secondary-foreground/10 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-secondary-foreground/70">Till Number:</span>
                        {isEditingTill ? (
                          <div className="flex items-center gap-2">
                            <Input
                              value={tempTillNumber}
                              onChange={(e) => setTempTillNumber(e.target.value)}
                              className="w-32 h-8 text-center bg-background text-foreground"
                              placeholder="Till Number"
                            />
                            <button
                              type="button"
                              onClick={handleSaveTill}
                              className="w-8 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-primary/90 transition-colors"
                            >
                              <Check className="w-4 h-4 text-primary-foreground" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <span className="text-xl font-bold text-primary-foreground">{mpesaTillNumber}</span>
                            <button
                              type="button"
                              onClick={() => {
                                setTempTillNumber(mpesaTillNumber);
                                setIsEditingTill(true);
                              }}
                              className="w-6 h-6 rounded-full bg-secondary-foreground/20 flex items-center justify-center hover:bg-secondary-foreground/30 transition-colors"
                            >
                              <Edit2 className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-3 text-sm text-secondary-foreground/80 space-y-1">
                      <p>1. Go to M-PESA on your phone</p>
                      <p>2. Select "Lipa na M-PESA" → "Buy Goods"</p>
                      <p>3. Enter Till Number: <strong>{mpesaTillNumber}</strong></p>
                      <p>4. Enter Amount: <strong>KES {totalPrice.toLocaleString()}</strong></p>
                      <p>5. Enter your M-PESA PIN and confirm</p>
                    </div>
                  </div>

                  {!user && (
                    <p className="text-sm text-muted-foreground text-center">
                      You'll need to sign in to complete this booking.
                    </p>
                  )}
                </motion.div>
              )}

              <div className="flex gap-3 mt-6">
                {step > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => setStep(step - 1)}
                    disabled={isLoading}
                  >
                    Back
                  </Button>
                )}
                <Button type="submit" variant="default" className="flex-1" disabled={isLoading}>
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : step === 3 ? (
                    user ? "Confirm Booking" : "Sign In to Book"
                  ) : (
                    "Continue"
                  )}
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;

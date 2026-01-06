import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Mail, Lock, User, Phone, ArrowLeft, Eye, EyeOff, MapPin, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import heroImage from "@/assets/hero-beach.jpg";

type AuthMode = "login" | "signup" | "phone";

const Auth = () => {
  const navigate = useNavigate();
  const { user, signUp, signIn, signInWithGoogle, signInWithPhone, verifyOtp } = useAuth();
  
  const [mode, setMode] = useState<AuthMode>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    otp: "",
  });
  const [isOtpSent, setIsOtpSent] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (mode === "phone") {
        if (!isOtpSent) {
          const { error } = await signInWithPhone(formData.phone);
          if (error) {
            toast({
              title: "Error",
              description: error.message,
              variant: "destructive",
            });
          } else {
            setIsOtpSent(true);
            toast({
              title: "OTP Sent!",
              description: `A verification code has been sent to ${formData.phone}`,
            });
          }
        } else {
          const { error } = await verifyOtp(formData.phone, formData.otp);
          if (error) {
            toast({
              title: "Error",
              description: error.message,
              variant: "destructive",
            });
          } else {
            toast({
              title: "Welcome!",
              description: "You have been signed in successfully.",
            });
            navigate("/");
          }
        }
      } else if (mode === "signup") {
        const { error } = await signUp(formData.email, formData.password, formData.name);
        if (error) {
          if (error.message.includes("already registered")) {
            toast({
              title: "Account exists",
              description: "This email is already registered. Please sign in instead.",
              variant: "destructive",
            });
          } else {
            toast({
              title: "Error",
              description: error.message,
              variant: "destructive",
            });
          }
        } else {
          toast({
            title: "Account created!",
            description: "Welcome to MFLIP Adventures Safaris!",
          });
          navigate("/");
        }
      } else {
        const { error } = await signIn(formData.email, formData.password);
        if (error) {
          if (error.message.includes("Invalid login")) {
            toast({
              title: "Invalid credentials",
              description: "Please check your email and password.",
              variant: "destructive",
            });
          } else {
            toast({
              title: "Error",
              description: error.message,
              variant: "destructive",
            });
          }
        } else {
          toast({
            title: "Welcome back!",
            description: "You have been signed in successfully.",
          });
          navigate("/");
        }
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    const { error } = await signInWithGoogle();
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>
          {mode === "login" ? "Sign In" : mode === "signup" ? "Create Account" : "Phone Login"} | MFLIP Adventures Safaris
        </title>
        <meta name="description" content="Sign in or create an account to book your dream African adventure with MFLIP Adventures Safaris." />
      </Helmet>

      <div className="min-h-screen flex">
        {/* Left Side - Image */}
        <div className="hidden lg:block lg:w-1/2 relative">
          <img src={heroImage} alt="Beautiful destination" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-hero" />
          <div className="absolute inset-0 bg-foreground/30" />
          
          {/* Overlay Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-12">
            <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 text-primary-foreground">
              <div className="w-10 h-10 rounded-xl bg-gradient-sunset flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <span className="text-xl font-display font-bold">MFLIP ADVENTURES</span>
            </Link>
            
            <div>
              <h2 className="text-4xl font-display font-bold text-primary-foreground mb-4">
                Start Your Journey Today
              </h2>
              <p className="text-lg text-primary-foreground/80 max-w-md">
                Join thousands of travelers who have discovered the magic of East Africa with us.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 bg-background">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="lg:hidden mb-8">
              <Link to="/" className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-sunset flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-display font-bold text-foreground">MFLIP ADVENTURES</span>
              </Link>
            </div>

            {/* Back Button */}
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to home
            </Link>

            <AnimatePresence mode="wait">
              <motion.div
                key={mode}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <h1 className="text-3xl font-display font-bold text-foreground mb-2">
                  {mode === "login"
                    ? "Welcome Back"
                    : mode === "signup"
                    ? "Create Account"
                    : "Phone Login"}
                </h1>
                <p className="text-muted-foreground mb-8">
                  {mode === "login"
                    ? "Sign in to access your bookings and exclusive deals"
                    : mode === "signup"
                    ? "Join us to start booking amazing adventures"
                    : "We'll send you a verification code"}
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {mode === "signup" && (
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
                          disabled={isLoading}
                        />
                      </div>
                    </div>
                  )}

                  {mode === "phone" ? (
                    <>
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <div className="relative mt-1.5">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+254700000000"
                            className="pl-10"
                            required
                            disabled={isOtpSent || isLoading}
                          />
                        </div>
                      </div>
                      {isOtpSent && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                        >
                          <Label htmlFor="otp">Verification Code</Label>
                          <Input
                            id="otp"
                            name="otp"
                            value={formData.otp}
                            onChange={handleChange}
                            placeholder="Enter 6-digit code"
                            className="mt-1.5 text-center text-lg tracking-widest"
                            maxLength={6}
                            required
                            disabled={isLoading}
                          />
                        </motion.div>
                      )}
                    </>
                  ) : (
                    <>
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
                            disabled={isLoading}
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="password">Password</Label>
                        <div className="relative mt-1.5">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            className="pl-10 pr-10"
                            required
                            minLength={6}
                            disabled={isLoading}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                          >
                            {showPassword ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>
                    </>
                  )}

                  {mode === "login" && (
                    <div className="flex justify-end">
                      <button type="button" className="text-sm text-primary hover:underline">
                        Forgot password?
                      </button>
                    </div>
                  )}

                  <Button type="submit" variant="default" className="w-full" size="lg" disabled={isLoading}>
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : mode === "login" ? (
                      "Sign In"
                    ) : mode === "signup" ? (
                      "Create Account"
                    ) : isOtpSent ? (
                      "Verify Code"
                    ) : (
                      "Send Code"
                    )}
                  </Button>
                </form>

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                  </div>
                </div>

                {/* Social Login */}
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleGoogleLogin}
                    className="h-11"
                    disabled={isLoading}
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Google
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setMode("phone");
                      setIsOtpSent(false);
                    }}
                    className="h-11"
                    disabled={isLoading}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Phone
                  </Button>
                </div>

                {/* Toggle Mode */}
                <p className="text-center text-sm text-muted-foreground mt-6">
                  {mode === "login" ? (
                    <>
                      Don't have an account?{" "}
                      <button
                        type="button"
                        onClick={() => setMode("signup")}
                        className="text-primary font-medium hover:underline"
                        disabled={isLoading}
                      >
                        Sign up
                      </button>
                    </>
                  ) : (
                    <>
                      Already have an account?{" "}
                      <button
                        type="button"
                        onClick={() => {
                          setMode("login");
                          setIsOtpSent(false);
                        }}
                        className="text-primary font-medium hover:underline"
                        disabled={isLoading}
                      >
                        Sign in
                      </button>
                    </>
                  )}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
